import React from 'react';
import { Head } from '@inertiajs/react';
import { LockClosedIcon, ClockIcon, ExclamationTriangleIcon, PhoneIcon } from '@heroicons/react/24/outline';

export default function AccessRestricted({ accessInfo, user, employee }) {
  return (
      <Head title="Access Restricted" />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <LockClosedIcon className="h-24 w-24 text-red-500" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Access Restricted
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Your access to the system has been restricted.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {user && (
              <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900">User Information</h3>
                <p className="text-sm text-gray-700 mt-1">Name: {user.name}</p>
                <p className="text-sm text-gray-700 mt-1">Email: {user.email}</p>

                {employee && (
                    <p className="text-sm text-gray-700 mt-1">Position: {employee.position || 'N/A'}</p>
                    <p className="text-sm text-gray-700 mt-1">Department: {employee.department || 'N/A'}</p>
                  </>
                )}
              </div>
            )}

            <div className="mb-6">
              <div className="flex items-center mb-2">
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">Restriction Info</h3>
              </div>

              {accessInfo.status && (
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-700">Status</p>
                  <p className="mt-1 text-sm text-red-600">
                    {accessInfo.status === 'inactive' ? 'Inactive account' : accessInfo.status}
                  </p>
                </div>
              )}

              {accessInfo.reason && (
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-700">Reason</p>
                  <p className="mt-1 text-sm text-gray-600">{accessInfo.reason}</p>
                </div>
              )}

              {accessInfo.until && (
                <div className="mb-3 flex items-start">
                  <ClockIcon className="h-5 w-5 text-gray-400 mr-2 mt-1" />
                  <p className="text-sm text-gray-600">{accessInfo.until}</p>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center">
                <PhoneIcon className="h-5 w-5 text-gray-400 mr-2" />
                <h3 className="text-md font-medium text-gray-900">Contact Support</h3>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Please contact the {accessInfo.contact} for assistance in resolving this issue.
              </p>

              <div className="mt-6">
                <a
                  href="mailto:hr@example.com"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  Contact HR
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
