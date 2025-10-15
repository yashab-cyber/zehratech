'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SetupAdminPage() {
  const [setupKey, setSetupKey] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [adminExists, setAdminExists] = useState<boolean | null>(null);

  const checkAdminStatus = async () => {
    try {
      const response = await fetch('/api/setup-admin');
      const data = await response.json();
      setAdminExists(data.adminExists);
      setMessage(data.message);
    } catch (err) {
      console.error('Check status error:', err);
      setError('Failed to check admin status');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('/api/setup-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ setupKey, username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setUsername('');
        setPassword('');
        setSetupKey('');
        setAdminExists(true);
      } else {
        setError(data.error || 'Failed to create admin user');
      }
    } catch (err) {
      console.error('Setup error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple">
              Setup Admin User
            </span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            One-time setup to create the initial admin account
          </p>
        </div>

        <div className="card mb-6">
          <button
            onClick={checkAdminStatus}
            className="w-full btn-secondary mb-4 text-sm sm:text-base"
          >
            Check Admin Status
          </button>
          {adminExists !== null && (
            <div className={`p-4 rounded-lg border ${
              adminExists 
                ? 'bg-green-500/20 border-green-500 text-green-300' 
                : 'bg-yellow-500/20 border-yellow-500 text-yellow-300'
            }`}>
              <p className="text-sm">
                {adminExists 
                  ? '✅ Admin user already exists. You can login at /admin/login' 
                  : '⚠️ No admin user found. Please create one below.'}
              </p>
            </div>
          )}
        </div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-500/20 border border-green-500 text-green-300 px-4 sm:px-6 py-3 sm:py-4 rounded-lg mb-6 text-sm sm:text-base"
          >
            ✅ {message}
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/20 border border-red-500 text-red-300 px-4 sm:px-6 py-3 sm:py-4 rounded-lg mb-6 text-sm sm:text-base"
          >
            ❌ {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="card space-y-6">
          <div>
            <label htmlFor="setupKey" className="block text-sm font-medium text-gray-300 mb-2">
              Setup Key <span className="text-red-500">*</span>
            </label>
            <input
              id="setupKey"
              type="text"
              value={setupKey}
              onChange={(e) => setSetupKey(e.target.value)}
              className="input-field"
              placeholder="Enter setup key"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Default: <code className="text-neon-blue">zehratech-admin-setup-2025</code>
              <br />
              (Set ADMIN_SETUP_KEY env var to change)
            </p>
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              placeholder="Choose a username"
              required
              minLength={3}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="Choose a strong password"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 sm:py-4 text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Admin...' : 'Create Admin User'}
          </button>
        </form>

        <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <h3 className="text-yellow-500 font-semibold mb-2 text-sm sm:text-base">⚠️ Security Note</h3>
          <p className="text-gray-400 text-xs sm:text-sm">
            After creating your admin user, you should delete or disable this setup page for security.
            You can remove the <code className="text-neon-blue">/app/setup-admin</code> folder and 
            the <code className="text-neon-blue">/app/api/setup-admin</code> endpoint.
          </p>
        </div>

        <p className="text-center text-xs sm:text-sm text-gray-500 mt-6">
          After setup, login at <a href="/admin/login" className="text-neon-blue hover:underline">/admin/login</a>
        </p>
      </motion.div>
    </div>
  );
}
