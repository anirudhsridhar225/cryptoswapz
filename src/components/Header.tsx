import React from 'react';
import { Zap, Globe, Wallet } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';

interface HeaderProps {
  onLogoClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  const { wallet, connectWallet } = useWallet();



  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-4 mb-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onLogoClick}
          className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
        >
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              CryptoSwapz
            </h1>
            <p className="text-sm text-gray-400">ETH ⇄ BTC Exchange</p>
          </div>
        </button>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-3 py-2 bg-gray-700/50 rounded-lg">
            <Globe className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-400 font-medium">Ethereum</span>
          </div>

          {!wallet.isConnected ? (
            <button
              onClick={connectWallet}
              disabled={wallet.isConnecting}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
            >
              {wallet.isConnecting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Connecting...</span>
                </div>
              ) : (
                'Connect Wallet'
              )}
            </button>
          ) : (
            <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-xl">
              <Wallet className="w-4 h-4 text-green-400" />
              <div className="text-left">
                <div className="text-sm font-medium text-white">
                  {formatAddress(wallet.address)}
                </div>
                <div className="text-xs text-green-400 space-x-2">
                  <span>{wallet.ethBalance.toFixed(4)} ETH</span>
                  <span>•</span>
                  <span>{wallet.btcBalance.toFixed(6)} BTC</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};