// src/pages/ReportsPage.jsx
import React, { useState } from 'react';

const tabs = ['Attendance Report', 'Fee Collection', 'Test Performance'];

const dummyReports = {
  'Attendance Report': [
    { id: 1, class: '10th A', present: 26, absent: 4, date: '2024-05-10' },
    { id: 2, class: '12th B', present: 24, absent: 6, date: '2024-05-10' },
  ],
  'Fee Collection': [
    { id: 1, class: '10th A', collected: 45000, pending: 15000, month: 'May' },
    { id: 2, class: '12th B', collected: 30000, pending: 20000, month: 'May' },
  ],
  'Test Performance': [
    { id: 1, subject: 'Math', average: 72, highest: 98, testDate: '2024-05-01' },
    { id: 2, subject: 'Physics', average: 64, highest: 92, testDate: '2024-05-03' },
  ]
};

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Reports Dashboard</h1>

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

      {/* Dynamic Report Content */}
      <div className="bg-white p-6 rounded-2xl shadow border border-gray-200 space-y-4">
        {activeTab === 'Attendance Report' && dummyReports['Attendance Report'].map(r => (
          <div key={r.id} className="flex justify-between items-center border-b pb-2">
            <p><strong>Class:</strong> {r.class}</p>
            <p><strong>Date:</strong> {r.date}</p>
            <p><strong>Present:</strong> {r.present}</p>
            <p><strong>Absent:</strong> {r.absent}</p>
          </div>
        ))}

        {activeTab === 'Fee Collection' && dummyReports['Fee Collection'].map(r => (
          <div key={r.id} className="flex justify-between items-center border-b pb-2">
            <p><strong>Class:</strong> {r.class}</p>
            <p><strong>Month:</strong> {r.month}</p>
            <p><strong>Collected:</strong> ₹{r.collected}</p>
            <p><strong>Pending:</strong> ₹{r.pending}</p>
          </div>
        ))}

        {activeTab === 'Test Performance' && dummyReports['Test Performance'].map(r => (
          <div key={r.id} className="flex justify-between items-center border-b pb-2">
            <p><strong>Subject:</strong> {r.subject}</p>
            <p><strong>Test Date:</strong> {r.testDate}</p>
            <p><strong>Average:</strong> {r.average}%</p>
            <p><strong>Highest:</strong> {r.highest}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsPage;
