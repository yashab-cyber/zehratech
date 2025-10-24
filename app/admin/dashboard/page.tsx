'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  duration: string;
  location: string;
  maxParticipants: number;
  registeredCount: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

interface Registration {
  _id: string;
  name: string;
  class: string;
  course?: string;
  section?: string;
  school: string;
  email: string;
  phone: string;
  event: string;
  createdAt: string;
}

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'workshops' | 'registrations' | 'messages' | 'settings'>('overview');
  const [stats, setStats] = useState({
    totalRegistrations: 0,
    totalEvents: 0,
    thisWeek: 0,
    upcomingEvents: 0,
  });
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEvent, setFilterEvent] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  
  const [showWorkshopForm, setShowWorkshopForm] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState<Event | null>(null);
  const [workshopForm, setWorkshopForm] = useState<{
    title: string;
    description: string;
    date: string;
    duration: string;
    location: string;
    maxParticipants: number;
    status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  }>({
    title: '',
    description: '',
    date: '',
    duration: '',
    location: '',
    maxParticipants: 50,
    status: 'upcoming',
  });

  // Settings form state
  const [settingsForm, setSettingsForm] = useState({
    currentPassword: '',
    newUsername: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsMessage, setSettingsMessage] = useState('');
  const [settingsError, setSettingsError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    } else if (status === 'authenticated') {
      fetchData();
    }
  }, [status, router]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const regRes = await fetch('/api/admin/registrations');
      if (regRes.ok) {
        const regData = await regRes.json();
        setRegistrations(regData.students || []);

        const total = regData.students.length;
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const thisWeek = regData.students.filter(
          (s: Registration) => new Date(s.createdAt) > oneWeekAgo
        ).length;

        const eventsRes = await fetch('/api/admin/events');
        const eventsData = await eventsRes.json();
        const eventsList = eventsData.events || [];
        setEvents(eventsList);

        const upcomingEvents = eventsList.filter(
          (e: Event) => e.status === 'upcoming'
        ).length;

        // Fetch contact messages
        const contactsRes = await fetch('/api/admin/contacts');
        if (contactsRes.ok) {
          const contactsData = await contactsRes.json();
          setContacts(contactsData.contacts || []);
        }

        setStats({
          totalRegistrations: total,
          totalEvents: eventsList.length,
          thisWeek,
          upcomingEvents,
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const response = await fetch('/api/admin/export');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `registrations_${Date.now()}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export data');
    }
  };

  const handleDeleteRegistration = async (id: string) => {
    if (!confirm('Are you sure you want to delete this registration?')) return;
    try {
      const response = await fetch(`/api/admin/registrations?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchData();
      } else {
        alert('Failed to delete registration');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete registration');
    }
  };

  const handleUpdateContactStatus = async (id: string, newStatus: 'new' | 'read' | 'replied') => {
    try {
      const response = await fetch('/api/admin/contacts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (response.ok) {
        fetchData();
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update status');
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      const response = await fetch(`/api/admin/contacts?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchData();
      } else {
        alert('Failed to delete message');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete message');
    }
  };

  const resetWorkshopForm = () => {
    setWorkshopForm({
      title: '',
      description: '',
      date: '',
      duration: '',
      location: '',
      maxParticipants: 50,
      status: 'upcoming',
    });
    setEditingWorkshop(null);
    setShowWorkshopForm(false);
  };

  const handleCreateWorkshop = () => {
    resetWorkshopForm();
    setShowWorkshopForm(true);
  };

  const handleEditWorkshop = (event: Event) => {
    setEditingWorkshop(event);
    setWorkshopForm({
      title: event.title,
      description: event.description,
      date: new Date(event.date).toISOString().split('T')[0],
      duration: event.duration,
      location: event.location,
      maxParticipants: event.maxParticipants,
      status: event.status,
    });
    setShowWorkshopForm(true);
  };

  const handleSaveWorkshop = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = '/api/admin/events';
      const method = editingWorkshop ? 'PUT' : 'POST';
      const body = editingWorkshop
        ? { ...workshopForm, id: editingWorkshop._id }
        : workshopForm;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        resetWorkshopForm();
        fetchData();
        alert(`Workshop ${editingWorkshop ? 'updated' : 'created'} successfully!`);
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to save workshop');
      }
    } catch (error) {
      console.error('Save workshop error:', error);
      alert('Failed to save workshop');
    }
  };

  const handleDeleteWorkshop = async (id: string) => {
    if (!confirm('Are you sure you want to delete this workshop?')) return;
    try {
      const response = await fetch('/api/admin/events', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        fetchData();
        alert('Workshop deleted successfully!');
      } else {
        alert('Failed to delete workshop');
      }
    } catch (error) {
      console.error('Delete workshop error:', error);
      alert('Failed to delete workshop');
    }
  };

  const filteredRegistrations = registrations.filter((reg: Registration) => {
    const matchesSearch =
      reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.school.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEvent = !filterEvent || reg.event === filterEvent;
    const matchesClass = !filterClass || reg.class === filterClass;
    return matchesSearch && matchesEvent && matchesClass;
  });

  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsLoading(true);
    setSettingsError('');
    setSettingsMessage('');

    // Validate passwords match
    if (settingsForm.newPassword && settingsForm.newPassword !== settingsForm.confirmPassword) {
      setSettingsError('New passwords do not match');
      setSettingsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: settingsForm.currentPassword,
          newUsername: settingsForm.newUsername || undefined,
          newPassword: settingsForm.newPassword || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSettingsMessage('Settings updated successfully! Please login again with new credentials.');
        setSettingsForm({
          currentPassword: '',
          newUsername: '',
          newPassword: '',
          confirmPassword: '',
        });
        // Sign out after 2 seconds if credentials changed
        if (settingsForm.newUsername || settingsForm.newPassword) {
          setTimeout(() => {
            signOut({ callbackUrl: '/admin/login' });
          }, 2000);
        }
      } else {
        setSettingsError(data.error || 'Failed to update settings');
      }
    } catch (error) {
      console.error('Update settings error:', error);
      setSettingsError('An error occurred while updating settings');
    } finally {
      setSettingsLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-neon-blue mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen py-6 sm:py-8 px-3 sm:px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8 gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple">
                Admin Dashboard
              </span>
            </h1>
            <p className="text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">Welcome back, {session.user?.name}</p>
          </div>
          <button onClick={() => signOut({ callbackUrl: '/admin/login' })} className="btn-secondary text-sm sm:text-base w-full md:w-auto">
            Logout
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-3 sm:p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Total Registrations</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-neon-blue mt-1 sm:mt-2">{stats.totalRegistrations}</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-neon-blue/20 rounded-lg flex items-center justify-center">
                <span className="text-lg sm:text-xl md:text-2xl">👥</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-3 sm:p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Total Workshops</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-neon-purple mt-1 sm:mt-2">{stats.totalEvents}</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-neon-purple/20 rounded-lg flex items-center justify-center">
                <span className="text-lg sm:text-xl md:text-2xl">📚</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-3 sm:p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">This Week</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-neon-cyan mt-1 sm:mt-2">{stats.thisWeek}</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-neon-cyan/20 rounded-lg flex items-center justify-center">
                <span className="text-lg sm:text-xl md:text-2xl">📈</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card p-3 sm:p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Upcoming Events</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-green-400 mt-1 sm:mt-2">{stats.upcomingEvents}</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-green-400/20 rounded-lg flex items-center justify-center">
                <span className="text-lg sm:text-xl md:text-2xl">🎯</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex gap-2 sm:gap-4 mb-4 sm:mb-6 border-b border-gray-800 overflow-x-auto">
          <button onClick={() => setActiveTab('overview')} className={`px-3 sm:px-6 py-2 sm:py-3 font-semibold transition-all text-xs sm:text-sm md:text-base whitespace-nowrap ${activeTab === 'overview' ? 'text-neon-blue border-b-2 border-neon-blue' : 'text-gray-400 hover:text-white'}`}>
            Overview
          </button>
          <button onClick={() => setActiveTab('workshops')} className={`px-3 sm:px-6 py-2 sm:py-3 font-semibold transition-all text-xs sm:text-sm md:text-base whitespace-nowrap ${activeTab === 'workshops' ? 'text-neon-blue border-b-2 border-neon-blue' : 'text-gray-400 hover:text-white'}`}>
            Workshops
          </button>
          <button onClick={() => setActiveTab('registrations')} className={`px-3 sm:px-6 py-2 sm:py-3 font-semibold transition-all text-xs sm:text-sm md:text-base whitespace-nowrap ${activeTab === 'registrations' ? 'text-neon-blue border-b-2 border-neon-blue' : 'text-gray-400 hover:text-white'}`}>
            Registrations
          </button>
          <button onClick={() => setActiveTab('messages')} className={`px-3 sm:px-6 py-2 sm:py-3 font-semibold transition-all text-xs sm:text-sm md:text-base whitespace-nowrap ${activeTab === 'messages' ? 'text-neon-blue border-b-2 border-neon-blue' : 'text-gray-400 hover:text-white'}`}>
            Messages
          </button>
          <button onClick={() => setActiveTab('settings')} className={`px-3 sm:px-6 py-2 sm:py-3 font-semibold transition-all text-xs sm:text-sm md:text-base whitespace-nowrap ${activeTab === 'settings' ? 'text-neon-blue border-b-2 border-neon-blue' : 'text-gray-400 hover:text-white'}`}>
            Settings
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div className="card">
                <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button onClick={() => { setActiveTab('workshops'); handleCreateWorkshop(); }} className="btn-primary text-left p-4 flex items-center gap-3">
                    <span className="text-2xl">➕</span>
                    <div>
                      <p className="font-semibold">Create Workshop</p>
                      <p className="text-sm opacity-75">Add a new workshop or event</p>
                    </div>
                  </button>
                  <button onClick={() => setActiveTab('registrations')} className="btn-secondary text-left p-4 flex items-center gap-3">
                    <span className="text-2xl">📋</span>
                    <div>
                      <p className="font-semibold">View Registrations</p>
                      <p className="text-sm opacity-75">Manage student registrations</p>
                    </div>
                  </button>
                  <button onClick={handleExport} className="btn-secondary text-left p-4 flex items-center gap-3">
                    <span className="text-2xl">��</span>
                    <div>
                      <p className="font-semibold">Export Data</p>
                      <p className="text-sm opacity-75">Download CSV report</p>
                    </div>
                  </button>
                </div>
              </div>

              <div className="card">
                <h2 className="text-2xl font-bold text-white mb-4">Recent Workshops</h2>
                <div className="space-y-3">
                  {events.slice(0, 5).map((event) => (
                    <div key={event._id} className="flex justify-between items-center p-4 bg-dark-700 rounded-lg hover:bg-dark-600 transition-colors">
                      <div>
                        <h3 className="text-white font-semibold">{event.title}</h3>
                        <p className="text-gray-400 text-sm">{new Date(event.date).toLocaleDateString()} • {event.location}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${event.status === 'upcoming' ? 'bg-green-500/20 text-green-400' : event.status === 'ongoing' ? 'bg-blue-500/20 text-blue-400' : event.status === 'completed' ? 'bg-gray-500/20 text-gray-400' : 'bg-red-500/20 text-red-400'}`}>
                          {event.status}
                        </span>
                        <p className="text-gray-400 text-sm mt-1">{event.registeredCount}/{event.maxParticipants} registered</p>
                      </div>
                    </div>
                  ))}
                  {events.length === 0 && (
                    <p className="text-center text-gray-500 py-8">No workshops yet. Create your first workshop!</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'workshops' && (
            <motion.div key="workshops" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="card mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-white">Workshop Management</h2>
                  <button onClick={handleCreateWorkshop} className="btn-primary">➕ Create Workshop</button>
                </div>

                <AnimatePresence>
                  {showWorkshopForm && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={resetWorkshopForm}>
                      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-dark-900 border border-gray-700 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-2xl font-bold text-white mb-6">{editingWorkshop ? 'Edit Workshop' : 'Create New Workshop'}</h3>
                        <form onSubmit={handleSaveWorkshop} className="space-y-4">
                          <div>
                            <label className="block text-gray-400 mb-2">Workshop Title *</label>
                            <input type="text" required value={workshopForm.title} onChange={(e) => setWorkshopForm({ ...workshopForm, title: e.target.value })} className="input-field w-full" placeholder="e.g., Introduction to Machine Learning" />
                          </div>
                          <div>
                            <label className="block text-gray-400 mb-2">Description *</label>
                            <textarea required value={workshopForm.description} onChange={(e) => setWorkshopForm({ ...workshopForm, description: e.target.value })} className="input-field w-full" rows={4} placeholder="Describe what students will learn..." />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-gray-400 mb-2">Date *</label>
                              <input type="date" required value={workshopForm.date} onChange={(e) => setWorkshopForm({ ...workshopForm, date: e.target.value })} className="input-field w-full" />
                            </div>
                            <div>
                              <label className="block text-gray-400 mb-2">Duration *</label>
                              <input type="text" required value={workshopForm.duration} onChange={(e) => setWorkshopForm({ ...workshopForm, duration: e.target.value })} className="input-field w-full" placeholder="e.g., 2 hours" />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-gray-400 mb-2">Location *</label>
                              <input type="text" required value={workshopForm.location} onChange={(e) => setWorkshopForm({ ...workshopForm, location: e.target.value })} className="input-field w-full" placeholder="e.g., Online / Delhi" />
                            </div>
                            <div>
                              <label className="block text-gray-400 mb-2">Max Participants *</label>
                              <input type="number" required min="1" value={workshopForm.maxParticipants} onChange={(e) => setWorkshopForm({ ...workshopForm, maxParticipants: parseInt(e.target.value) })} className="input-field w-full" />
                            </div>
                          </div>
                          <div>
                            <label className="block text-gray-400 mb-2">Status *</label>
                            <select value={workshopForm.status} onChange={(e) => setWorkshopForm({ ...workshopForm, status: e.target.value as 'upcoming' | 'ongoing' | 'completed' | 'cancelled' })} className="input-field w-full">
                              <option value="upcoming">Upcoming</option>
                              <option value="ongoing">Ongoing</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </div>
                          <div className="flex gap-4 pt-4">
                            <button type="submit" className="btn-primary flex-1">{editingWorkshop ? 'Update Workshop' : 'Create Workshop'}</button>
                            <button type="button" onClick={resetWorkshopForm} className="btn-secondary flex-1">Cancel</button>
                          </div>
                        </form>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-4 mt-6">
                  {events.map((event) => (
                    <div key={event._id} className="bg-dark-700 rounded-lg p-6 hover:bg-dark-600 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-white">{event.title}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${event.status === 'upcoming' ? 'bg-green-500/20 text-green-400' : event.status === 'ongoing' ? 'bg-blue-500/20 text-blue-400' : event.status === 'completed' ? 'bg-gray-500/20 text-gray-400' : 'bg-red-500/20 text-red-400'}`}>
                              {event.status}
                            </span>
                          </div>
                          <p className="text-gray-400 mb-3">{event.description}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Date:</span>
                              <p className="text-white">{new Date(event.date).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Duration:</span>
                              <p className="text-white">{event.duration}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Location:</span>
                              <p className="text-white">{event.location}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Registrations:</span>
                              <p className="text-white">{event.registeredCount}/{event.maxParticipants}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button onClick={() => handleEditWorkshop(event)} className="text-neon-blue hover:text-neon-cyan transition-colors px-3 py-1">✏️ Edit</button>
                          <button onClick={() => handleDeleteWorkshop(event._id)} className="text-red-400 hover:text-red-300 transition-colors px-3 py-1">🗑️ Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {events.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-500 mb-4">No workshops created yet</p>
                      <button onClick={handleCreateWorkshop} className="btn-primary">Create Your First Workshop</button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'registrations' && (
            <motion.div key="registrations" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="card mb-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                  <div className="flex flex-col md:flex-row gap-4 flex-1 w-full">
                    <input type="text" placeholder="Search by name, email, or school..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input-field flex-1" />
                    <select value={filterEvent} onChange={(e) => setFilterEvent(e.target.value)} className="input-field">
                      <option value="">All Events</option>
                      {events.map((event) => (
                        <option key={event._id} value={event.title}>{event.title}</option>
                      ))}
                    </select>
                    <select value={filterClass} onChange={(e) => setFilterClass(e.target.value)} className="input-field">
                      <option value="">All Classes</option>
                      <option value="9">Class 9</option>
                      <option value="10">Class 10</option>
                      <option value="11">Class 11</option>
                      <option value="12">Class 12</option>
                      <option value="UG">UG (Undergraduate)</option>
                      <option value="PG">PG (Postgraduate)</option>
                    </select>
                  </div>
                  <button onClick={handleExport} className="btn-primary whitespace-nowrap">💾 Export CSV</button>
                </div>
              </div>

              <div className="card overflow-x-auto">
                <h2 className="text-2xl font-bold text-white mb-4">Student Registrations ({filteredRegistrations.length})</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4 text-gray-400 font-semibold">Name</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-semibold">Class</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-semibold">Section</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-semibold">Course</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-semibold">School</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-semibold">Email</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-semibold">Phone</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-semibold">Event</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-semibold">Date</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRegistrations.length > 0 ? (
                        filteredRegistrations.map((reg) => (
                          <tr key={reg._id} className="border-b border-gray-800 hover:bg-dark-700">
                            <td className="py-3 px-4 text-white">{reg.name}</td>
                            <td className="py-3 px-4 text-gray-300">{reg.class}</td>
                            <td className="py-3 px-4 text-gray-300">{reg.section || '-'}</td>
                            <td className="py-3 px-4 text-gray-300">{reg.course || '-'}</td>
                            <td className="py-3 px-4 text-gray-300">{reg.school}</td>
                            <td className="py-3 px-4 text-gray-300">{reg.email}</td>
                            <td className="py-3 px-4 text-gray-300">{reg.phone}</td>
                            <td className="py-3 px-4 text-gray-300">{reg.event}</td>
                            <td className="py-3 px-4 text-gray-300">{new Date(reg.createdAt).toLocaleDateString()}</td>
                            <td className="py-3 px-4">
                              <button onClick={() => handleDeleteRegistration(reg._id)} className="text-red-400 hover:text-red-300 transition-colors">🗑️ Delete</button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={10} className="py-8 text-center text-gray-500">No registrations found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'messages' && (
            <motion.div key="messages" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="card mb-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Contact Messages ({contacts.length})</h2>
                  <select 
                    value={filterStatus} 
                    onChange={(e) => setFilterStatus(e.target.value)} 
                    className="input-field"
                  >
                    <option value="">All Messages</option>
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                  </select>
                </div>

                <div className="space-y-4">
                  {contacts
                    .filter((contact) => !filterStatus || contact.status === filterStatus)
                    .map((contact) => (
                      <div 
                        key={contact._id} 
                        className={`bg-dark-700 rounded-lg p-6 border ${
                          contact.status === 'new' 
                            ? 'border-neon-blue/50' 
                            : 'border-gray-700'
                        } hover:border-neon-blue/30 transition-all`}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-white">{contact.name}</h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                contact.status === 'new' 
                                  ? 'bg-blue-500/20 text-blue-400' 
                                  : contact.status === 'read'
                                  ? 'bg-yellow-500/20 text-yellow-400'
                                  : 'bg-green-500/20 text-green-400'
                              }`}>
                                {contact.status.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-gray-400 text-sm mb-2">
                              <a href={`mailto:${contact.email}`} className="text-neon-cyan hover:underline">
                                {contact.email}
                              </a>
                            </p>
                            <p className="text-gray-500 text-xs">
                              {new Date(contact.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleDeleteContact(contact._id)}
                              className="text-red-400 hover:text-red-300 transition-colors px-3 py-1 text-sm"
                              title="Delete"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-gray-300 whitespace-pre-wrap bg-dark-800 p-4 rounded-lg border border-gray-700">
                            {contact.message}
                          </p>
                        </div>

                        <div className="flex gap-2 pt-4 border-t border-gray-700">
                          <button
                            onClick={() => handleUpdateContactStatus(contact._id, 'read')}
                            disabled={contact.status === 'read'}
                            className="px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm"
                          >
                            Mark as Read
                          </button>
                          <button
                            onClick={() => handleUpdateContactStatus(contact._id, 'replied')}
                            disabled={contact.status === 'replied'}
                            className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm"
                          >
                            Mark as Replied
                          </button>
                          <a
                            href={`mailto:${contact.email}?subject=Re: Your message to ZehraTech&body=Hi ${contact.name},%0D%0A%0D%0A`}
                            className="px-4 py-2 bg-neon-blue/20 text-neon-blue rounded-lg hover:bg-neon-blue/30 transition-all text-sm"
                          >
                            Reply via Email
                          </a>
                        </div>
                      </div>
                    ))}
                  
                  {contacts.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-500">No messages yet</p>
                    </div>
                  )}
                  
                  {contacts.length > 0 && contacts.filter((c) => !filterStatus || c.status === filterStatus).length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-500">No messages match the selected filter</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div key="settings" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="max-w-2xl mx-auto">
                <div className="card">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Admin Settings</h2>
                  <p className="text-gray-400 mb-6 text-sm sm:text-base">Update your admin username and password</p>

                  {settingsMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-500/20 border border-green-500 text-green-300 px-4 sm:px-6 py-3 sm:py-4 rounded-lg mb-6 text-sm sm:text-base"
                    >
                      ✅ {settingsMessage}
                    </motion.div>
                  )}

                  {settingsError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-500/20 border border-red-500 text-red-300 px-4 sm:px-6 py-3 sm:py-4 rounded-lg mb-6 text-sm sm:text-base"
                    >
                      ❌ {settingsError}
                    </motion.div>
                  )}

                  <form onSubmit={handleUpdateSettings} className="space-y-6">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300 mb-2">
                        Current Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="currentPassword"
                        type="password"
                        value={settingsForm.currentPassword}
                        onChange={(e) => setSettingsForm({ ...settingsForm, currentPassword: e.target.value })}
                        className="input-field"
                        placeholder="Enter current password"
                        required
                      />
                      <p className="mt-1 text-xs text-gray-500">Required to make any changes</p>
                    </div>

                    <div className="border-t border-gray-700 pt-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Change Username</h3>
                      <div>
                        <label htmlFor="newUsername" className="block text-sm font-medium text-gray-300 mb-2">
                          New Username (Optional)
                        </label>
                        <input
                          id="newUsername"
                          type="text"
                          value={settingsForm.newUsername}
                          onChange={(e) => setSettingsForm({ ...settingsForm, newUsername: e.target.value })}
                          className="input-field"
                          placeholder={`Current: ${session?.user?.name || 'admin'}`}
                        />
                        <p className="mt-1 text-xs text-gray-500">Leave blank to keep current username</p>
                      </div>
                    </div>

                    <div className="border-t border-gray-700 pt-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">
                            New Password (Optional)
                          </label>
                          <input
                            id="newPassword"
                            type="password"
                            value={settingsForm.newPassword}
                            onChange={(e) => setSettingsForm({ ...settingsForm, newPassword: e.target.value })}
                            className="input-field"
                            placeholder="Enter new password"
                            minLength={6}
                          />
                        </div>

                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                            Confirm New Password
                          </label>
                          <input
                            id="confirmPassword"
                            type="password"
                            value={settingsForm.confirmPassword}
                            onChange={(e) => setSettingsForm({ ...settingsForm, confirmPassword: e.target.value })}
                            className="input-field"
                            placeholder="Confirm new password"
                            minLength={6}
                          />
                          <p className="mt-1 text-xs text-gray-500">Minimum 6 characters. Leave blank to keep current password.</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                      <button
                        type="submit"
                        disabled={settingsLoading}
                        className="flex-1 btn-primary py-3 text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {settingsLoading ? 'Updating...' : 'Update Settings'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSettingsForm({ currentPassword: '', newUsername: '', newPassword: '', confirmPassword: '' });
                          setSettingsError('');
                          setSettingsMessage('');
                        }}
                        className="flex-1 btn-secondary py-3 text-base sm:text-lg"
                      >
                        Reset Form
                      </button>
                    </div>
                  </form>

                  <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <h3 className="text-yellow-500 font-semibold mb-2 text-sm sm:text-base flex items-center gap-2">
                      <span>⚠️</span> Security Note
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      After changing your username or password, you will be automatically logged out and need to login again with your new credentials.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
