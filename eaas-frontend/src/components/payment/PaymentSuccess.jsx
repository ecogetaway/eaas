import { useEffect, useState } from 'react';
import { Check, Download, Share2 } from 'lucide-react';

const PaymentSuccess = ({ amount, paymentId }) => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="text-center py-4 relative overflow-hidden">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {Array(20).fill(0).map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${0.5 + Math.random() * 0.5}s`
              }}
            >
              <div 
                className={`w-2 h-2 rounded-full ${
                  ['bg-green-400', 'bg-blue-400', 'bg-yellow-400', 'bg-purple-400', 'bg-pink-400'][Math.floor(Math.random() * 5)]
                }`}
              />
            </div>
          ))}
        </div>
      )}

      {/* Success Icon */}
      <div className="relative inline-block mb-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </div>
        </div>
        {/* Ripple Effect */}
        <div className="absolute inset-0 rounded-full border-4 border-green-300 animate-ping opacity-20" />
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-1">Payment Successful!</h3>
      <p className="text-gray-600 text-sm mb-4">
        Your payment has been processed successfully
      </p>

      {/* Amount */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <p className="text-sm text-green-600 mb-1">Amount Paid</p>
        <p className="text-2xl font-bold text-green-700">₹{amount?.toLocaleString('en-IN')}</p>
      </div>

      {/* Transaction Details */}
      <div className="bg-gray-50 rounded-lg p-4 text-left mb-4">
        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="text-sm text-gray-500">Transaction ID</span>
          <span className="text-sm font-mono text-gray-700">{paymentId || `TXN${Date.now()}`}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="text-sm text-gray-500">Date & Time</span>
          <span className="text-sm text-gray-700">
            {new Date().toLocaleString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-sm text-gray-500">Status</span>
          <span className="text-sm font-medium text-green-600">Success</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-3">
        <button className="flex-1 flex items-center justify-center py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
          <Download className="w-4 h-4 mr-2" />
          <span className="text-sm">Receipt</span>
        </button>
        <button className="flex-1 flex items-center justify-center py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
          <Share2 className="w-4 h-4 mr-2" />
          <span className="text-sm">Share</span>
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;

