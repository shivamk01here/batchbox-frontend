// src/components/StudentDetail.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, UserIcon } from '@heroicons/react/outline';

const StudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const student = {
    id,
    name: 'Aarav Mehta',
    email: 'aarav.mehta@example.com',
    parentEmail: 'mehta.parents@example.com',
    phone: '9876543210',
    is_verified: true,
    photo: null, // add photo URL if needed
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-xl rounded-2xl mt-8">
      <button
        onClick={() => navigate('/people')}
        className="mb-6 flex items-center text-sm text-indigo-600 hover:underline"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back to Students
      </button>

      <div className="flex space-x-8 items-center border-b pb-6">
        {student.photo ? (
          <img
            src={student.photo}
            alt={student.name}
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
            <UserIcon className="h-10 w-10 text-gray-400" />
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{student.name}</h1>
          <p className="text-sm text-gray-500">Student ID: #{student.id}</p>
          <span
            className={`mt-2 inline-block px-3 py-1 text-xs font-medium rounded-full ${
              student.is_verified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            {student.is_verified ? 'Verified' : 'Not Verified'}
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-500">Email</label>
          <p className="text-lg text-gray-900">{student.email}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Phone</label>
          <p className="text-lg text-gray-900">{student.phone}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Parent Email</label>
          <p className="text-lg text-gray-900">{student.parentEmail}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
