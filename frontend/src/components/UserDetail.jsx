// src/components/UserDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserDetail = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/user-detail/${id}`);
        setUser(res.data.user); // Assuming the API returns { user: {...} }
      } catch (err) {
        console.error('Error fetching user details:', err);
        setError('Failed to load user details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUserDetail();
    }
  }, [id]); // Re-fetch when ID changes

  if (loading) {
    return <div className="p-6 text-center">Loading user details...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600 text-center">{error}</div>;
  }

  if (!user) {
    return <div className="p-6 text-center">User not found.</div>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">User Profile</h2>
      <div className="space-y-4">
        <p className="text-gray-700">
          <strong className="text-gray-900">Name:</strong> {user.name}
        </p>
        <p className="text-gray-700">
          <strong className="text-gray-900">Email:</strong> {user.email}
        </p>
        {/* Add more user details if available from the API */}
        <p className="text-gray-700">
          <strong className="text-gray-900">Mobile:</strong> {user.mobile || 'N/A'}
        </p>
        <p className="text-gray-700">
          <strong className="text-gray-900">Role:</strong> {user.role ? user.role.name : 'N/A'}
        </p>
        <p className="text-gray-700">
          <strong className="text-gray-900">Status:</strong>{' '}
          {user.is_verified ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Verified
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Not Verified
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default UserDetail;