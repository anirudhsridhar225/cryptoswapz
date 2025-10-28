import React, { useState } from 'react';
import { Copy, Plus, Minus, Wallet, ExternalLink, CreditCard, Shield, Zap } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';

export const WalletPage: React.FC = () => {
    const { wallet, updateBalance, disconnectWallet } = useWallet();
    const [isAdding, setIsAdding] = useState(false);

    if (!wallet.isConnected) {
        return (
            <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl text-center">
                <div className="flex flex-col items-center space-y-6">
                    <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl">
                        <Wallet className="w-12 h-12 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h2>
                        <p className="text-gray-400">Please connect your wallet to view your balance and manage funds.</p>
                    </div>
                </div>
            </div>
        );
    }

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
    };

    const totalValue = (wallet.ethBalance * 1876.42) + (wallet.btcBalance * 43250.67);

    return (
        <div className="space-y-6">
            {/* Wallet Overview */}
            <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl">
                            <Wallet className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">My Wallet</h2>
                            <p className="text-gray-400">Manage your cryptocurrency holdings</p>
                        </div>
                    </div>
                    <button
                        onClick={handleDisconnect}
                        className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-xl transition-colors duration-200 text-sm font-medium"
                    >
                        Disconnect
                    </button>
                </div>

                {/* Wallet Address */}
                <div className="bg-gray-800/50 border border-gray-700/30 rounded-2xl p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm text-gray-400 mb-1">Wallet Address</div>
                            <div className="text-white font-mono text-lg">{formatAddress(wallet.address)}</div>
                        </div>
                        <button
                            onClick={copyAddress}
                            className="flex items-center space-x-2 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-xl transition-colors duration-200"
                        >
                            <Copy className="w-4 h-4" />
                            <span className="text-sm font-medium">Copy</span>
                        </button>
                    </div>
                </div>

                {/* Total Portfolio Value */}
                <div className="bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/20 rounded-2xl p-6 mb-6">
                    <div className="text-center">
                        <div className="text-sm text-green-400 mb-2">Total Portfolio Value</div>
                        <div className="text-4xl font-bold text-white mb-2">${totalValue.toLocaleString()}</div>
                        <div className="text-sm text-gray-400">Across all assets</div>
                    </div>
                </div>
            </div>

            {/* Token Balances */}
            <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl">
                        <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Token Balances</h3>
                </div>

                <div className="space-y-4">
                    {/* ETH Balance */}
                    <div className="bg-gray-800/50 border border-gray-700/30 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                                    Ξ
                                </div>
                                <div>
                                    <div className="text-white font-bold text-xl">{wallet.ethBalance.toFixed(4)} ETH</div>
                                    <div className="text-gray-400 text-sm">Ethereum</div>
                                    <div className="text-green-400 text-sm font-medium">
                                        ≈ ${(wallet.ethBalance * 1876.42).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => addTestBalance('ETH')}
                                    disabled={isAdding}
                                    className="p-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 rounded-xl transition-colors duration-200 disabled:opacity-50"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => removeBalance('ETH')}
                                    className="p-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-xl transition-colors duration-200"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* BTC Balance */}
                    <div className="bg-gray-800/50 border border-gray-700/30 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-white text-xl font-bold">
                                    ₿
                                </div>
                                <div>
                                    <div className="text-white font-bold text-xl">{wallet.btcBalance.toFixed(6)} BTC</div>
                                    <div className="text-gray-400 text-sm">Bitcoin</div>
                                    <div className="text-green-400 text-sm font-medium">
                                        ≈ ${(wallet.btcBalance * 43250.67).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => addTestBalance('BTC')}
                                    disabled={isAdding}
                                    className="p-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 rounded-xl transition-colors duration-200 disabled:opacity-50"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => removeBalance('BTC')}
                                    className="p-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-xl transition-colors duration-200"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {isAdding && (
                    <div className="mt-4 text-center">
                        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl">
                            <Zap className="w-4 h-4 animate-pulse" />
                            <span className="text-sm font-medium">Adding test balance...</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Wallet Actions */}
            <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Wallet Actions</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="flex items-center justify-center space-x-3 p-4 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-xl transition-colors duration-200">
                        <ExternalLink className="w-5 h-5" />
                        <span className="font-medium">View on Explorer</span>
                    </button>

                    <button className="flex items-center justify-center space-x-3 p-4 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-400 rounded-xl transition-colors duration-200">
                        <Copy className="w-5 h-5" />
                        <span className="font-medium">Copy Full Address</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
