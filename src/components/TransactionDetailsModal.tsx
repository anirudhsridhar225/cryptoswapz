import React from 'react';
import { X, ExternalLink, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { SwapTransaction } from '../types/crypto';

interface TransactionDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    transaction: SwapTransaction | null;
}

export const TransactionDetailsModal: React.FC<TransactionDetailsModalProps> = ({
    isOpen,
    onClose,
    transaction
}) => {
    if (!isOpen || !transaction) return null;

    const getStatusIcon = (status: SwapTransaction['status']) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="w-6 h-6 text-green-400" />;
            case 'pending':
                return <AlertCircle className="w-6 h-6 text-yellow-400" />;
            case 'failed':
                return <XCircle className="w-6 h-6 text-red-400" />;
        }
    };

    const getStatusColor = (status: SwapTransaction['status']) => {
        switch (status) {
            case 'completed':
                return 'text-green-400';
            case 'pending':
                return 'text-yellow-400';
            case 'failed':
                return 'text-red-400';
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleString();
    };

    const copyTxHash = () => {
        navigator.clipboard.writeText(transaction.txHash);
        console.log('📋 Transaction hash copied:', transaction.txHash);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-3xl w-full max-w-6xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
                    <div className="flex items-center space-x-3">
                        {getStatusIcon(transaction.status)}
                        <div>
                            <h3 className="text-xl font-bold text-white">Transaction Details</h3>
                            <span className={`text-sm font-medium capitalize ${getStatusColor(transaction.status)}`}>
                                {transaction.status}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-700/50 rounded-xl transition-colors duration-200"
                    >
                        <X className="w-5 h-5 text-gray-400 hover:text-white" />
                    </button>
                </div>

                {/* Transaction Info - Horizontal Layout */}
                <div className="p-6">
                    <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
                        {/* Swap Details */}
                        <div className="xl:col-span-3 bg-gray-800/50 border border-gray-700/30 rounded-2xl p-6">
                            <h4 className="text-lg font-semibold text-white mb-6">Swap Details</h4>

                            <div className="flex items-center justify-between mb-8 px-4">
                                <div className="flex-1 text-center">
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl mb-4 mx-auto">
                                        {transaction.fromToken.icon}
                                    </div>
                                    <div className="text-white font-bold text-3xl mb-2">
                                        {transaction.fromAmount}
                                    </div>
                                    <div className="text-blue-400 text-xl font-bold mb-1">
                                        {transaction.fromToken.symbol}
                                    </div>
                                    <div className="text-gray-400 text-sm">
                                        {transaction.fromToken.name}
                                    </div>
                                </div>

                                <div className="flex flex-col items-center px-8">
                                    <div className="text-purple-400 text-5xl mb-3">→</div>
                                    <div className="text-sm text-purple-300 font-bold uppercase tracking-wider bg-purple-500/20 px-4 py-2 rounded-full border border-purple-500/30">
                                        Swap
                                    </div>
                                </div>

                                <div className="flex-1 text-center">
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 via-teal-500 to-emerald-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl mb-4 mx-auto">
                                        {transaction.toToken.icon}
                                    </div>
                                    <div className="text-white font-bold text-3xl mb-2">
                                        {transaction.toAmount}
                                    </div>
                                    <div className="text-green-400 text-xl font-bold mb-1">
                                        {transaction.toToken.symbol}
                                    </div>
                                    <div className="text-gray-400 text-sm">
                                        {transaction.toToken.name}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-700/30">
                                <div className="text-center">
                                    <div className="text-gray-400 text-sm mb-1">Exchange Rate</div>
                                    <div className="text-white font-medium text-sm">
                                        1 {transaction.fromToken.symbol} = {transaction.rate.toFixed(6)} {transaction.toToken.symbol}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-gray-400 text-sm mb-1">Transaction Fee</div>
                                    <div className="text-white font-medium text-sm">${transaction.gasFee.toFixed(2)}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-gray-400 text-sm mb-1">Timestamp</div>
                                    <div className="text-white font-medium text-sm">{formatTime(transaction.timestamp)}</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Panel - Hash & Actions */}
                        <div className="xl:col-span-2 space-y-4">
                            {/* Transaction Hash */}
                            <div className="bg-gray-800/50 border border-gray-700/30 rounded-2xl p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm text-gray-400 font-medium">Transaction Hash</span>
                                    <button
                                        onClick={copyTxHash}
                                        className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm px-2 py-1 rounded-lg hover:bg-blue-500/10"
                                    >
                                        <span>Copy</span>
                                    </button>
                                </div>
                                <div className="font-mono text-white text-xs bg-gray-700/30 px-3 py-2 rounded-lg break-all">
                                    {transaction.txHash}
                                </div>
                            </div>

                            {/* Status */}
                            <div className="bg-gray-800/50 border border-gray-700/30 rounded-2xl p-4">
                                <div className="text-sm text-gray-400 font-medium mb-3">Status</div>
                                <div className="flex items-center space-x-2">
                                    {getStatusIcon(transaction.status)}
                                    <span className={`font-semibold capitalize ${getStatusColor(transaction.status)}`}>
                                        {transaction.status}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-3">
                                <button className="w-full flex items-center justify-center space-x-2 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-xl transition-colors duration-200">
                                    <ExternalLink className="w-4 h-4" />
                                    <span>View on Explorer</span>
                                </button>

                                <button
                                    onClick={onClose}
                                    className="w-full py-3 bg-gray-700/50 hover:bg-gray-700/70 border border-gray-600/50 text-gray-300 rounded-xl transition-colors duration-200"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
