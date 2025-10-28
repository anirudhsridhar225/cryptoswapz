import React, { useState, useEffect } from 'react';
import { ArrowDownUp, Settings, Info, Zap } from 'lucide-react';
import { TokenSelector } from './TokenSelector';
import { Cryptocurrency, SwapSettings } from '../types/crypto';
import { mockCryptocurrencies, exchangeRates } from '../data/mockData';
import { useWallet } from '../contexts/WalletContext';

interface SwapCardProps {
  onSwap: (fromToken: Cryptocurrency, toToken: Cryptocurrency, fromAmount: number, toAmount: number) => void;
}

export const SwapCard: React.FC<SwapCardProps> = ({ onSwap }) => {
  const { wallet, getTokenBalance } = useWallet();
  const [fromToken, setFromToken] = useState<Cryptocurrency | null>(mockCryptocurrencies[0]);
  const [toToken, setToToken] = useState<Cryptocurrency | null>(mockCryptocurrencies[1]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<SwapSettings>({
    slippageTolerance: 0.5,
    deadline: 20,
    gasPrice: 'standard'
  });
  const [priceImpact, setPriceImpact] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const calculateExchange = (amount: string, from: Cryptocurrency | null, to: Cryptocurrency | null, isFromInput: boolean) => {
    if (!amount || !from || !to || from.id === to.id) return '';

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return '';

    const rate = exchangeRates[from.symbol]?.[to.symbol] || 0;

    if (isFromInput) {
      const result = numAmount * rate;
      setPriceImpact(numAmount > 1000 ? 0.1 : 0.05);
      return result.toFixed(6);
    } else {
      const result = numAmount / rate;
      setPriceImpact(numAmount > 1000 ? 0.1 : 0.05);
      return result.toFixed(6);
    }
  };

  useEffect(() => {
    if (fromAmount && fromToken && toToken) {
      const result = calculateExchange(fromAmount, fromToken, toToken, true);
      setToAmount(result);
    }
  }, [fromAmount, fromToken, toToken]);

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    if (value && fromToken && toToken) {
      const result = calculateExchange(value, fromToken, toToken, true);
      setToAmount(result);
    } else {
      setToAmount('');
    }
  };

  const handleToAmountChange = (value: string) => {
    setToAmount(value);
    if (value && fromToken && toToken) {
      const result = calculateExchange(value, toToken, fromToken, true);
      setFromAmount(result);
    } else {
      setFromAmount('');
    }
  };

  const swapTokens = () => {
    const tempToken = fromToken;
    const tempAmount = fromAmount;
    setFromToken(toToken);
    setToToken(tempToken);
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const handleSwap = async () => {
    if (!fromToken || !toToken || !fromAmount || !toAmount) return;

    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    onSwap(fromToken, toToken, parseFloat(fromAmount), parseFloat(toAmount));
    setFromAmount('');
    setToAmount('');
    setIsLoading(false);
  };

  const fromTokenBalance = fromToken ? getTokenBalance(fromToken.symbol) : 0;
  const canSwap = wallet.isConnected && fromToken && toToken && fromAmount && toAmount &&
    parseFloat(fromAmount) > 0 && parseFloat(fromAmount) <= fromTokenBalance;

  const getGasFee = () => {
    switch (settings.gasPrice) {
      case 'slow': return '$3.45';
      case 'fast': return '$18.90';
      default: return '$8.67';
    }
  };

  return (
    <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 space-y-8 shadow-2xl">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Swap Tokens</h2>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-3 rounded-xl hover:bg-gray-700/50 transition-all duration-200 hover:shadow-lg"
        >
          <Settings className="w-5 h-5 text-gray-400 hover:text-white transition-colors duration-200" />
        </button>
      </div>

      {showSettings && (
        <div className="bg-gray-700/30 rounded-xl p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Slippage Tolerance
            </label>
            <div className="flex space-x-2">
              {[0.1, 0.5, 1.0].map((value) => (
                <button
                  key={value}
                  onClick={() => setSettings({ ...settings, slippageTolerance: value })}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${settings.slippageTolerance === value
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                    }`}
                >
                  {value}%
                </button>
              ))}
              <input
                type="number"
                step="0.1"
                value={settings.slippageTolerance}
                onChange={(e) => setSettings({ ...settings, slippageTolerance: parseFloat(e.target.value) || 0.5 })}
                className="w-20 px-2 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white text-sm"
                placeholder="0.5"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Transaction Deadline
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={settings.deadline}
                onChange={(e) => setSettings({ ...settings, deadline: parseInt(e.target.value) || 20 })}
                className="w-20 px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
              />
              <span className="text-gray-400">minutes</span>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="bg-gray-700/30 rounded-xl p-4">
          <TokenSelector
            selectedToken={fromToken}
            onTokenSelect={setFromToken}
            tokens={mockCryptocurrencies.filter(t => t.id !== toToken?.id)}
            label="From"
            showBalance={true}
          />

          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Amount</span>
              {wallet.isConnected && fromTokenBalance > 0 && (
                <button
                  onClick={() => handleFromAmountChange(fromTokenBalance.toString())}
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-150"
                >
                  Max: {fromTokenBalance.toFixed(fromToken?.symbol === 'BTC' ? 8 : 6)}
                </button>
              )}
            </div>
            <input
              type="number"
              step="any"
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
              placeholder="0.0"
              className="w-full bg-transparent text-2xl font-semibold text-white placeholder-gray-500 focus:outline-none"
            />
            {fromToken && fromAmount && (
              <div className="text-sm text-gray-400 mt-1">
                ≈ ${(parseFloat(fromAmount) * fromToken.price).toLocaleString()}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={swapTokens}
            className="p-3 bg-gray-700 hover:bg-gray-600 rounded-xl transition-all duration-200 hover:scale-105 group"
          >
            <ArrowDownUp className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-150" />
          </button>
        </div>

        <div className="bg-gray-700/30 rounded-xl p-4">
          <TokenSelector
            selectedToken={toToken}
            onTokenSelect={setToToken}
            tokens={mockCryptocurrencies.filter(t => t.id !== fromToken?.id)}
            label="To"
          />

          <div className="mt-4">
            <div className="mb-2">
              <span className="text-sm text-gray-400">Amount</span>
            </div>
            <input
              type="number"
              step="any"
              value={toAmount}
              onChange={(e) => handleToAmountChange(e.target.value)}
              placeholder="0.0"
              className="w-full bg-transparent text-2xl font-semibold text-white placeholder-gray-500 focus:outline-none"
            />
            {toToken && toAmount && (
              <div className="text-sm text-gray-400 mt-1">
                ≈ ${(parseFloat(toAmount) * toToken.price).toLocaleString()}
              </div>
            )}
          </div>
        </div>
      </div>

      {fromToken && toToken && fromAmount && toAmount && (
        <div className="bg-gray-700/20 rounded-xl p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Rate</span>
            <span className="text-white">
              1 {fromToken.symbol} = {exchangeRates[fromToken.symbol]?.[toToken.symbol]?.toFixed(6)} {toToken.symbol}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Price Impact</span>
            <span className={`${priceImpact > 3 ? 'text-red-400' : priceImpact > 1 ? 'text-yellow-400' : 'text-green-400'}`}>
              {priceImpact.toFixed(2)}%
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Estimated Gas</span>
            <span className="text-white">{getGasFee()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Minimum Received</span>
            <span className="text-white">
              {(parseFloat(toAmount) * (1 - settings.slippageTolerance / 100)).toFixed(6)} {toToken.symbol}
            </span>
          </div>
        </div>
      )}

      <button
        onClick={handleSwap}
        disabled={!canSwap || isLoading}
        className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${canSwap && !isLoading
          ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white transform hover:scale-[1.02] shadow-lg hover:shadow-blue-500/25'
          : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Swapping...</span>
          </div>
        ) : !fromToken || !toToken ? (
          'Select tokens'
        ) : !fromAmount || !toAmount ? (
          'Enter amount'
        ) : !wallet.isConnected ? (
          'Connect Wallet First'
        ) : parseFloat(fromAmount) > fromTokenBalance ? (
          'Insufficient balance'
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>Swap</span>
          </div>
        )}
      </button>

      {priceImpact > 3 && fromAmount && toAmount && (
        <div className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <Info className="w-4 h-4 text-red-400 flex-shrink-0" />
          <span className="text-sm text-red-400">
            High price impact warning! Consider reducing your swap amount.
          </span>
        </div>
      )}
    </div>
  );
};