import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { MarketplaceView } from './components/MarketplaceView';
import { AssistantView } from './components/AssistantView';
import { BillingView } from './components/BillingView';
import { Menu, Bell, Settings } from 'lucide-react';

const SettingsView: React.FC = () => (
  <div className="p-8 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
    <Settings className="w-12 h-12 mx-auto mb-4 opacity-20" />
    <h2 className="text-xl font-semibold mb-2">Settings Configuration</h2>
    <p>Integration with Smart Meter and DISCOM approvals managed here.</p>
  </div>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <DashboardView />;
      case 'marketplace': return <MarketplaceView />;
      case 'billing': return <BillingView />;
      case 'assistant': return <AssistantView />;
      case 'settings': return <SettingsView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Header (Mobile Only mainly, but persistent on desktop for tools) */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 z-10 shrink-0">
          <div className="flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg mr-2"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-bold text-gray-800 md:hidden">Lumina</h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="hidden md:block text-sm text-right">
                <p className="text-gray-900 font-medium">Grid Status: <span className="text-green-600">Connected</span></p>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;