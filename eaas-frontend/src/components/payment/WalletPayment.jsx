import { useState } from 'react';
import { Wallet, ChevronRight } from 'lucide-react';

const WalletPayment = ({ onPay }) => {
  const [selectedWallet, setSelectedWallet] = useState(null);

  const wallets = [
    { 
      id: 'paytm', 
      name: 'Paytm', 
      color: 'bg-blue-500',
      balance: '₹2,450'
    },
    { 
      id: 'phonepe', 
      name: 'PhonePe', 
      color: 'bg-purple-600',
      balance: '₹1,200'
    },
    { 
      id: 'amazon', 
      name: 'Amazon Pay', 
      color: 'bg-orange-500',
      balance: '₹850'
    },
    { 
      id: 'freecharge', 
      name: 'Freecharge', 
      color: 'bg-green-600',
      balance: '₹500'
    },
    { 
      id: 'mobikwik', 
      name: 'Mobikwik', 
      color: 'bg-blue-600',
      balance: '₹320'
    },
    { 
      id: 'airtel', 
      name: 'Airtel Money', 
      color: 'bg-red-600',
      balance: '₹180'
    },
  ];

  const handleProceed = () => {
    if (selectedWallet) {
      onPay({ wallet: selectedWallet });
    }
  };

  return (
    <div>
      <div className="space-y-2 max-h-72 overflow-y-auto">
        {wallets.map((wallet) => (
          <button
            key={wallet.id}
            onClick={() => setSelectedWallet(wallet)}
            className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
              selectedWallet?.id === wallet.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              <div className={`w-10 h-10 ${wallet.color} rounded-lg flex items-center justify-center mr-3`}>
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className={`font-medium text-sm ${
                  selectedWallet?.id === wallet.id ? 'text-blue-700' : 'text-gray-700'
                }`}>
                  {wallet.name}
                </p>
                <p className="text-xs text-gray-400">Balance: {wallet.balance}</p>
              </div>
            </div>
            <ChevronRight className={`w-4 h-4 ${
              selectedWallet?.id === wallet.id ? 'text-blue-500' : 'text-gray-400'
            }`} />
          </button>
        ))}
      </div>

      {/* Link New Wallet */}
      <button className="w-full mt-3 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
        + Link new wallet
      </button>

      {/* Proceed Button */}
      <button 
        onClick={handleProceed}
        disabled={!selectedWallet}
        className={`w-full mt-4 py-3 rounded-lg font-medium transition-colors ${
          selectedWallet 
            ? 'btn btn-primary' 
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
        }`}
      >
        {selectedWallet ? `Pay with ${selectedWallet.name}` : 'Select a wallet'}
      </button>

      <p className="text-xs text-gray-400 text-center mt-3">
        Demo: Simulated wallet balances
      </p>
    </div>
  );
};

export default WalletPayment;

