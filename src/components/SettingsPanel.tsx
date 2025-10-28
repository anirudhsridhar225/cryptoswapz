import React, { useState } from 'react';
import { Settings, Shield, Zap, Globe, Bell } from 'lucide-react';

export const SettingsPanel: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [autoSlippage, setAutoSlippage] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">Settings</h2>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Price Alerts</span>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                    notifications ? 'bg-blue-500' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      notifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Trading</span>
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Auto Slippage</span>
                <button
                  onClick={() => setAutoSlippage(!autoSlippage)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                    autoSlippage ? 'bg-blue-500' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      autoSlippage ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Security</span>
            </h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-left hover:bg-gray-700/70 transition-colors duration-150">
                <div className="font-medium text-white">Transaction Signing</div>
                <div className="text-sm text-gray-400">Require confirmation for all swaps</div>
              </button>
              
              <button className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-left hover:bg-gray-700/70 transition-colors duration-150">
                <div className="font-medium text-white">Wallet Permissions</div>
                <div className="text-sm text-gray-400">Manage connected wallet access</div>
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Network</span>
            </h3>
            <div className="space-y-3">
              <select className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                <option value="ethereum">Ethereum Mainnet</option>
                <option value="polygon">Polygon</option>
                <option value="arbitrum">Arbitrum One</option>
                <option value="optimism">Optimism</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">About CryptoSwapz</h3>
        <div className="space-y-3 text-sm text-gray-400">
          <p>Version 1.0.0</p>
          <p>A decentralized exchange for seamless cryptocurrency swapping with optimal rates and minimal slippage.</p>
          <div className="flex space-x-4 pt-3 border-t border-gray-700">
            <button className="text-blue-400 hover:text-blue-300 transition-colors duration-150">
              Documentation
            </button>
            <button className="text-blue-400 hover:text-blue-300 transition-colors duration-150">
              Support
            </button>
            <button className="text-blue-400 hover:text-blue-300 transition-colors duration-150">
              Terms
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};