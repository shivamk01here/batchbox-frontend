import React, { useEffect, useState } from 'react';

const BookingSettings = () => {
  const [form, setForm] = useState({
    ob_name: '',
    ob_enable: false,
    logo: '',
    moto: '',
    description: '',
    domain: ''
  });

  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/institution-setting', {
          credentials: 'include'
        });
        const data = await res.json();
        setForm(data || {});
      } catch (err) {
        console.error('Error fetching settings:', err);
        setError('Failed to fetch booking settings.');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const save = async () => {
    try {
      await fetch('/api/institution-setting-save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(form)
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error('Save error:', err);
      setError('Failed to save settings.');
    }
  };

  const previewUrl = `${window.location.origin}/${form.ob_name || ''}`;

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Booking Settings</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">OB Name</label>
          <input
            type="text"
            value={form.ob_name}
            onChange={e => setForm({ ...form, ob_name: e.target.value })}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
            placeholder="Unique ob_name"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={form.ob_enable}
            onChange={e => setForm({ ...form, ob_enable: e.target.checked })}
            id="ob_enable"
          />
          <label htmlFor="ob_enable" className="text-sm text-gray-700">
            Enable Booking Page
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Logo URL</label>
          <input
            type="text"
            value={form.logo}
            onChange={e => setForm({ ...form, logo: e.target.value })}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
            placeholder="https://example.com/logo.png"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Moto</label>
          <input
            type="text"
            value={form.moto}
            onChange={e => setForm({ ...form, moto: e.target.value })}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
            placeholder="Empowering Students"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
            rows={3}
            placeholder="About your institution..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Custom Domain</label>
          <input
            type="text"
            value={form.domain}
            onChange={e => setForm({ ...form, domain: e.target.value })}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
            placeholder="e.g. booking.mycoaching.in"
          />
        </div>
      </div>

      <button
        onClick={save}
        className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition"
      >
        Save
      </button>

      {saved && <p className="text-green-600 mt-3">✓ Settings saved successfully</p>}

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700">Preview Booking Page:</label>
        <a
          href={previewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline break-all"
        >
          {previewUrl}
        </a>
      </div>
    </div>
  );
};

export default BookingSettings;
