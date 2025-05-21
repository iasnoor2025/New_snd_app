import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { ExclamationTriangleIcon, LockClosedIcon, ClockIcon, CalendarIcon } from '@heroicons/react/24/outline';

export default function EmployeeAccessRestrictions({ employee }) {
  const [restrictionType, setRestrictionType] = useState('none');

  const { data, setData, post, processing, errors, reset } = useForm({
    restriction_type: 'none',
    access_start_date: '',
    access_end_date: '',
    access_restricted_until: '',
    access_restriction_reason: '',
  })

  useEffect(() => {
    // Initialize form with employee data when component mounts
    if (employee) {
      if (employee.access_restricted_until) {
        setRestrictionType('until_date');
        setData({
          restriction_type: 'until_date',
          access_restricted_until: employee.access_restricted_until?.split('T')[0] || '',
          access_restriction_reason: employee.access_restriction_reason || '',
          access_start_date: '',
          access_end_date: '',
        })
      } else if (employee.access_start_date && employee.access_end_date) {
        setRestrictionType('date_range');
        setData({
          restriction_type: 'date_range',
          access_start_date: employee.access_start_date || '',
          access_end_date: employee.access_end_date || '',
          access_restriction_reason: employee.access_restriction_reason || '',
          access_restricted_until: '',
        })
      } else {
        setRestrictionType('none');
        setData({
          restriction_type: 'none',
          access_restricted_until: '',
          access_start_date: '',
          access_end_date: '',
          access_restriction_reason: employee.access_restriction_reason || '',
        })
      }
    }
  }, [employee]);

  // Handle restriction type change
  const handleRestrictionTypeChange = (e) => {
    const value = e.target.value;
    setRestrictionType(value);
    setData('restriction_type', value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('employees.update-access-restrictions', employee.id));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-center mb-4">
        <LockClosedIcon className="h-5 w-5 text-gray-500 mr-2" />
        <h3 className="text-lg font-medium">Access Restrictions</h3>
      </div>

      {employee.status === 'inactive' && (
        <div className="mb-4 bg-yellow-50 p-3 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                This employee account is inactive. Inactive employees cannot access the system regardless of other access restrictions.
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Restriction Type
          </label>
          <select
            value={restrictionType}
            onChange={handleRestrictionTypeChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            <option value="none">No Restrictions</option>
            <option value="date_range">Date Range</option>
            <option value="until_date">Until Specific Date</option>
          </select>
        </div>

        {restrictionType === 'date_range' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  value={data.access_start_date}
                  onChange={e => setData('access_start_date', e.target.value)}
                  className="pl-10 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              {errors.access_start_date && (
                <p className="mt-1 text-sm text-red-600">{errors.access_start_date}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  value={data.access_end_date}
                  onChange={e => setData('access_end_date', e.target.value)}
                  className="pl-10 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              {errors.access_end_date && (
                <p className="mt-1 text-sm text-red-600">{errors.access_end_date}</p>
              )}
            </div>
          </div>
        )}

        {restrictionType === 'until_date' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Restricted Until
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ClockIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                value={data.access_restricted_until}
                onChange={e => setData('access_restricted_until', e.target.value)}
                className="pl-10 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            {errors.access_restricted_until && (
              <p className="mt-1 text-sm text-red-600">{errors.access_restricted_until}</p>
            )}
          </div>
        )}

        {restrictionType !== 'none' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason for Restriction
            </label>
            <textarea
              value={data.access_restriction_reason}
              onChange={e => setData('access_restriction_reason', e.target.value)}
              rows="2"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Optional - enter reason for access restriction"
            ></textarea>
            {errors.access_restriction_reason && (
              <p className="mt-1 text-sm text-red-600">{errors.access_restriction_reason}</p>
            )}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={processing}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            {processing ? 'Saving...' : 'Save Restrictions'}
          </button>
        </div>
      </form>
    </div>
  );
}
