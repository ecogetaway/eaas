import { useState } from 'react';
import { Building2, ChevronRight, Search } from 'lucide-react';

const NetBankingPayment = ({ onPay }) => {
  const [selectedBank, setSelectedBank] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const popularBanks = [
    { id: 'sbi', name: 'State Bank of India', code: 'SBIN' },
    { id: 'hdfc', name: 'HDFC Bank', code: 'HDFC' },
    { id: 'icici', name: 'ICICI Bank', code: 'ICIC' },
    { id: 'axis', name: 'Axis Bank', code: 'UTIB' },
    { id: 'kotak', name: 'Kotak Mahindra Bank', code: 'KKBK' },
    { id: 'pnb', name: 'Punjab National Bank', code: 'PUNB' },
  ];

  const otherBanks = [
    { id: 'bob', name: 'Bank of Baroda', code: 'BARB' },
    { id: 'canara', name: 'Canara Bank', code: 'CNRB' },
    { id: 'union', name: 'Union Bank of India', code: 'UBIN' },
    { id: 'idbi', name: 'IDBI Bank', code: 'IBKL' },
    { id: 'indian', name: 'Indian Bank', code: 'IDIB' },
    { id: 'boi', name: 'Bank of India', code: 'BKID' },
    { id: 'central', name: 'Central Bank of India', code: 'CBIN' },
    { id: 'indusind', name: 'IndusInd Bank', code: 'INDB' },
    { id: 'yes', name: 'Yes Bank', code: 'YESB' },
    { id: 'federal', name: 'Federal Bank', code: 'FDRL' },
  ];

  const allBanks = [...popularBanks, ...otherBanks];
  
  const filteredBanks = searchQuery 
    ? allBanks.filter(bank => 
        bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bank.code.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;

  const handleBankSelect = (bank) => {
    setSelectedBank(bank);
  };

  const handleProceed = () => {
    if (selectedBank) {
      onPay({ bank: selectedBank });
    }
  };

  return (
    <div>
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search bank"
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Bank List */}
      <div className="max-h-64 overflow-y-auto">
        {filteredBanks ? (
          // Search Results
          <div className="space-y-1">
            {filteredBanks.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No banks found</p>
            ) : (
              filteredBanks.map((bank) => (
                <BankItem 
                  key={bank.id}
                  bank={bank}
                  isSelected={selectedBank?.id === bank.id}
                  onSelect={handleBankSelect}
                />
              ))
            )}
          </div>
        ) : (
          <>
            {/* Popular Banks */}
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Popular Banks</h4>
              <div className="space-y-1">
                {popularBanks.map((bank) => (
                  <BankItem 
                    key={bank.id}
                    bank={bank}
                    isSelected={selectedBank?.id === bank.id}
                    onSelect={handleBankSelect}
                  />
                ))}
              </div>
            </div>

            {/* Other Banks */}
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Other Banks</h4>
              <div className="space-y-1">
                {otherBanks.map((bank) => (
                  <BankItem 
                    key={bank.id}
                    bank={bank}
                    isSelected={selectedBank?.id === bank.id}
                    onSelect={handleBankSelect}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Proceed Button */}
      <button 
        onClick={handleProceed}
        disabled={!selectedBank}
        className={`w-full mt-4 py-3 rounded-lg font-medium transition-colors ${
          selectedBank 
            ? 'btn btn-primary' 
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
        }`}
      >
        {selectedBank ? `Proceed with ${selectedBank.name}` : 'Select a bank'}
      </button>

      <p className="text-xs text-gray-400 text-center mt-3">
        You will be redirected to your bank's secure page
      </p>
    </div>
  );
};

const BankItem = ({ bank, isSelected, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(bank)}
      className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
        isSelected 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
          isSelected ? 'bg-blue-100' : 'bg-gray-100'
        }`}>
          <Building2 className={`w-5 h-5 ${isSelected ? 'text-blue-600' : 'text-gray-500'}`} />
        </div>
        <div className="text-left">
          <p className={`font-medium text-sm ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}>
            {bank.name}
          </p>
          <p className="text-xs text-gray-400">{bank.code}</p>
        </div>
      </div>
      <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-blue-500' : 'text-gray-400'}`} />
    </button>
  );
};

export default NetBankingPayment;

