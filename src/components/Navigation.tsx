import React from 'react';
import { Repeat, Wallet, BarChart3, Clock, Settings } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'swap', label: 'Swap', icon: Repeat },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'portfolio', label: 'Portfolio', icon: BarChart3 },
    { id: 'market', label: 'Market', icon: BarChart3 },
    { id: 'history', label: 'History', icon: Clock },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <nav className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-2">
      <div className="flex space-x-1">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-200 ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
            >
              <IconComponent className="w-4 h-4" />
              <span className="hidden sm:block font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};