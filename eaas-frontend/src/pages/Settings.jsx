import { useAuth } from '../hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../components/common/Navbar.jsx';
import { Settings as SettingsIcon, User, Bell, Shield, Link2 } from 'lucide-react';

const Settings = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Settings</h1>
          
          <div className="space-y-6">
            {/* Account Settings */}
            <section className="card">
              <div className="flex items-center mb-6">
                <User className="w-6 h-6 text-primary-600 mr-2" />
                <h2 className="text-xl font-semibold">Account Settings</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Manage your account information and preferences.
              </p>
              <button
                onClick={() => navigate('/profile')}
                className="btn btn-outline"
              >
                Go to Profile
              </button>
            </section>

            {/* Notification Settings */}
            <section className="card">
              <div className="flex items-center mb-6">
                <Bell className="w-6 h-6 text-primary-600 mr-2" />
                <h2 className="text-xl font-semibold">Notification Preferences</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Configure how you receive notifications about your energy system.
              </p>
              <button
                onClick={() => navigate('/profile')}
                className="btn btn-outline"
              >
                Manage Notifications
              </button>
            </section>

            {/* Smart Meter Integration */}
            <section className="card">
              <div className="flex items-center mb-6">
                <Link2 className="w-6 h-6 text-primary-600 mr-2" />
                <h2 className="text-xl font-semibold">Smart Meter Integration</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Connect and manage your smart meters for real-time energy monitoring.
              </p>
              <button
                onClick={() => navigate('/meters')}
                className="btn btn-outline"
              >
                Manage Meters
              </button>
            </section>

            {/* DISCOM Integration */}
            <section className="card">
              <div className="flex items-center mb-6">
                <Shield className="w-6 h-6 text-primary-600 mr-2" />
                <h2 className="text-xl font-semibold">DISCOM Approvals</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Integration with Smart Meter and DISCOM approvals managed here.
              </p>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500">
                  DISCOM integration features will be available soon. Contact support for assistance with utility approvals.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
