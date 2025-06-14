import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { Dialog, Transition } from '@headlessui/react';

const Package = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('packages');
  
  // Package states
  const [packages, setPackages] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', price: '', duration: '', subject_ids: [] });
  const [showAddModal, setShowAddModal] = useState(false);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const [errorPackages, setErrorPackages] = useState(null);
  
  // Subject states
  const [subjects, setSubjects] = useState([]);
  const [subjectModalData, setSubjectModalData] = useState(null);
  const [showSubjectDetailModal, setShowSubjectDetailModal] = useState(false);
  const [subjectFormData, setSubjectFormData] = useState({ name: '', status: 'active' });
  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);
  const [loadingSubjects, setLoadingSubjects] = useState(true);
  const [errorSubjects, setErrorSubjects] = useState(null);

  useEffect(() => {
    fetchPackages();
    fetchSubjects();
  }, []);

  // Package functions
  const fetchPackages = async () => {
    setLoadingPackages(true);
    setErrorPackages(null);
    try {
      const res = await axios.get('/api/packages');
      if (res.data && Array.isArray(res.data)) {
        setPackages(res.data);
      } else {
        console.error("API response for /api/packages was not a direct array:", res.data);
        setErrorPackages("Failed to load packages: Unexpected data format.");
        setPackages([]);
      }
    } catch (error) {
      console.error("Error fetching packages:", error);
      setErrorPackages("Failed to load packages. Please check your network.");
      setPackages([]);
    } finally {
      setLoadingPackages(false);
    }
  };

  const handlePackageClick = async (id) => {
    setModalData(null);
    try {
      const res = await axios.get(`/api/packages/${id}`);
      if (res.data && res.data.package && Array.isArray(res.data.subjects)) {
        setModalData(res.data);
        setShowDetailModal(true);
      } else {
        console.error("Failed to load package details: Unexpected data format for package ID", id, res.data);
        alert("Could not load package details. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching package details:", error);
      alert("Error loading package details. Please try again.");
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const id = parseInt(value);
      setFormData(prev => ({
        ...prev,
        subject_ids: checked
          ? [...prev.subject_ids, id]
          : prev.subject_ids.filter(sid => sid !== id)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddPackage = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/packages', formData);
      setShowAddModal(false);
      setFormData({ name: '', price: '', duration: '', subject_ids: [] });
      fetchPackages();
    } catch (error) {
      console.error("Error adding package:", error);
      alert("Failed to add package. Please check your input and try again.");
    }
  };

  // Subject functions
  const fetchSubjects = async () => {
    setLoadingSubjects(true);
    setErrorSubjects(null);
    try {
      const res = await axios.get('/api/subjects');
      if (res.data && Array.isArray(res.data.data)) {
        setSubjects(res.data.data);
      } else {
        console.error("API response for /api/subjects was not an array in 'data' property:", res.data);
        setErrorSubjects("Failed to load subjects: Unexpected data format.");
        setSubjects([]);
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
      setErrorSubjects("Failed to load subjects. Please check your network.");
      setSubjects([]);
    } finally {
      setLoadingSubjects(false);
    }
  };

  const handleSubjectClick = (subject) => {
    setSubjectModalData(subject);
    setShowSubjectDetailModal(true);
  };

  const handleSubjectFormChange = (e) => {
    setSubjectFormData({ ...subjectFormData, [e.target.name]: e.target.value });
  };

  const handleAddSubject = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/subjects', subjectFormData);
      if (res.data.success) {
        setShowAddSubjectModal(false);
        setSubjectFormData({ name: '', status: 'active' });
        fetchSubjects();
      }
    } catch (error) {
      console.error("Error adding subject:", error);
      alert("Failed to add subject. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg min-h-[600px]">
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        <button
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
            activeTab === 'packages'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('packages')}
        >
          Packages
        </button>
        <button
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
            activeTab === 'subjects'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('subjects')}
        >
          Subjects
        </button>
      </div>

      {/* Packages Tab Content */}
      {activeTab === 'packages' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-extrabold text-gray-800">Packages Management</h2>
            <button
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              onClick={() => setShowAddModal(true)}
            >
              Add New Package
            </button>
          </div>

          {loadingPackages ? (
            <div className="text-center py-8 text-gray-600">Loading packages...</div>
          ) : errorPackages ? (
            <div className="text-center py-8 text-red-600 font-semibold">{errorPackages}</div>
          ) : packages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No packages found. Click "Add New Package" to create one.</div>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {packages.map(pkg => (
                <li
                  key={pkg.id}
                  className="p-5 border border-gray-200 rounded-xl bg-gray-50 shadow-sm hover:shadow-md hover:border-blue-300 cursor-pointer transition-all duration-200 ease-in-out transform hover:-translate-y-1"
                  onClick={() => handlePackageClick(pkg.id)}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{pkg.name}</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    <span className="font-semibold">Price:</span> ₹{pkg.price} | <span className="font-semibold">Duration:</span> {pkg.duration} days
                  </p>
                  <p className={`text-xs font-semibold ${pkg.status ? 'text-green-600' : 'text-red-600'}`}>
                    Status: {pkg.status ? 'Active' : 'Inactive'}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Subjects Tab Content */}
      {activeTab === 'subjects' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-extrabold text-gray-800">Subjects Management</h2>
            <button
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              onClick={() => setShowAddSubjectModal(true)}
            >
              Add New Subject
            </button>
          </div>

          {loadingSubjects ? (
            <div className="text-center py-8 text-gray-600">Loading subjects...</div>
          ) : errorSubjects ? (
            <div className="text-center py-8 text-red-600 font-semibold">{errorSubjects}</div>
          ) : subjects.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No subjects found. Click "Add New Subject" to create one.</div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">ID</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Name</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {subjects.map((subject) => (
                    <tr key={subject.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="py-4 px-6 text-gray-900">{subject.id}</td>
                      <td className="py-4 px-6 text-gray-900 font-medium">{subject.name}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          subject.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {subject.status === 1 ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleSubjectClick(subject)}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Package Detail Modal */}
      <Transition appear show={showDetailModal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setShowDetailModal(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {modalData ? (
                    <>
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900 border-b pb-2 mb-4"
                      >
                        {modalData.package?.name || 'Package Details'}
                      </Dialog.Title>
                      <div className="mt-2 text-gray-700">
                        <p className="mb-1">
                          <span className="font-semibold">Price:</span> ₹{modalData.package?.price}
                        </p>
                        <p className="mb-3">
                          <span className="font-semibold">Duration:</span> {modalData.package?.duration} days
                        </p>
                        <h4 className="font-bold text-gray-800 mb-2">Included Subjects:</h4>
                        {Array.isArray(modalData.subjects) && modalData.subjects.length > 0 ? (
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            {modalData.subjects.map(sub => (
                              <li key={sub.id} className="flex items-center">
                                <span className="font-medium">{sub.name}</span>
                                <span className={`ml-2 text-xs font-semibold ${sub.status ? 'text-green-600' : 'text-red-600'}`}>
                                  ({sub.status ? 'Active' : 'Inactive'})
                                </span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-500 text-sm">No subjects linked to this package.</p>
                        )}
                      </div>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                          onClick={() => setShowDetailModal(false)}
                        >
                          Close
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center text-gray-500">Loading details...</div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Subject Detail Modal */}
      <Transition appear show={showSubjectDetailModal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setShowSubjectDetailModal(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {subjectModalData ? (
                    <>
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900 border-b pb-2 mb-4"
                      >
                        Subject Details
                      </Dialog.Title>
                      <div className="mt-2 text-gray-700">
                        <p className="mb-2">
                          <span className="font-semibold">ID:</span> {subjectModalData.id}
                        </p>
                        <p className="mb-2">
                          <span className="font-semibold">Name:</span> {subjectModalData.name}
                        </p>
                        <p className="mb-2">
                          <span className="font-semibold">Status:</span> 
                          <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            subjectModalData.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {subjectModalData.status === 1 ? 'Active' : 'Inactive'}
                          </span>
                        </p>
                        <p className="mb-2">
                          <span className="font-semibold">Created At:</span> {subjectModalData.created_at ? new Date(subjectModalData.created_at).toLocaleDateString() : 'N/A'}
                        </p>
                        <p className="mb-2">
                          <span className="font-semibold">Updated At:</span> {subjectModalData.updated_at ? new Date(subjectModalData.updated_at).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                          onClick={() => setShowSubjectDetailModal(false)}
                        >
                          Close
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center text-gray-500">Loading details...</div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Add Package Modal */}
      <Transition appear show={showAddModal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setShowAddModal(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 border-b pb-2 mb-4"
                  >
                    Add New Package
                  </Dialog.Title>
                  <form onSubmit={handleAddPackage} className="space-y-4 mt-2">
                    <div>
                      <label htmlFor="packageName" className="block text-sm font-medium text-gray-700 mb-1">
                        Package Name
                      </label>
                      <input
                        id="packageName"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                        placeholder="e.g., Premium Study Pack"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="packagePrice" className="block text-sm font-medium text-gray-700 mb-1">
                        Price (₹)
                      </label>
                      <input
                        id="packagePrice"
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleFormChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                        placeholder="e.g., 999"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="packageDuration" className="block text-sm font-medium text-gray-700 mb-1">
                        Duration (days)
                      </label>
                      <input
                        id="packageDuration"
                        name="duration"
                        type="number"
                        value={formData.duration}
                        onChange={handleFormChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                        placeholder="e.g., 30"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Subjects</label>
                      {loadingSubjects ? (
                        <div className="text-center text-gray-500">Loading subjects...</div>
                      ) : errorSubjects ? (
                        <div className="text-red-600 text-sm">{errorSubjects}</div>
                      ) : subjects.length === 0 ? (
                        <div className="text-gray-500 text-sm">No subjects available to select.</div>
                      ) : (
                        <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-gray-200 p-3 rounded-md bg-gray-50">
                          {subjects.map(sub => (
                            sub.status === 1 && (
                              <label key={sub.id} className="flex items-center text-sm text-gray-800">
                                <input
                                  type="checkbox"
                                  value={sub.id}
                                  onChange={handleFormChange}
                                  checked={formData.subject_ids.includes(sub.id)}
                                  className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded"
                                />
                                <span className="ml-2">{sub.name}</span>
                              </label>
                            )
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => setShowAddModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Add Package
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Add Subject Modal */}
      <Transition appear show={showAddSubjectModal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setShowAddSubjectModal(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 border-b pb-2 mb-4"
                  >
                    Add New Subject
                  </Dialog.Title>
                  <form onSubmit={handleAddSubject} className="space-y-4 mt-2">
                    <div>
                      <label htmlFor="subjectName" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject Name
                      </label>
                      <input
                        id="subjectName"
                        name="name"
                        value={subjectFormData.name}
                        onChange={handleSubjectFormChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                        placeholder="e.g., Mathematics"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="subjectStatus" className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        id="subjectStatus"
                        name="status"
                        value={subjectFormData.status}
                        onChange={handleSubjectFormChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                      >
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                      </select>
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => setShowAddSubjectModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      >
                        Add Subject
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Package;