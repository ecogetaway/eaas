import { useState } from 'react';
import { CreditCard, Lock } from 'lucide-react';

const CardPayment = ({ onPay }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});
  const [cardType, setCardType] = useState(null);

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    }
    return value;
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const detectCardType = (number) => {
    const cleaned = number.replace(/\s/g, '');
    if (/^4/.test(cleaned)) return 'visa';
    if (/^5[1-5]/.test(cleaned)) return 'mastercard';
    if (/^3[47]/.test(cleaned)) return 'amex';
    if (/^6(?:011|5)/.test(cleaned)) return 'discover';
    if (/^(?:2131|1800|35)/.test(cleaned)) return 'jcb';
    return null;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.replace(/\s/g, '').length <= 16) {
      setCardNumber(formatted);
      setCardType(detectCardType(formatted));
      setErrors({ ...errors, cardNumber: '' });
    }
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiry(e.target.value);
    if (formatted.length <= 5) {
      setExpiry(formatted);
      setErrors({ ...errors, expiry: '' });
    }
  };

  const handleCVVChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 4) {
      setCvv(value);
      setErrors({ ...errors, cvv: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Enter valid 16-digit card number';
    }
    if (!expiry || expiry.length < 5) {
      newErrors.expiry = 'Enter valid expiry (MM/YY)';
    }
    if (!cvv || cvv.length < 3) {
      newErrors.cvv = 'Enter valid CVV';
    }
    if (!name.trim()) {
      newErrors.name = 'Enter cardholder name';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onPay({
        cardNumber: cardNumber.replace(/\s/g, ''),
        expiry,
        cvv,
        name,
        cardType
      });
    }
  };

  const getCardIcon = () => {
    switch (cardType) {
      case 'visa':
        return (
          <div className="text-blue-700 font-bold italic text-sm">VISA</div>
        );
      case 'mastercard':
        return (
          <div className="flex">
            <div className="w-4 h-4 bg-red-500 rounded-full -mr-1" />
            <div className="w-4 h-4 bg-yellow-500 rounded-full opacity-80" />
          </div>
        );
      case 'amex':
        return (
          <div className="text-blue-600 font-bold text-xs">AMEX</div>
        );
      default:
        return <CreditCard className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Card Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Card Number
        </label>
        <div className="relative">
          <input
            type="text"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="1234 5678 9012 3456"
            className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.cardNumber ? 'border-red-500' : ''
            }`}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {getCardIcon()}
          </div>
        </div>
        {errors.cardNumber && (
          <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
        )}
      </div>

      {/* Expiry and CVV */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expiry Date
          </label>
          <input
            type="text"
            value={expiry}
            onChange={handleExpiryChange}
            placeholder="MM/YY"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.expiry ? 'border-red-500' : ''
            }`}
          />
          {errors.expiry && (
            <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CVV
          </label>
          <div className="relative">
            <input
              type="password"
              value={cvv}
              onChange={handleCVVChange}
              placeholder="•••"
              className={`w-full px-4 py-3 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.cvv ? 'border-red-500' : ''
              }`}
            />
            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          {errors.cvv && (
            <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
          )}
        </div>
      </div>

      {/* Cardholder Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cardholder Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => { setName(e.target.value); setErrors({ ...errors, name: '' }); }}
          placeholder="John Doe"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.name ? 'border-red-500' : ''
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>

      {/* Secure Badge */}
      <div className="flex items-center justify-center space-x-2 py-2">
        <Lock className="w-3 h-3 text-green-600" />
        <span className="text-xs text-gray-500">Your card details are secure and encrypted</span>
      </div>

      {/* Submit Button */}
      <button 
        onClick={handleSubmit}
        className="w-full btn btn-primary py-3"
      >
        Pay Securely
      </button>
      
      <p className="text-xs text-gray-400 text-center">
        Demo: Use card 4242 4242 4242 4242, any expiry & CVV
      </p>
    </div>
  );
};

export default CardPayment;

