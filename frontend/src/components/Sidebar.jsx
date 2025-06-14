import React from 'react';
import {
  Home,
  Users,
  BookOpen, // Kept this if you prefer it for booking, or consider CalendarCheck
  BarChart3,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  Book,
  School,
  Package,
  PiggyBank,     // New icon for FinancePage
  Tag,           // New icon for 'item' or 'Packages'
  LayoutDashboard, // New icon for Dashboard
  ClipboardList,   // New icon for Reports
  CalendarCheck    // Alternative icon for Online Booking
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { logout, currentUser } = useAuth();

  // Define the main menu items based on user role
  // IMPORTANT: 'id' values are kept exactly as in your original code.
  const menuItems = currentUser?.roleID === 1 ? [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' }, // Changed icon
    { id: 'People', icon: Users, label: 'People' },
    { id: 'Class', icon: School, label: 'Class' },
    { id: 'package', icon: Package, label: 'Packages' }, // Kept original Package icon
    { id: 'online Booking', icon: CalendarCheck, label: 'Online Booking' }, // Changed icon
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'reports', icon: ClipboardList, label: 'Reports' }, // Changed icon
    { id: 'FinancePage', icon: PiggyBank, label: 'FinancePage' }, // Changed icon, kept id
  ] : [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' }, // Changed icon
    { id: 'People', icon: Users, label: 'People' },
    { id: 'Class', icon: School, label: 'Class' },
    { id: 'item', icon: Tag, label: 'Item' }, 
    { id: 'online Booking', icon: CalendarCheck, label: 'Online Booking' }, // Changed icon
    { id: 'analytics', icon: BarChart3, label: 'mood' }, // Changed icon, kept id
    { id: 'reports', icon: ClipboardList, label: 'Reports' }, // Changed icon
    { id: 'FinancePage', icon: PiggyBank, label: 'FinancePage' }, // Changed icon, kept id
    // Removed 'SettingsPage' from here, it's now exclusively in bottomSidebarItems
  ];

  // Define items for the bottom section of the sidebar (Settings, Help, Logout)
  const bottomSidebarItems = [
    { id: 'SettingsPage', icon: Settings, label: 'SettingsPage' }, // Moved here, kept original id
    { id: 'HelpPage', icon: HelpCircle, label: 'HelpPage' }, // Added id for consistency
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-14 bg-white border-r border-gray-100 flex flex-col items-center py-4 z-40 shadow-sm space-y-4">
      {/* Logo Block (unchanged) */}
      <div className="w-10 h-10 bg-gradient-to-br from-slate-700 via-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
        <div className="w-5 h-5 border-2 border-white rounded-lg relative">
          <div className="absolute inset-0.5 bg-white rounded-sm opacity-80"></div>
          <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-slate-700 rounded-full"></div>
          <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-slate-700 rounded-full"></div>
          <div className="absolute bottom-0.5 left-0.5 right-0.5 h-0.5 bg-slate-700 rounded-full"></div>
        </div>
      </div>

      {/* Menu Items (Top Section) */}
      <div className="flex flex-col space-y-3 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <div key={item.id} className="relative group">
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon size={18} />
              </button>

              {/* Tooltip for top menu items */}
              <div className="absolute left-[52px] top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50">
                {item.label}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Items (Settings, Help, Logout) */}
      <div className="flex flex-col space-y-3">
        {bottomSidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id; // Check if bottom item is active

          return (
            <div key={item.id} className="relative group">
              <button
                onClick={() => setActiveTab(item.id)} // This will now set 'activeTab' to 'SettingsPage' or 'Help'
                className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon size={18} />
              </button>

              {/* Tooltip for bottom menu items */}
              <div className="absolute left-[52px] top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50">
                {item.label}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
              </div>
            </div>
          );
        })}

        {/* Logout Button (kept separate for distinct styling/action) */}
        <div className="relative group">
          <button
            onClick={logout}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300"
          >
            <LogOut size={18} />
          </button>

          {/* Tooltip for Logout */}
          <div className="absolute left-[52px] top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50">
            Logout
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;