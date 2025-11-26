import { Smartphone, CreditCard, Building2, Wallet } from 'lucide-react';

const PaymentMethods = ({ selectedMethod, onSelect }) => {
  const methods = [
    { id: 'upi', name: 'UPI', icon: Smartphone, description: 'Pay using any UPI app' },
    { id: 'card', name: 'Card', icon: CreditCard, description: 'Credit/Debit Card' },
    { id: 'netbanking', name: 'Net Banking', icon: Building2, description: 'All Indian banks' },
    { id: 'wallet', name: 'Wallet', icon: Wallet, description: 'Paytm, PhonePe, etc.' },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {methods.map(({ id, name, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={`
            flex flex-col items-center p-3 rounded-lg border-2 transition-all
            ${selectedMethod === id 
              ? 'border-blue-500 bg-blue-50 text-blue-700' 
              : 'border-gray-200 hover:border-gray-300 text-gray-600'
            }
          `}
        >
          <Icon className="w-5 h-5 mb-1" />
          <span className="text-xs font-medium">{name}</span>
        </button>
      ))}
    </div>
  );
};

export default PaymentMethods;

