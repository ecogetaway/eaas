import { useState, useEffect } from 'react';
import { energyService } from '../../services/energyService.js';
import socketService from '../../services/socketService.js';
import { Activity, Zap, TrendingUp, TrendingDown, Battery, Sun, Grid3x3, RefreshCw } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner.jsx';

const RealTimeConsumptionCard = ({ userId }) => {
  const [energyData, setEnergyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    if (!userId) return;

    // Load initial data
    loadEnergyData();

    // Connect to WebSocket for real-time updates
    socketService.connect();
    socketService.subscribeToUser(userId);

    // Listen for real-time energy updates
    const handleEnergyUpdate = (data) => {
      setEnergyData(data);
      setLastUpdate(new Date());
      setIsLive(true);
      setLoading(false);
    };

    socketService.onEnergyUpdate(handleEnergyUpdate);

    // Set up polling as fallback (every 5 seconds)
    const pollInterval = setInterval(() => {
      loadEnergyData();
    }, 5000);

    return () => {
      socketService.offEnergyUpdate(handleEnergyUpdate);
      socketService.unsubscribeFromUser(userId);
      clearInterval(pollInterval);
    };
  }, [userId]);

  const loadEnergyData = async () => {
    try {
      const response = await energyService.getCurrentEnergy(userId);
      if (response?.data) {
        setEnergyData(response.data);
        setLastUpdate(new Date());
        setIsLive(true);
      }
    } catch (error) {
      console.error('Error loading energy data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPower = (value) => {
    if (value === null || value === undefined) return '0.00';
    return parseFloat(value).toFixed(2);
  };

  const getNetFlow = () => {
    if (!energyData) return { value: 0, type: 'neutral' };
    const net = energyData.grid_export - energyData.grid_import;
    if (net > 0) return { value: net, type: 'export' };
    if (net < 0) return { value: Math.abs(net), type: 'import' };
    return { value: 0, type: 'neutral' };
  };

  const netFlow = getNetFlow();

  if (loading && !energyData) {
    return (
      <div className="card">
        <div className="flex items-center justify-center py-8">
          <LoadingSpinner size="md" />
        </div>
      </div>
    );
  }

  if (!energyData) {
    return (
      <div className="card">
        <div className="text-center py-8">
          <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No consumption data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-primary-600" />
          <h3 className="text-lg font-semibold">Real-Time Consumption Tracking</h3>
        </div>
        <div className="flex items-center space-x-2">
          {isLive && (
            <div className="flex items-center space-x-1 text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium">Live</span>
            </div>
          )}
          <button
            onClick={loadEnergyData}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title="Refresh data"
          >
            <RefreshCw className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {lastUpdate && (
        <p className="text-xs text-gray-500 mb-4">
          Last updated: {lastUpdate.toLocaleTimeString()}
        </p>
      )}

      {/* Main Power Flow */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Solar Generation */}
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Sun className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium text-gray-700">Solar Generation</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-yellow-700">
            {formatPower(energyData.solar_generation)} kW
          </p>
        </div>

        {/* Grid Flow */}
        <div className={`rounded-lg p-4 border ${
          netFlow.type === 'export' 
            ? 'bg-green-50 border-green-200' 
            : netFlow.type === 'import'
            ? 'bg-blue-50 border-blue-200'
            : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Grid3x3 className={`w-4 h-4 ${
                netFlow.type === 'export' ? 'text-green-600' : 'text-blue-600'
              }`} />
              <span className="text-sm font-medium text-gray-700">Grid Flow</span>
            </div>
            {netFlow.type === 'export' ? (
              <TrendingUp className="w-4 h-4 text-green-600" />
            ) : netFlow.type === 'import' ? (
              <TrendingDown className="w-4 h-4 text-blue-600" />
            ) : null}
          </div>
          {netFlow.type === 'export' ? (
            <div>
              <p className="text-2xl font-bold text-green-700">
                {formatPower(netFlow.value)} kW
              </p>
              <p className="text-xs text-green-600 mt-1">Exporting to grid</p>
            </div>
          ) : netFlow.type === 'import' ? (
            <div>
              <p className="text-2xl font-bold text-blue-700">
                {formatPower(netFlow.value)} kW
              </p>
              <p className="text-xs text-blue-600 mt-1">Importing from grid</p>
            </div>
          ) : (
            <div>
              <p className="text-2xl font-bold text-gray-700">0.00 kW</p>
              <p className="text-xs text-gray-600 mt-1">Balanced</p>
            </div>
          )}
        </div>

        {/* Total Consumption */}
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Total Consumption</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-purple-700">
            {formatPower(energyData.total_consumption)} kW
          </p>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
        <div>
          <p className="text-xs text-gray-500 mb-1">Grid Import</p>
          <p className="text-lg font-semibold text-blue-700">
            {formatPower(energyData.grid_import)} kW
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Grid Export</p>
          <p className="text-lg font-semibold text-green-700">
            {formatPower(energyData.grid_export)} kW
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Battery</p>
          <div className="flex items-center space-x-1">
            <Battery className="w-4 h-4 text-gray-600" />
            <p className="text-lg font-semibold text-gray-700">
              {energyData.battery_charge ? formatPower(energyData.battery_charge) : '0.00'} kW
            </p>
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Voltage</p>
          <p className="text-lg font-semibold text-gray-700">
            {energyData.voltage ? formatPower(energyData.voltage) : 'N/A'} V
          </p>
        </div>
      </div>

      {/* Net Metering Credit Info */}
      {netFlow.type === 'export' && netFlow.value > 0 && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <p className="text-sm text-green-800 font-medium">
              Earning net-metering credits: {formatPower(netFlow.value)} kW exported
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealTimeConsumptionCard;

