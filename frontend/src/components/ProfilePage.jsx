import React from 'react';
import { User, Mail, Phone, MapPin, Shield } from 'lucide-react';

const ProfilePage = () => {
  // Dummy user data
  const user = {
    name: 'Ravi Sharma',
    email: 'ravi.sharma@batchbox.in',
    staffID: 'BBX1234',
    role: {
      name: 'faculty'
    },
    institution: {
      name: 'Bright Future Coaching',
      email: 'contact@brightfuture.edu',
      phone: '+91 9876543210'
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <User size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-purple-100 text-lg capitalize">{user.role.name}</p>
            <p className="text-purple-200">{user.institution.name}</p>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Info */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail size={18} className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Shield size={18} className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="text-gray-900 capitalize">{user.role.name}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <User size={18} className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Staff ID</p>
                <p className="text-gray-900">{user.staffID}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Institution Info */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Institution Details</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <MapPin size={18} className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Institution</p>
                <p className="text-gray-900">{user.institution.name}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Mail size={18} className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Institution Email</p>
                <p className="text-gray-900">{user.institution.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone size={18} className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-gray-900">{user.institution.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Button */}
      <div className="text-center">
        <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
