import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/Modules/Settings/Resources/js/types';
import { Setting } from '../types';
import AppLayout from '@/Modules/Settings/Resources/js/Layouts/AppLayout';
import Button from '@/Modules/Settings/Resources/js/Components/ui/Button';
import Card from '@/Modules/Settings/Resources/js/Components/ui/Card';
import Tabs from '@/Modules/Settings/Resources/js/Components/ui/Tabs';

interface SettingsGroup {
  [key: string]: Setting[];
}

interface Props extends PageProps {
  settings: SettingsGroup;
}

export default function Index({ auth, settings }: Props) {
  const groupNames = Object.keys(settings);
  const [activeTab, setActiveTab] = useState(groupNames[0] || '');

  const renderSettingValue = (setting: Setting) => {
    if (setting.type === 'boolean') {
      return setting.value ? 'Yes' : 'No';
    } else if (setting.type === 'array' || setting.type === 'json') {
      return JSON.stringify(setting.value);
    }
    return setting.value;
  };

  return (
    <AppLayout user={auth.user}>
      <Head title="Settings" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
                <Link href={route('settings.create')}>
                  <Button>Add Setting</Button>
                </Link>
              </div>

              {groupNames.length > 0 ? (
                <>
                  <Tabs
                    tabs={groupNames.map(name => ({
                      label: name.charAt(0).toUpperCase() + name.slice(1),
                      value: name
                    }))}
                    active={activeTab}
                    onChange={setActiveTab}
                  />

                  <div className="mt-6">
                    <Card>
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Value
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Type
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {settings[activeTab]?.map((setting) => (
                            <tr key={setting.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  {setting.display_name || setting.key}
                                </div>
                                {setting.description && (
                                  <div className="text-sm text-gray-500">{setting.description}</div>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {renderSettingValue(setting)}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                  {setting.type}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <Link
                                  href={route('settings.edit', setting.id)}
                                  className="text-indigo-600 hover:text-indigo-900 mr-3"
                                >
                                  Edit
                                </Link>
                                <Link
                                  href={route('settings.show', setting.id)}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  View
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Card>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No settings found. Create your first setting.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
