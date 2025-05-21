import { Head } from '@inertiajs/react';
import axios from 'axios';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { fetchCSRFToken } from '@/utils/csrf';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    errors?: {
        email?: string[];
        password?: string[];
    };
}

export default function Login({ status, canResetPassword, errors: propErrors }: LoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [retryCount, setRetryCount] = useState(0);

    // Show toast message if status is present
    useEffect(() => {
        if (status) {
            toast(status.includes('successfully') ? 'Success' : 'Error', {
                description: status
            });
        }
    }, [status]);

    // Show validation errors in toast
    useEffect(() => {
        if (propErrors) {
            setErrors(propErrors);
            Object.entries(propErrors).forEach(([field, messages]) => {
                if (messages && messages.length > 0) {
                    toast('Validation Error', {
                        description: messages[0]
                    });
                }
            });
        }
    }, [propErrors]);

    // Ensure fresh CSRF token before mounting
    useEffect(() => {
        fetchCSRFToken();
    }, []);

    // Handle the form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Prevent excessive retries
        if (retryCount > 3) {
            toast('Login Error', {
                description: 'Too many failed attempts. Please reload the page and try again.'
            });
            return;
        }

        setIsLoading(true);
        setErrors({});

        try {
            // Force refresh CSRF token before each login attempt
            await fetchCSRFToken();

            // Submit login request using traditional form data instead of JSON
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);
            formData.append('remember', remember ? '1' : '0');

            const response = await axios.post('/login', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                }
            });

            // Handle successful login
            if (response.data?.url) {
                window.location.href = response.data.url;
            } else {
                window.location.href = '/';
            }
        } catch (error: any) {
            setIsLoading(false);

            // Handle validation errors
            if (error.response?.status === 422) {
                const validationErrors = error.response.data.errors || {};
                setErrors(validationErrors);

                const firstErrorField = Object.keys(validationErrors)[0];
                if (firstErrorField) {
                    toast('Validation Error', {
                        description: validationErrors[firstErrorField][0]
                    });
                }
            }
            // Handle CSRF errors with retry logic
            else if (error.response?.status === 419) {
                const newRetryCount = retryCount + 1;
                setRetryCount(newRetryCount);

                toast('Session Error', {
                    description: `Your session has expired. Attempting to refresh (${newRetryCount}/3)...`
                });

                // Wait a bit before retrying
                setTimeout(() => {
                    setIsLoading(false);
                    if (newRetryCount <= 3) {
                        handleSubmit(e);
                    }
                }, 1000);
            }
            // Handle other errors
            else {
                toast('Login Failed', {
                    description: error.response?.data?.message || 'An unexpected error occurred'
                });
            }
        }
    };

    return (
        <AuthLayout>
            <Head title="Log in" />

            <div className="relative backdrop-blur-sm bg-white/10 p-8 rounded-xl border border-gray-100/20 shadow-xl w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-xl -z-10" />

                <div className="flex flex-col space-y-4 text-center mb-6">
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Welcome Back
                    </h1>
                    <p className="text-sm text-slate-600">
                        Enter your credentials to access your account
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid gap-6"
                >
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={email}
                                className="bg-white/50 border-slate-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-lg transition-all duration-200"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoFocus
                                autoComplete="username"
                            />
                            {errors?.email && errors.email.length > 0 && (
                                <InputError message={errors.email[0]} className="mt-1" />
                            )}
                        </div>

                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-sm font-medium text-slate-700">Password</Label>
                                {canResetPassword && (
                                    <TextLink href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500 transition-colors">
                                        Forgot your password?
                                    </TextLink>
                                )}
                            </div>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={password}
                                className="bg-white/50 border-slate-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-lg transition-all duration-200"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                            />
                            {errors?.password && errors.password.length > 0 && (
                                <InputError message={errors.password[0]} className="mt-1" />
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    checked={remember}
                                    onCheckedChange={(checked) => setRemember(checked as boolean)}
                                    className="border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <Label htmlFor="remember" className="text-sm font-normal text-slate-600">
                                    Remember me
                                </Label>
                            </div>
                        </div>
                    </div>

                    <Button
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading && <LoaderCircle className="mr-2 size-4 animate-spin" />}
                        {isLoading ? 'Logging in...' : 'Sign In'}
                    </Button>
                </form>
            </div>
        </AuthLayout>
    );
}
