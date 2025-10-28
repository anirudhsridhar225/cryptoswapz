import React, { useState } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import { Cryptocurrency } from '../types/crypto';
import { useWallet } from '../contexts/WalletContext';

interface TokenSelectorProps {
  selectedToken: Cryptocurrency | null;
  onTokenSelect: (token: Cryptocurrency) => void;
  tokens: Cryptocurrency[];
  label: string;
  showBalance?: boolean;
  disabled?: boolean;
}

export const TokenSelector: React.FC<TokenSelectorProps> = ({
  selectedToken,
  onTokenSelect,
  tokens,
  label,
  showBalance = false,
  disabled = false
}) => {
  const { wallet, getTokenBalance } = useWallet();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTokens = tokens.filter(token =>
    token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTokenSelect = (token: Cryptocurrency) => {
    onTokenSelect(token);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>

      <button
        onClick={() => !disabled && setIsOpen(true)}
        disabled={disabled}
        className={`w-full bg-gray-700/50 border border-gray-600 rounded-xl p-4 flex items-center justify-between transition-all duration-200 ${disabled
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-gray-700/70 hover:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20'
          }`}
      >
        {selectedToken ? (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
              {selectedToken.icon}
            </div>
            <div className="text-left">
              <div className="font-semibold text-white">{selectedToken.symbol}</div>
              <div className="text-sm text-gray-400">{selectedToken.name}</div>
            </div>
          </div>
        ) : (
          <span className="text-gray-400">Select token</span>
        )}

        <div className="flex items-center space-x-2">
          {showBalance && wallet.isConnected && selectedToken && (
            <span className="text-sm text-gray-400">
              {getTokenBalance(selectedToken.symbol).toFixed(selectedToken.symbol === 'BTC' ? 8 : 6)}
            </span>
          )}
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-gray-800 border border-gray-600 rounded-xl shadow-2xl backdrop-blur-xl">
          <div className="p-4 border-b border-gray-600">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tokens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {filteredTokens.map((token) => (
              <button
                key={token.id}
                onClick={() => handleTokenSelect(token)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-700/50 transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {token.icon}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-white">{token.symbol}</div>
                    <div className="text-sm text-gray-400">{token.name}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-medium text-white">${token.price.toLocaleString()}</div>
                  {showBalance && wallet.isConnected && (
                    <div className="text-sm text-gray-400">
                      {getTokenBalance(token.symbol).toFixed(token.symbol === 'BTC' ? 8 : 6)}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};