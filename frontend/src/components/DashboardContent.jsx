import React, { useState, useEffect } from 'react';
import {
  CalendarIcon,
  UserGroupIcon,
  ChartBarIcon,
  ClipboardCheckIcon,
  CurrencyRupeeIcon,
} from '@heroicons/react/outline';

const DashboardCard = ({ icon: Icon, title, value }) => (
  <div className="bg-white p-5 rounded-xl shadow flex items-center space-x-4">
    <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full">
      <Icon className="h-6 w-6" />
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h4 className="text-xl font-semibold text-gray-800">{value}</h4>
    </div>
  </div>
);

const DashboardContent = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const stats = {
    totalStudents: 320,
    totalStaff: 18,
    totalRevenue: '₹3.2L',
    pendingFees: '₹50K'
  };

  const timeline = [
    { time: '9:00 AM', event: 'Maths - Class 10' },
    { time: '11:00 AM', event: 'Physics - Class 12' },
    { time: '2:00 PM', event: 'Staff Meeting' },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/user');
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <DashboardCard icon={UserGroupIcon} title="Students" value={stats.totalStudents} />
            <DashboardCard icon={ClipboardCheckIcon} title="Staff" value={stats.totalStaff} />
            <DashboardCard icon={CurrencyRupeeIcon} title="Total Revenue" value={stats.totalRevenue} />
            <DashboardCard icon={CurrencyRupeeIcon} title="Pending Fees" value={stats.pendingFees} />
          </div>
        );

      case 'timeline':
        return (
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Today’s Schedule</h3>
            <ul className="space-y-3">
              {timeline.map((item, index) => (
                <li key={index} className="flex justify-between text-sm text-gray-700 border-b pb-2">
                  <span>{item.time}</span>
                  <span>{item.event}</span>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'reports':
        return (
          <div className="bg-white p-5 rounded-xl shadow text-gray-600">
            <p>Reports section coming soon with analytics, fee insights, and attendance summaries.</p>
          </div>
        );

      case 'announcements':
        return (
          <div className="bg-white p-5 rounded-xl shadow text-gray-600">
            <p>Announcement board to broadcast news to students and staff.</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Welcome back, {loading ? '...' : user?.name || 'User'}</h2>
        <p className="text-sm text-gray-500">
          Institution: {user?.institution || 'BatchBox Academy'} | Email: {user?.email || 'n/a'}
        </p>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'overview' ? 'bg-indigo-600 text-white' : 'bg-white border text-gray-700'}`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('timeline')}
          className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'timeline' ? 'bg-indigo-600 text-white' : 'bg-white border text-gray-700'}`}
        >
          Timeline
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'reports' ? 'bg-indigo-600 text-white' : 'bg-white border text-gray-700'}`}
        >
          Reports
        </button>
        <button
          onClick={() => setActiveTab('announcements')}
          className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'announcements' ? 'bg-indigo-600 text-white' : 'bg-white border text-gray-700'}`}
        >
          Announcements
        </button>
      </div>

      {renderTabContent()}
    </div>
  );
};

export default DashboardContent;
