import { useAuth } from '../hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../components/common/Navbar.jsx';
import { Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Settings</h1>
          
          <div className="p-8 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
            <SettingsIcon className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <h2 className="text-xl font-semibold mb-2">Settings Configuration</h2>
            <p>Integration with Smart Meter and DISCOM approvals managed here.</p>
            
            {/* Optional: Add status indicators */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Smart Meter Status</h3>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span className="text-sm text-gray-600">Connected</span>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">DISCOM Approval</h3>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                  <span className="text-sm text-gray-600">Pending</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;

