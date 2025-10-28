import React from 'react';
import { TrendingUp, TrendingDown, Wallet, Lock } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';
import { mockCryptocurrencies } from '../data/mockData';

export const Portfolio: React.FC = () => {
  const { wallet, getTokenBalance } = useWallet();

  if (!wallet.isConnected) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">Portfolio</h2>
        </div>

        <div className="text-center py-8">
          <Lock className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-400 mb-2">Connect your wallet to view portfolio</p>
          <p className="text-sm text-gray-500">Your balances will appear here once connected</p>
        </div>
      </div>
    );
  }

  const ethBalance = getTokenBalance('ETH');
  const btcBalance = getTokenBalance('BTC');
  const ethToken = mockCryptocurrencies.find(t => t.symbol === 'ETH')!;
  const btcToken = mockCryptocurrencies.find(t => t.symbol === 'BTC')!;

  const totalValue = (ethBalance * ethToken.price) + (btcBalance * btcToken.price);
  const ethValue = ethBalance * ethToken.price;
  const btcValue = btcBalance * btcToken.price;

  // Calculate 24h change based on weighted average
  const weightedChange = totalValue > 0
    ? ((ethValue * ethToken.change24h) + (btcValue * btcToken.change24h)) / totalValue
    : 0;
  return (
    <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
          <Wallet className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-white">Portfolio</h2>
      </div>

      <div className="mb-6">
        <div className="text-3xl font-bold text-white mb-2">
          ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div className="flex items-center space-x-2">
          {weightedChange >= 0 ? (
            <TrendingUp className="w-4 h-4 text-green-400" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-400" />
          )}
          <span className={`text-sm font-medium ${weightedChange >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
            {weightedChange >= 0 ? '+' : ''}{weightedChange.toFixed(2)}% (24h)
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white mb-4">Your Assets</h3>

        {ethBalance > 0 && (
          <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors duration-150">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                {ethToken.icon}
              </div>
              <div>
                <div className="font-semibold text-white">{ethToken.symbol}</div>
                <div className="text-sm text-gray-400">{ethToken.name}</div>
              </div>
            </div>

            <div className="text-right">
              <div className="font-semibold text-white">
                {ethBalance.toFixed(6)} {ethToken.symbol}
              </div>
              <div className="text-sm text-gray-400">
                ${ethValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className={`text-xs ${ethToken.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                {ethToken.change24h >= 0 ? '+' : ''}{ethToken.change24h.toFixed(2)}%
              </div>
            </div>
          </div>
        )}

        {btcBalance > 0 && (
          <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors duration-150">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                {btcToken.icon}
              </div>
              <div>
                <div className="font-semibold text-white">{btcToken.symbol}</div>
                <div className="text-sm text-gray-400">{btcToken.name}</div>
              </div>
            </div>

            <div className="text-right">
              <div className="font-semibold text-white">
                {btcBalance.toFixed(8)} {btcToken.symbol}
              </div>
              <div className="text-sm text-gray-400">
                ${btcValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className={`text-xs ${btcToken.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                {btcToken.change24h >= 0 ? '+' : ''}{btcToken.change24h.toFixed(2)}%
              </div>
            </div>
          </div>
        )}

        {ethBalance === 0 && btcBalance === 0 && (
          <div className="text-center py-6 text-gray-400">
            <p>No assets found</p>
            <p className="text-sm">Your balances will appear here after you make a swap</p>
          </div>
        )}
      </div>
    </div>
  );
};