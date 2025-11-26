import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import ErrorMessage from '../components/common/ErrorMessage.jsx';
import SuccessMessage from '../components/common/SuccessMessage.jsx';
import { formatDateTime, getTimeAgo } from '../utils/formatters.js';
import { Activity, Wifi, WifiOff, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { meterService } from '../services/meterService.js';

const Meters = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [meters, setMeters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!user?.userId) {
      navigate('/login');
      return;
    }
    loadMeters();
  }, [user]);

  const loadMeters = async () => {
    try {
      setLoading(true);
      setError('');
      const metersData = await meterService.getUserMeters(user.userId);
      setMeters(metersData || []);
    } catch (error) {
      console.error('Error loading meters:', error);
      // Show user-friendly error message
      if (error.response?.status === 404) {
        // No meters found - this is okay, show empty state
        setMeters([]);
      } else {
        setError('Failed to load meters. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async (meterId) => {
    try {
      setSyncing(prev => ({ ...prev, [meterId]: true }));
      setError('');
      setSuccess('');
      const updatedMeter = await meterService.syncMeter(meterId);
      
      // Update the meter in the list
      setMeters(prevMeters =>
        prevMeters.map(meter =>
          meter.meter_id === meterId ? updatedMeter : meter
        )
      );
      
      setSuccess('Meter synced successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error syncing meter:', error);
      setError('Failed to sync meter. Please try again.');
      setTimeout(() => setError(''), 5000);
    } finally {
      setSyncing(prev => ({ ...prev, [meterId]: false }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Smart Meters</h1>

          {error && (
            <div className="mb-6">
              <ErrorMessage message={error} onDismiss={() => setError('')} />
            </div>
          )}

          {success && (
            <div className="mb-6">
              <SuccessMessage message={success} onDismiss={() => setSuccess('')} />
            </div>
          )}

          {meters.length === 0 && !loading ? (
            <EmptyState
              icon={Activity}
              title="No Meters Found"
              description="No smart meters are currently registered to your account."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {meters.map((meter) => (
                <div key={meter.meter_id} className="card">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        {meter.device_type ? meter.device_type.replace('_', ' ').toUpperCase() : 'SMART METER'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {meter.communication_protocol || 'MQTT'} Protocol
                      </p>
                    </div>
                    <div className="flex items-center">
                      {meter.connection_status === 'online' ? (
                        <Wifi className="w-5 h-5 text-green-600" title="Online" />
                      ) : meter.connection_status === 'warning' ? (
                        <Wifi className="w-5 h-5 text-yellow-600" title="Warning" />
                      ) : (
                        <WifiOff className="w-5 h-5 text-red-600" title="Offline" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 border-t pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Meter Number</span>
                      <span className="font-medium">{meter.meter_number}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Device Type</span>
                      <span className="font-medium">{meter.device_type || 'Smart Energy Meter'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Firmware Version</span>
                      <span className="font-medium">{meter.firmware_version || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Last Sync</span>
                      <span className="font-medium">
                        {meter.last_sync ? getTimeAgo(meter.last_sync) : 'Never'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Sync Status</span>
                      <span className={`font-medium ${
                        meter.sync_status === 'synced' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {meter.sync_status === 'synced' ? (
                          <span className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Synced
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            Pending
                          </span>
                        )}
                      </span>
                    </div>
                    {meter.calibration_date && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Calibration Date</span>
                        <span className="font-medium">
                          {new Date(meter.calibration_date).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <button
                      onClick={() => handleSync(meter.meter_id)}
                      disabled={syncing[meter.meter_id]}
                      className="btn btn-outline w-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <RefreshCw className={`w-4 h-4 mr-2 ${syncing[meter.meter_id] ? 'animate-spin' : ''}`} />
                      {syncing[meter.meter_id] ? 'Syncing...' : 'Sync Now'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Meters;

