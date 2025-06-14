// src/pages/FinancePage.jsx
import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/outline';

const dummyInvoices = [
  { id: 1, student: 'Aman Sharma', amount: 15000, status: 'Paid', date: '2024-04-05', method: 'UPI' },
  { id: 2, student: 'Kriti Joshi', amount: 12000, status: 'Pending', date: '2024-04-08', method: 'Cash' },
];

const FinancePage = () => {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Finance Dashboard</h1>

      {/* Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow border border-gray-200">
          <p className="text-gray-600 text-sm">Total Collected</p>
          <h3 className="text-xl font-bold text-green-600">₹27,000</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow border border-gray-200">
          <p className="text-gray-600 text-sm">Pending Fees</p>
          <h3 className="text-xl font-bold text-red-600">₹12,000</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow border border-gray-200">
          <p className="text-gray-600 text-sm">This Month</p>
          <h3 className="text-xl font-bold text-blue-600">₹15,000</h3>
        </div>
      </div>

      {/* Invoices */}
      <div className="bg-white p-6 rounded-2xl shadow border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Invoices</h2>
          <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700">
            <PlusIcon className="h-5 w-5" /> Add Invoice
          </button>
        </div>

        {selectedInvoice ? (
          <div className="border-t pt-4">
            <button onClick={() => setSelectedInvoice(null)} className="text-sm text-indigo-600 mb-4">← Back to List</button>
            <h3 className="text-lg font-bold">Invoice Detail</h3>
            <p><strong>Student:</strong> {selectedInvoice.student}</p>
            <p><strong>Amount:</strong> ₹{selectedInvoice.amount}</p>
            <p><strong>Status:</strong> {selectedInvoice.status}</p>
            <p><strong>Date:</strong> {selectedInvoice.date}</p>
            <p><strong>Payment Method:</strong> {selectedInvoice.method}</p>
          </div>
        ) : (
          <ul className="divide-y">
            {dummyInvoices.map(inv => (
              <li
                key={inv.id}
                className="py-3 flex justify-between items-center hover:bg-gray-50 px-2 cursor-pointer"
                onClick={() => setSelectedInvoice(inv)}
              >
                <div>
                  <p className="font-medium text-gray-900">{inv.student}</p>
                  <p className="text-sm text-gray-600">₹{inv.amount} - {inv.status}</p>
                </div>
                <p className="text-sm text-gray-500">{inv.date}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add Invoice Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end z-50">
          <div className="bg-white w-full max-w-md h-full p-6 overflow-y-auto shadow-xl">
            <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700 float-right text-xl">&times;</button>
            <h3 className="text-xl font-bold mb-6 mt-4">Add Invoice</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Student Name</label>
                <input type="text" placeholder="Enter name" className="w-full mt-1 p-3 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium">Amount</label>
                <input type="number" placeholder="₹" className="w-full mt-1 p-3 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium">Date</label>
                <input type="date" className="w-full mt-1 p-3 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium">Payment Method</label>
                <select className="w-full mt-1 p-3 border rounded-md">
                  <option>Cash</option>
                  <option>UPI</option>
                  <option>Bank Transfer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Status</label>
                <select className="w-full mt-1 p-3 border rounded-md">
                  <option>Paid</option>
                  <option>Pending</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 font-semibold">
                Save Invoice
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancePage;
