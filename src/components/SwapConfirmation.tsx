import React from 'react';
import { X, AlertTriangle, Zap } from 'lucide-react';
import { Cryptocurrency } from '../types/crypto';

interface SwapConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  fromToken: Cryptocurrency | null;
  toToken: Cryptocurrency | null;
  fromAmount: string;
  toAmount: string;
  priceImpact: number;
  gasFee: string;
  isLoading: boolean;
}

export const SwapConfirmation: React.FC<SwapConfirmationProps> = ({
  isOpen,
  onClose,
  onConfirm,
  fromToken,
  toToken,
  fromAmount,
  toAmount,
  priceImpact,
  gasFee,
  isLoading
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Confirm Swap</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-150"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="p-4 bg-gray-700/30 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">You pay</span>
              <span className="text-lg font-semibold text-white">
                {fromAmount} {fromToken?.symbol}
              </span>
            </div>
            <div className="text-sm text-gray-400">
              ≈ ${fromToken && fromAmount ? (parseFloat(fromAmount) * fromToken.price).toLocaleString() : '0'}
            </div>
          </div>

          <div className="flex justify-center">
            <div className="p-2 bg-gray-700 rounded-lg">
              <Zap className="w-4 h-4 text-blue-400" />
            </div>
          </div>

          <div className="p-4 bg-gray-700/30 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">You receive</span>
              <span className="text-lg font-semibold text-white">
                {toAmount} {toToken?.symbol}
              </span>
            </div>
            <div className="text-sm text-gray-400">
              ≈ ${toToken && toAmount ? (parseFloat(toAmount) * toToken.price).toLocaleString() : '0'}
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Rate</span>
            <span className="text-white">
              1 {fromToken?.symbol} = {toToken && fromAmount && toAmount ? (parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(6) : '0'} {toToken?.symbol}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Price Impact</span>
            <span className={`${priceImpact > 3 ? 'text-red-400' : priceImpact > 1 ? 'text-yellow-400' : 'text-green-400'}`}>
              {priceImpact.toFixed(2)}%
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Network Fee</span>
            <span className="text-white">{gasFee}</span>
          </div>
        </div>

        {priceImpact > 3 && (
          <div className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg mb-6">
            <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span className="text-sm text-red-400">
              High price impact! Double-check your transaction.
            </span>
          </div>
        )}

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 py-3 px-4 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-xl transition-colors duration-150 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Confirming...</span>
              </div>
            ) : (
              'Confirm Swap'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};