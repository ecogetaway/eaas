import React from 'react';
import { LayoutDashboard, Zap, CreditCard, MessageSquareText, Settings, Sun } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, mobileMenuOpen, setMobileMenuOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'marketplace', label: 'Services & Plans', icon: Zap },
    { id: 'billing', label: 'Billing & Payments', icon: CreditCard },
    { id: 'assistant', label: 'AI Advisor', icon: MessageSquareText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-brand-900 text-white transform transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 flex flex-col h-screen shadow-xl
      `}>
        {/* Logo Area */}
        <div className="p-6 flex items-center space-x-3 border-b border-brand-700">
          <div className="p-2 bg-brand-500 rounded-lg">
            <Sun className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight">Lumina</span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200
                  ${isActive 
                    ? 'bg-brand-700 text-white font-medium shadow-sm' 
                    : 'text-brand-100 hover:bg-brand-800 hover:text-white'}
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Profile Summary */}
        <div className="p-4 border-t border-brand-700 bg-brand-800 bg-opacity-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold">
              JD
            </div>
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-brand-300">Pro Subscriber</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};