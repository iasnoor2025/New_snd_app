import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import * as csrfModule from '@/utils/csrf';

export default function CsrfTest() {
  const [csrfToken, setCsrfToken] = useState('');
  const [metaToken, setMetaToken] = useState('');
  const [headerToken, setHeaderToken] = useState('');
  const [cookieToken, setCookieToken] = useState('');
  const [testResult, setTestResult] = useState('');
  const [loading, setLoading] = useState(false);

  // Get the initial token on page load
  useEffect(() => {
    // Get token from meta tag
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
    setMetaToken(token);
    setCsrfToken(token);

    // Get token from cookie
    const cookies = document.cookie.split(';');
    const xsrfCookie = cookies.find(c => c.trim().startsWith('XSRF-TOKEN='));
    if (xsrfCookie) {
      const cookieValue = decodeURIComponent(xsrfCookie.split('=')[1]);
      setCookieToken(cookieValue);
    }

    // Get token from axios default headers
    if (axios.defaults.headers.common['X-CSRF-TOKEN']) {
      setHeaderToken(axios.defaults.headers.common['X-CSRF-TOKEN'] as string);
    }
  }, []);

  // Test get CSRF token from server
  const handleGetToken = async () => {
    setLoading(true);
    setTestResult('Fetching token...');

    try {
      const response = await axios.get('/debug/get-token');
      const token = response.data.csrf_token;

      setCsrfToken(token);
      setTestResult(`Successfully fetched token: ${token.substring(0, 10)}...`);
      toast.success('Token fetched successfully');
    } catch (error) {
      console.error('Error fetching token:', error);
      setTestResult(`Error fetching token: ${error}`);
      toast.error('Failed to fetch token');
    } finally {
      setLoading(false);
    }
  };

  // Test force sync token with server
  const handleForceSync = async () => {
    setLoading(true);
    setTestResult('Force syncing token...');

    try {
      const token = await csrfModule.fetchCSRFToken();
      if (token) {
        setCsrfToken(token);
        setTestResult(`Successfully refreshed token: ${token.substring(0, 10)}...`);
        toast.success('Token refreshed successfully');

        // Update displayed tokens
        setMetaToken(document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '');

        // Get token from cookie
        const cookies = document.cookie.split(';');
        const xsrfCookie = cookies.find(c => c.trim().startsWith('XSRF-TOKEN='));
        if (xsrfCookie) {
          const cookieValue = decodeURIComponent(xsrfCookie.split('=')[1]);
          setCookieToken(cookieValue);
        }

        // Get token from axios default headers
        if (axios.defaults.headers.common['X-CSRF-TOKEN']) {
          setHeaderToken(axios.defaults.headers.common['X-CSRF-TOKEN'] as string);
        }
      } else {
        setTestResult('Failed to refresh token');
        toast.error('Token refresh failed');
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      setTestResult(`Error refreshing token: ${error}`);
      toast.error('Failed to refresh token');
    } finally {
      setLoading(false);
    }
  };

  // Test POST request with CSRF token
  const handleTestPost = async () => {
    setLoading(true);
    setTestResult('Testing POST request...');

    try {
      const response = await axios.post('/debug/csrf-test', {
        _token: csrfToken,
        test_data: 'CSRF test'
      }, {
        headers: {
          'X-CSRF-TOKEN': csrfToken,
          'X-XSRF-TOKEN': csrfToken
        }
      });

      setTestResult(`POST request successful! Response: ${JSON.stringify(response.data)}`);
      toast.success('POST request successful');
    } catch (error) {
      console.error('Error in POST request:', error);
      setTestResult(`Error in POST request: ${error}`);
      toast.error('POST request failed');
    } finally {
      setLoading(false);
    }
  };

  // Test direct form submission (traditional form POST)
  const handleDirectFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create a traditional form and submit it
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/debug/csrf-test';

    // Add CSRF token
    const tokenInput = document.createElement('input');
    tokenInput.type = 'hidden';
    tokenInput.name = '_token';
    tokenInput.value = csrfToken;
    form.appendChild(tokenInput);

    // Add test data
    const dataInput = document.createElement('input');
    dataInput.type = 'hidden';
    dataInput.name = 'test_data';
    dataInput.value = 'Direct form submission test';
    form.appendChild(dataInput);

    // Submit the form in a way that we can capture the response
    form.target = 'response_iframe';
    form.style.display = 'none';
    document.body.appendChild(form);

    setTestResult('Submitting form directly...');
    toast.info('Submitting form directly');

    form.submit();

    // Cleanup
    setTimeout(() => {
      document.body.removeChild(form);
    }, 1000);
  };

  return (
    <>
      <Head title="CSRF Test" />

      <div className="py-8">
        <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>CSRF Token Test</CardTitle>
              <CardDescription>
                Test CSRF token synchronization and form submission
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Current Tokens</h3>
                  <div className="grid grid-cols-1 gap-4 mt-2">
                    <div className="p-4 bg-gray-50 rounded-md">
                      <div className="font-medium">Meta Tag Token</div>
                      <div className="mt-1 break-all">{metaToken ? metaToken.substring(0, 20) + '...' : 'No token found'}</div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-md">
                      <div className="font-medium">Cookie Token</div>
                      <div className="mt-1 break-all">{cookieToken ? cookieToken.substring(0, 20) + '...' : 'No token found'}</div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-md">
                      <div className="font-medium">Axios Header Token</div>
                      <div className="mt-1 break-all">{headerToken ? headerToken.substring(0, 20) + '...' : 'No token found'}</div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium">Token Operations</h3>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <Button onClick={handleGetToken} disabled={loading}>
                      Get Fresh Token
                    </Button>

                    <Button onClick={handleForceSync} disabled={loading} variant="outline">
                      Force Sync Token
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium">Test Requests</h3>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <Button onClick={handleTestPost} disabled={loading}>
                      Test POST Request
                    </Button>

                    <Button onClick={handleDirectFormSubmit} disabled={loading} variant="outline">
                      Test Direct Form Submit
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium">Test Result</h3>
                  <div className="p-4 mt-2 bg-gray-50 rounded-md min-h-[100px] whitespace-pre-wrap">
                    {testResult || 'No tests run yet'}
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <div className="text-sm text-gray-500">
                CSRF protection is {metaToken === cookieToken && metaToken === headerToken ? 'working correctly' : 'not synchronized!'}
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Hidden iframe to capture form submission responses */}
      <iframe name="response_iframe" style={{ display: 'none' }} />
    </>
  );
}
