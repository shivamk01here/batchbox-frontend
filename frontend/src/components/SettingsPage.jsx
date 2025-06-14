import React, { useState } from 'react';

const tabs = ['Staff Permissions', 'Institute Settings', 'Notification Settings'];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

      <div className="flex border-b mb-6">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`mr-6 pb-2 border-b-2 text-sm font-semibold ${activeTab === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Staff Permissions' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Staff Roles</h2>
          <ul className="space-y-2">
            <li className="bg-white p-4 rounded-xl shadow border">Admin - Full Access</li>
            <li className="bg-white p-4 rounded-xl shadow border">Teacher - Limited to Classes</li>
            <li className="bg-white p-4 rounded-xl shadow border">Accountant - Finance Only</li>
          </ul>
        </div>
      )}

      {activeTab === 'Institute Settings' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Institute Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Institute Name" className="p-3 border rounded-md" />
            <input placeholder="Email" className="p-3 border rounded-md" />
            <input placeholder="Phone" className="p-3 border rounded-md" />
            <input placeholder="Address" className="p-3 border rounded-md" />
            <input placeholder="Default Fee Due Days" className="p-3 border rounded-md" />
            <input placeholder="GST Settings" className="p-3 border rounded-md" />
          </div>
        </div>
      )}

      {activeTab === 'Notification Settings' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Notification Preferences</h2>
          <div className="space-y-2">
            <input placeholder="SMS Template" className="w-full p-3 border rounded-md" />
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4" />
              <span>Email Alerts</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4" />
              <span>Daily Summary</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
