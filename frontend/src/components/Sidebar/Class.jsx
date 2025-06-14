import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { 
  Plus, 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Activity,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

const Classes = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add', 'view', 'edit'
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [calendarView, setCalendarView] = useState('dayGridMonth');
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    from: '',
    to: '',
    status: 'active',
    teacher: '',
    description: '',
    maxStudents: 30,
    currentStudents: 0
  });

  // Mock data for development
  const mockEvents = [
    {
      id: 1,
      title: 'Physics - Mechanics',
      teacher: 'Dr. Sarah Johnson',
      location: 'Room A-101',
      from: '2025-06-15T10:00:00',
      to: '2025-06-15T11:30:00',
      status: 'active',
      description: 'Introduction to Newtonian mechanics and motion laws',
      maxStudents: 30,
      currentStudents: 25
    },
    {
      id: 2,
      title: 'Mathematics - Calculus',
      teacher: 'Prof. Michael Chen',
      location: 'Room B-205',
      from: '2025-06-16T14:00:00',
      to: '2025-06-16T15:30:00',
      status: 'active',
      description: 'Differential and integral calculus fundamentals',
      maxStudents: 25,
      currentStudents: 22
    },
    {
      id: 3,
      title: 'Chemistry - Organic',
      teacher: 'Dr. Emily Davis',
      location: 'Lab C-301',
      from: '2025-06-17T09:00:00',
      to: '2025-06-17T10:30:00',
      status: 'completed',
      description: 'Organic chemistry reactions and mechanisms',
      maxStudents: 20,
      currentStudents: 18
    }
  ];

  // Initialize with mock data
  useEffect(() => {
    setEvents(mockEvents);
    setFilteredEvents(mockEvents);
  }, []);

  // Filter events based on search and status
  useEffect(() => {
    let filtered = events;

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(event => event.status === statusFilter);
    }

    setFilteredEvents(filtered);
  }, [events, searchTerm, statusFilter]);

  // Format events for FullCalendar
  const calendarEvents = filteredEvents.map(event => ({
    id: event.id,
    title: event.title,
    start: event.from,
    end: event.to,
    extendedProps: event,
    backgroundColor: getStatusColor(event.status),
    borderColor: getStatusColor(event.status, true),
    textColor: '#ffffff'
  }));

  function getStatusColor(status, border = false) {
    const colors = {
      active: border ? '#1d4ed8' : '#3b82f6',
      completed: border ? '#059669' : '#10b981',
      cancelled: border ? '#dc2626' : '#ef4444',
      pending: border ? '#d97706' : '#f59e0b'
    };
    return colors[status] || colors.active;
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (modalType === 'add') {
        const newEvent = {
          ...formData,
          id: Date.now(),
          currentStudents: 0
        };
        setEvents(prev => [...prev, newEvent]);
      } else if (modalType === 'edit') {
        setEvents(prev => prev.map(event => 
          event.id === selectedEvent.id ? { ...formData, id: selectedEvent.id } : event
        ));
      }

      handleCloseModal();
    } catch (error) {
      console.error('Error saving event:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle event click
  const handleEventClick = (clickInfo) => {
    const eventData = clickInfo.event.extendedProps;
    setSelectedEvent(eventData);
    setFormData(eventData);
    setModalType('view');
    setShowModal(true);
  };

  // Handle date select (for adding new events)
  const handleDateSelect = (selectInfo) => {
    const startDate = selectInfo.start.toISOString().slice(0, 16);
    const endDate = selectInfo.end ? selectInfo.end.toISOString().slice(0, 16) : startDate;
    
    setFormData({
      title: '',
      location: '',
      from: startDate,
      to: endDate,
      status: 'active',
      teacher: '',
      description: '',
      maxStudents: 30,
      currentStudents: 0
    });
    setModalType('add');
    setShowModal(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
    setFormData({
      title: '',
      location: '',
      from: '',
      to: '',
      status: 'active',
      teacher: '',
      description: '',
      maxStudents: 30,
      currentStudents: 0
    });
  };

  // Handle edit mode
  const handleEdit = () => {
    setModalType('edit');
  };

  // Handle delete
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setEvents(prev => prev.filter(event => event.id !== selectedEvent.id));
        handleCloseModal();
      } catch (error) {
        console.error('Error deleting event:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const getModalTitle = () => {
    switch (modalType) {
      case 'add': return 'Add New Class';
      case 'edit': return 'Edit Class';
      case 'view': return 'Class Details';
      default: return 'Class';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-6 w-6 text-slate-600" />
                <h1 className="text-2xl font-bold text-slate-900">Classes</h1>
              </div>
              <div className="text-sm text-slate-500">
                {filteredEvents.length} classes scheduled
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search classes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="pending">Pending</option>
              </select>

              {/* Add Class Button */}
              <button
                onClick={() => {
                  setModalType('add');
                  setShowModal(true);
                }}
                className="inline-flex items-center px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Class
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Controls */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCalendarView('dayGridMonth')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                calendarView === 'dayGridMonth' 
                  ? 'bg-slate-100 text-slate-900' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setCalendarView('timeGridWeek')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                calendarView === 'timeGridWeek' 
                  ? 'bg-slate-100 text-slate-900' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setCalendarView('timeGridDay')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                calendarView === 'timeGridDay' 
                  ? 'bg-slate-100 text-slate-900' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Day
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-slate-600">Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-slate-600">Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-slate-600">Cancelled</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-slate-600">Pending</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="flex-1 p-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            {loading && (
              <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-800"></div>
              </div>
            )}
            
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: ''
              }}
              initialView={calendarView}
              events={calendarEvents}
              eventClick={handleEventClick}
              selectable={true}
              selectMirror={true}
              select={handleDateSelect}
              height="auto"
              dayMaxEvents={true}
              eventDisplay="block"
              eventTimeFormat={{
                hour: 'numeric',
                minute: '2-digit',
                meridiem: 'short'
              }}
              slotMinTime="06:00:00"
              slotMaxTime="22:00:00"
              allDaySlot={false}
              view={calendarView}
              datesSet={(dateInfo) => setCalendarView(dateInfo.view.type)}
            />
          </div>
        </div>
      </div>

      {/* Right Side Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/20" onClick={handleCloseModal}></div>
          
          {/* Modal Panel */}
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-slate-50">
                <h2 className="text-xl font-semibold text-slate-900">
                  {getModalTitle()}
                </h2>
                <div className="flex items-center space-x-2">
                  {modalType === 'view' && (
                    <>
                      <button
                        onClick={handleEdit}
                        className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleDelete}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </>
                  )}
                  <button
                    onClick={handleCloseModal}
                    className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto">
                {modalType === 'view' ? (
                  /* View Mode */
                  <div className="p-6 space-y-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">
                          {selectedEvent?.title}
                        </h3>
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          selectedEvent?.status === 'active' ? 'bg-blue-100 text-blue-800' :
                          selectedEvent?.status === 'completed' ? 'bg-green-100 text-green-800' :
                          selectedEvent?.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          <Activity className="h-3 w-3 mr-1" />
                          {selectedEvent?.status?.charAt(0).toUpperCase() + selectedEvent?.status?.slice(1)}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                          <User className="h-5 w-5 text-slate-600" />
                          <div>
                            <div className="text-sm font-medium text-slate-900">Teacher</div>
                            <div className="text-slate-600">{selectedEvent?.teacher}</div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                          <MapPin className="h-5 w-5 text-slate-600" />
                          <div>
                            <div className="text-sm font-medium text-slate-900">Location</div>
                            <div className="text-slate-600">{selectedEvent?.location}</div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                          <Clock className="h-5 w-5 text-slate-600" />
                          <div>
                            <div className="text-sm font-medium text-slate-900">Schedule</div>
                            <div className="text-slate-600">
                              {selectedEvent?.from && new Date(selectedEvent.from).toLocaleString()} - 
                              {selectedEvent?.to && new Date(selectedEvent.to).toLocaleString()}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                          <User className="h-5 w-5 text-slate-600" />
                          <div>
                            <div className="text-sm font-medium text-slate-900">Students</div>
                            <div className="text-slate-600">
                              {selectedEvent?.currentStudents} / {selectedEvent?.maxStudents} enrolled
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                              <div 
                                className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                                style={{ 
                                  width: selectedEvent?.maxStudents > 0 
                                    ? `${(selectedEvent?.currentStudents / selectedEvent?.maxStudents) * 100}%` 
                                    : '0%' 
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {selectedEvent?.description && (
                        <div>
                          <h4 className="text-sm font-medium text-slate-900 mb-2">Description</h4>
                          <p className="text-slate-600 bg-slate-50 p-3 rounded-lg">
                            {selectedEvent.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Add/Edit Form */
                  <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Class Title *
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., Physics - Mechanics"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Teacher *
                        </label>
                        <input
                          type="text"
                          name="teacher"
                          value={formData.teacher}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Teacher name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Location *
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., Room A-101"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Start Date & Time *
                          </label>
                          <input
                            type="datetime-local"
                            name="from"
                            value={formData.from}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            End Date & Time *
                          </label>
                          <input
                            type="datetime-local"
                            name="to"
                            value={formData.to}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Status
                        </label>
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="active">Active</option>
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Maximum Students
                        </label>
                        <input
                          type="number"
                          name="maxStudents"
                          value={formData.maxStudents}
                          onChange={handleInputChange}
                          min="1"
                          max="100"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Description
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          placeholder="Class description..."
                        />
                      </div>
                    </div>
                  </form>
                )}
              </div>

              {/* Modal Footer */}
              {modalType !== 'view' && (
                <div className="p-6 border-t border-gray-200 bg-slate-50">
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-6 py-2 text-slate-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Saving...' : modalType === 'add' ? 'Create Class' : 'Update Class'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Classes;