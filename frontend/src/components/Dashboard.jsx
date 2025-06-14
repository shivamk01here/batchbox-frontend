import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import DashboardContent from './DashboardContent';
import ProfilePage from './ProfilePage';
import People from './People';
import Package from '../components/Sidebar/Package';
import Class from '../components/Sidebar/Class';
import BookingSetting from './BookingSetting';
import MoodPage from './MoodPage';
import FinancePage from './FinancePage';
import SettingsPage from './SettingsPage';
import ReportsPage from './ReportsPage';
import HelpPage from './HelpPage';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Homepage');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent user={user} />;
      case 'profile':
        return <ProfilePage user={user} />;
      case 'People':
          return <People />;
      case 'Class':
        return <Class />;
      case 'item':
          return <Package />;
      case 'online Booking':
          return <BookingSetting />;
      case 'analytics':
          return <MoodPage />
      case 'FinancePage':
        return <FinancePage />;
      case 'SettingsPage':
        return <SettingsPage />;
      case 'reports':
        return <ReportsPage />;
      case 'HelpPage':
        return <HelpPage />
      default:
        return  <DashboardContent user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Main Content Area - adjusted for sidebar width */}
        <div className="flex-1 ml-20 min-h-screen">
          {/* Navbar */}
          <Navbar user={user} setActiveTab={setActiveTab} />
          
          {/* Content */}
          <main className="p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;