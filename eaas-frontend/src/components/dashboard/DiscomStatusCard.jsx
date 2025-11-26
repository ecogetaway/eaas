import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { discomService } from '../../services/discomService.js';
import { 
  FileText, CheckCircle, Clock, AlertCircle, 
  ChevronRight, Zap, RefreshCw 
} from 'lucide-react';

const DiscomStatusCard = ({ userId }) => {
  const [statusData, setStatusData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStatus();
    // Refresh every 30 seconds to show auto-progress
    const interval = setInterval(loadStatus, 30000);
    return () => clearInterval(interval);
  }, [userId]);

  const loadStatus = async () => {
    if (!userId) return;
    try {
      const data = await discomService.getApplicationStatus(userId);
      setStatusData(data);
    } catch (error) {
      console.error('Error loading DISCOM status:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="card animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
        <div className="h-8 bg-gray-200 rounded w-1/2" />
      </div>
    );
  }

  if (!statusData?.hasApplication) {
    return (
      <Link to="/discom" className="block">
        <div className="card hover:shadow-lg transition-shadow border-2 border-dashed border-gray-300 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Net Metering Application</h3>
                <p className="text-sm text-gray-500">Apply to connect to the grid</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </Link>
    );
  }

  const { application, progressPercentage, currentStatusIndex, allStatuses } = statusData;
  const isCompleted = application.status === 'grid_connected';
  const isApproved = application.status === 'approved' || isCompleted;

  const getStatusIcon = () => {
    if (isCompleted) return <CheckCircle className="w-6 h-6 text-white" />;
    if (isApproved) return <Zap className="w-6 h-6 text-white" />;
    return <Clock className="w-6 h-6 text-white" />;
  };

  const getStatusColor = () => {
    if (isCompleted) return 'bg-green-500';
    if (isApproved) return 'bg-blue-500';
    return 'bg-yellow-500';
  };

  const getStatusText = () => {
    const statusLabels = {
      'submitted': 'Submitted',
      'under_review': 'Under Review',
      'document_verification': 'Documents Verified',
      'site_inspection_scheduled': 'Inspection Scheduled',
      'site_inspection_completed': 'Inspection Done',
      'technical_approval': 'Technical Approved',
      'meter_installation': 'Installing Meter',
      'grid_sync_pending': 'Sync Pending',
      'approved': 'Approved',
      'grid_connected': 'Grid Connected'
    };
    return statusLabels[application.status] || application.status;
  };

  return (
    <Link to="/discom" className="block">
      <div className={`card hover:shadow-lg transition-all ${
        isCompleted ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' : 
        isApproved ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200' : ''
      }`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className={`w-12 h-12 ${getStatusColor()} rounded-lg flex items-center justify-center mr-4`}>
              {getStatusIcon()}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">DISCOM Application</h3>
              <p className="text-sm text-gray-500 font-mono">{application.application_number}</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            isCompleted ? 'bg-green-100 text-green-700' :
            isApproved ? 'bg-blue-100 text-blue-700' :
            'bg-yellow-100 text-yellow-700'
          }`}>
            {getStatusText()}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-500">Progress</span>
            <span className="font-medium">{progressPercentage}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${
                isCompleted ? 'bg-green-500' : isApproved ? 'bg-blue-500' : 'bg-yellow-500'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Status Dots */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-1">
            {allStatuses.slice(0, 5).map((status, index) => (
              <div 
                key={status}
                className={`w-2 h-2 rounded-full ${
                  index <= currentStatusIndex 
                    ? isCompleted ? 'bg-green-500' : 'bg-primary-500' 
                    : 'bg-gray-300'
                }`}
              />
            ))}
            {allStatuses.length > 5 && (
              <>
                <span className="text-gray-400 text-xs">...</span>
                {allStatuses.slice(-2).map((status, index) => (
                  <div 
                    key={status}
                    className={`w-2 h-2 rounded-full ${
                      (allStatuses.length - 2 + index) <= currentStatusIndex 
                        ? isCompleted ? 'bg-green-500' : 'bg-primary-500' 
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </>
            )}
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>

        {/* Message */}
        {isCompleted ? (
          <div className="flex items-center text-green-700 text-sm">
            <Zap className="w-4 h-4 mr-2" />
            <span>Grid export enabled! Earning net metering credits.</span>
          </div>
        ) : (
          <div className="flex items-center text-gray-500 text-sm">
            <RefreshCw className="w-3 h-3 mr-2 animate-spin" />
            <span>Auto-updating status (Demo)</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default DiscomStatusCard;

