import { Loader2 } from 'lucide-react';

const PaymentProcessing = ({ message }) => {
  return (
    <div className="text-center py-8">
      {/* Animated Loader */}
      <div className="relative inline-block mb-6">
        <div className="w-20 h-20 rounded-full border-4 border-blue-100 flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        </div>
        {/* Pulsing ring */}
        <div className="absolute inset-0 rounded-full border-4 border-blue-400 animate-ping opacity-30" />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Payment</h3>
      <p className="text-gray-600 text-sm mb-4">{message || 'Please wait...'}</p>

      {/* Progress Steps */}
      <div className="max-w-xs mx-auto">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="text-blue-600 font-medium">Initiating</span>
          <span>Verifying</span>
          <span>Completing</span>
        </div>
        <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 rounded-full transition-all duration-1000 animate-pulse"
            style={{ width: '40%' }}
          />
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-6">
        Please do not close this window or press back
      </p>
    </div>
  );
};

export default PaymentProcessing;

