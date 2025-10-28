import React, { useState } from 'react';
import { X, Copy, Plus, Minus, Wallet, ExternalLink } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';

interface WalletModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
    const { wallet, updateBalance, disconnectWallet } = useWallet();
    const [isAdding, setIsAdding] = useState(false);

    if (!isOpen || !wallet.isConnected) return null;

    const formatAddress = (address: string) => {
        return `${address.slice(0, 8)}...${address.slice(-8)}`;
    };

    const copyAddress = () => {
        navigator.clipboard.writeText(wallet.address);
        console.log('📋 Full address copied to clipboard:', wallet.address);
    };

    const addTestBalance = async (token: 'ETH' | 'BTC') => {
        setIsAdding(true);

        // Simulate adding test balance
        setTimeout(() => {
            const amount = token === 'ETH' ? 1.0 : 0.05;
            updateBalance(token, amount);
            console.log(`💰 Added ${amount} ${token} test balance`);
            setIsAdding(false);
        }, 1000);
    };

    const removeBalance = (token: 'ETH' | 'BTC') => {
        const amount = token === 'ETH' ? -0.1 : -0.001;
        updateBalance(token, amount);
        console.log(`💸 Removed ${Math.abs(amount)} ${token} from balance`);
    };

    const handleDisconnect = () => {
        disconnectWallet();
        onClose();
    };

    const totalValue = (wallet.ethBalance * 1876.42) + (wallet.btcBalance * 43250.67);

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-3xl w-full max-w-md shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                            <Wallet className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Wallet Details</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-700/50 rounded-xl transition-colors duration-200"
                    >
                        <X className="w-5 h-5 text-gray-400 hover:text-white" />
                    </button>
                </div>

                {/* Wallet Info */}
                <div className="p-6 space-y-6">
                    {/* Address */}
                    <div className="bg-gray-800/50 border border-gray-700/30 rounded-2xl p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-400">Wallet Address</span>
                            <button
                                onClick={copyAddress}
                                className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                            >
                                <Copy className="w-4 h-4" />
                                <span className="text-sm">Copy</span>
                            </button>
                        </div>
                        <div className="font-mono text-white text-sm bg-gray-700/30 px-3 py-2 rounded-lg">
                            {formatAddress(wallet.address)}
                        </div>
                    </div>

                    {/* Total Portfolio Value */}
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-4">
                        <div className="text-sm text-gray-400 mb-1">Total Portfolio Value</div>
                        <div className="text-2xl font-bold text-white">
                            ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                    </div>

                    {/* Balances */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Token Balances</h4>

                        {/* ETH Balance */}
                        <div className="bg-gray-800/50 border border-gray-700/30 rounded-2xl p-4">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                        ⟠
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold">Ethereum</div>
                                        <div className="text-sm text-gray-400">ETH</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-white font-semibold">
                                        {wallet.ethBalance.toFixed(6)} ETH
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        ${(wallet.ethBalance * 1876.42).toLocaleString()}
                                    </div>
                                </div>
                            </div>

                            <div className="flex space-x-2">
                                <button
                                    onClick={() => addTestBalance('ETH')}
                                    disabled={isAdding}
                                    className="flex-1 flex items-center justify-center space-x-2 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 rounded-lg transition-colors duration-200 disabled:opacity-50"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span className="text-sm">Add 1.0</span>
                                </button>
                                <button
                                    onClick={() => removeBalance('ETH')}
                                    disabled={wallet.ethBalance < 0.1}
                                    className="flex-1 flex items-center justify-center space-x-2 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-lg transition-colors duration-200 disabled:opacity-50"
                                >
                                    <Minus className="w-4 h-4" />
                                    <span className="text-sm">Remove 0.1</span>
                                </button>
                            </div>
                        </div>

                        {/* BTC Balance */}
                        <div className="bg-gray-800/50 border border-gray-700/30 rounded-2xl p-4">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center text-white font-bold">
                                        ₿
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold">Bitcoin</div>
                                        <div className="text-sm text-gray-400">BTC</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-white font-semibold">
                                        {wallet.btcBalance.toFixed(8)} BTC
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        ${(wallet.btcBalance * 43250.67).toLocaleString()}
                                    </div>
                                </div>
                            </div>

                            <div className="flex space-x-2">
                                <button
                                    onClick={() => addTestBalance('BTC')}
                                    disabled={isAdding}
                                    className="flex-1 flex items-center justify-center space-x-2 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 rounded-lg transition-colors duration-200 disabled:opacity-50"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span className="text-sm">Add 0.05</span>
                                </button>
                                <button
                                    onClick={() => removeBalance('BTC')}
                                    disabled={wallet.btcBalance < 0.001}
                                    className="flex-1 flex items-center justify-center space-x-2 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-lg transition-colors duration-200 disabled:opacity-50"
                                >
                                    <Minus className="w-4 h-4" />
                                    <span className="text-sm">Remove 0.001</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3 pt-4 border-t border-gray-700/50">
                        <button className="w-full flex items-center justify-center space-x-2 py-3 bg-gray-700/50 hover:bg-gray-700/70 border border-gray-600/50 text-gray-300 rounded-xl transition-colors duration-200">
                            <ExternalLink className="w-4 h-4" />
                            <span>View on Etherscan</span>
                        </button>

                        <button
                            onClick={handleDisconnect}
                            className="w-full py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-xl transition-colors duration-200"
                        >
                            Disconnect Wallet
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
