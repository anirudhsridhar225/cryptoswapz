import React, { useState } from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { SwapTransaction } from '../types/crypto';
import { TransactionDetailsModal } from './TransactionDetailsModal';

interface TransactionHistoryProps {
  transactions: SwapTransaction[];
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  const [selectedTransaction, setSelectedTransaction] = useState<SwapTransaction | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleTransactionClick = (transaction: SwapTransaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };
  const getStatusIcon = (status: SwapTransaction['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-400" />;
    }
  };



  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 24) {
      return date.toLocaleDateString();
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else {
      return `${minutes}m ago`;
    }
  };

  return (
    <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg">
          <Clock className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
      </div>

      <div className="space-y-4">
        {transactions.length > 0 ? (
          transactions.map((tx) => (
            <button
              key={tx.id}
              onClick={() => handleTransactionClick(tx)}
              className="w-full bg-gradient-to-br from-gray-800/30 via-gray-800/50 to-gray-900/70 backdrop-blur-xl border border-gray-700/40 rounded-3xl p-6 hover:from-gray-700/50 hover:via-gray-800/70 hover:to-gray-900/90 transition-all duration-500 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10 hover:scale-[1.03] transform text-left group relative overflow-hidden"
            >
              {/* Gradient overlay for premium feel */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  {/* Status indicator with enhanced design */}
                  <div className="flex flex-col items-center space-y-1">
                    <div className="relative">
                      {getStatusIcon(tx.status)}
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${tx.status === 'completed' ? 'bg-green-400' :
                          tx.status === 'pending' ? 'bg-yellow-400' :
                            'bg-red-400'
                        } animate-pulse shadow-lg`}></div>
                    </div>
                    <div className={`text-xs font-bold uppercase tracking-wider ${tx.status === 'completed' ? 'text-green-400' :
                        tx.status === 'pending' ? 'text-yellow-400' :
                          'text-red-400'
                      }`}>
                      {tx.status}
                    </div>
                  </div>

                  {/* From token with enhanced styling */}
                  <div className="flex items-center space-x-4">
                    <div className="relative group/token">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-md opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                      <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-xl group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-110">
                        {tx.fromToken.icon}
                      </div>
                    </div>
                    <div className="group-hover:translate-x-1 transition-transform duration-300">
                      <div className="text-white font-bold text-xl mb-1">
                        {tx.fromAmount} <span className="text-blue-400">{tx.fromToken.symbol}</span>
                      </div>
                      <div className="text-gray-400 text-sm font-medium">
                        {tx.fromToken.name}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced swap indicator */}
                  <div className="flex flex-col items-center space-y-2 px-4">
                    <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full border border-purple-500/30 group-hover:border-purple-400/50 transition-colors duration-300">
                      <div className="text-purple-400 text-2xl font-bold group-hover:text-purple-300 transition-colors duration-300">→</div>
                      <div className="text-xs text-purple-300 font-bold uppercase tracking-widest">SWAP</div>
                    </div>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent group-hover:via-purple-400/70 transition-all duration-300"></div>
                  </div>

                  {/* To token with enhanced styling */}
                  <div className="flex items-center space-x-4">
                    <div className="relative group/token">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-teal-500 blur-md opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                      <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-green-500 via-teal-500 to-emerald-600 flex items-center justify-center text-white text-xl font-bold shadow-xl group-hover:shadow-green-500/40 transition-all duration-300 group-hover:scale-110">
                        {tx.toToken.icon}
                      </div>
                    </div>
                    <div className="group-hover:translate-x-1 transition-transform duration-300">
                      <div className="text-white font-bold text-xl mb-1">
                        {tx.toAmount} <span className="text-green-400">{tx.toToken.symbol}</span>
                      </div>
                      <div className="text-gray-400 text-sm font-medium">
                        {tx.toToken.name}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced right side info */}
                <div className="text-right space-y-2 group-hover:translate-x-1 transition-transform duration-300">
                  <div className="text-sm text-gray-300 font-semibold">
                    {formatTime(tx.timestamp)}
                  </div>
                  <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider border-2 ${tx.status === 'completed' ? 'bg-green-500/20 text-green-300 border-green-500/40 shadow-green-500/25' :
                      tx.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40 shadow-yellow-500/25' :
                        'bg-red-500/20 text-red-300 border-red-500/40 shadow-red-500/25'
                    } shadow-lg`}>
                    {tx.status}
                  </div>
                  <div className="text-xs text-gray-400 font-mono bg-gray-800/50 px-2 py-1 rounded-lg">
                    Gas: <span className="text-white font-semibold">${tx.gasFee}</span>
                  </div>
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">
            <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No transactions yet</p>
            <p className="text-sm">Your swap history will appear here</p>
          </div>
        )}
      </div>

      {showModal && selectedTransaction && (
        <TransactionDetailsModal
          transaction={selectedTransaction}
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedTransaction(null);
          }}
        />
      )}
    </div>
  );
};