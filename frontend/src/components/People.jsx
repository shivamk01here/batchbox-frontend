// src/components/PeopleTab.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserIcon, ChevronLeftIcon } from '@heroicons/react/outline';

const PeopleTab = () => {
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', roleID: '4' });
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('students');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/admin/users');
      setUsers(res.data.filter(user => user.roleID === 3)); // Only Students
    } catch (error) {
      console.error('Error fetching users:', error);
      setMessage('Error fetching users.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/users', formData);
      setMessage('User created successfully!');
      setFormData({ name: '', email: '', mobile: '', roleID: '4' });
      fetchUsers();
      setShowModal(false);
    } catch (error) {
      console.error('Error adding user:', error);
      setMessage('Error adding user. Please try again.');
    }
  };

  const renderStudentList = () => (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-900">Students</h3>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          + Add Student
        </button>
      </div>

      <div className="bg-white rounded-xl shadow border p-4">
        {users.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No students found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {users.map(user => (
              <li
                key={user.id}
                onClick={() => setSelectedStudent(user)}
                className="flex justify-between items-center py-3 px-2 hover:bg-gray-50 cursor-pointer rounded-md transition"
              >
                <div>
                  <p className="text-gray-900 font-medium">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${user.is_verified ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                  {user.is_verified ? 'Verified' : 'Not Verified'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );

  const renderStudentDetail = () => (
    <div className="bg-white rounded-xl shadow border p-6">
      <button
        onClick={() => setSelectedStudent(null)}
        className="flex items-center text-sm text-indigo-600 mb-4 hover:underline"
      >
        <ChevronLeftIcon className="h-5 w-5 mr-1" />
        Back to Students
      </button>
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          <UserIcon className="w-8 h-8 text-gray-400" />
        </div>
        <div>
          <h4 className="text-xl font-bold text-gray-900">{selectedStudent.name}</h4>
          <p className="text-gray-600">{selectedStudent.email}</p>
          <p className="text-sm text-gray-500">Student ID: {selectedStudent.id}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">People Management</h2>
      <div className="flex space-x-6">
        {/* Tabs Navigation */}
        <div className="w-48">
          <div className="flex flex-col space-y-2">
            {['staff', 'students', 'leads'].map(tab => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setSelectedStudent(null); }}
                className={`text-left px-4 py-2 rounded-lg font-medium ${activeTab === tab ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1">
          {activeTab === 'students' && (
            selectedStudent ? renderStudentDetail() : renderStudentList()
          )}

          {activeTab !== 'students' && (
            <div className="text-gray-400 italic">This tab is under construction.</div>
          )}
        </div>
      </div>

      {/* Slide-In Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-30">
          <div className="bg-white w-full max-w-md h-full shadow-lg p-8 overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Add New Student</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="mt-1 w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="mt-1 w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  placeholder="john.doe@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mobile</label>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                  required
                  className="mt-1 w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  placeholder="9876543210"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md shadow-md hover:bg-indigo-700 transition font-semibold"
              >
                Add Student
              </button>
            </form>
            {message && (
              <p className={`mt-4 text-center ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                {message}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PeopleTab;
