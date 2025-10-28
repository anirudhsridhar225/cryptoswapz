import React from 'react';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { Cryptocurrency } from '../types/crypto';

interface MarketDataProps {
  tokens: Cryptocurrency[];
}

export const MarketData: React.FC<MarketDataProps> = ({ tokens }) => {
  return (
    <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 shadow-2xl">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl shadow-lg">
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-white">Market Overview</h2>
      </div>

      <div className="space-y-3">
        {tokens.slice(0, 6).map((token) => (
          <div key={token.id} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors duration-150">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                {token.icon}
              </div>
              <div>
                <div className="font-semibold text-white">{token.symbol}</div>
                <div className="text-sm text-gray-400">{token.name}</div>
              </div>
            </div>

            <div className="text-right">
              <div className="font-semibold text-white">
                ${token.price.toLocaleString()}
              </div>
              <div className="flex items-center space-x-1">
                {token.change24h >= 0 ? (
                  <TrendingUp className="w-3 h-3 text-green-400" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-400" />
                )}
                <span className={`text-sm ${token.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                  {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};