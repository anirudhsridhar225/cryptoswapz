import React from 'react';
import { ArrowRight, Zap, Shield, Gauge, ChevronDown } from 'lucide-react';

interface LandingPageProps {
    onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
    const scrollToInstructions = () => {
        document.getElementById('instructions')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-purple-900/20"></div>
            </div>

            {/* Hero Section */}
            <div className="relative z-10 container mx-auto px-4 py-16 max-w-6xl">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center mb-8">
                        <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl shadow-2xl">
                            <Zap className="w-12 h-12 text-white" />
                        </div>
                    </div>

                    <h1 className="text-6xl md:text-7xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            CryptoSwapz
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
                        The most advanced <span className="text-blue-400 font-semibold">ETH ⇄ BTC</span> exchange platform
                    </p>

                    <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
                        Swap between Ethereum and Bitcoin with lightning-fast execution, minimal fees, and maximum security.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                            onClick={onGetStarted}
                            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25 min-w-[200px]"
                        >
                            Launch App <ArrowRight className="w-5 h-5 ml-2 inline" />
                        </button>

                        <button
                            onClick={scrollToInstructions}
                            className="px-8 py-4 bg-gray-800/60 hover:bg-gray-700/60 border border-gray-600/50 text-white font-semibold rounded-2xl transition-all duration-200 backdrop-blur-sm min-w-[200px]"
                        >
                            Learn How It Works
                        </button>
                    </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 text-center hover:bg-gray-800/60 transition-all duration-200 hover:border-blue-500/30 hover:shadow-xl">
                        <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl w-fit mx-auto mb-6">
                            <Zap className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Lightning Fast</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Execute swaps in seconds with our optimized smart contracts and real-time price feeds.
                        </p>
                    </div>

                    <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 text-center hover:bg-gray-800/60 transition-all duration-200 hover:border-purple-500/30 hover:shadow-xl">
                        <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl w-fit mx-auto mb-6">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Ultra Secure</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Built with military-grade security and audited smart contracts to protect your assets.
                        </p>
                    </div>

                    <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 text-center hover:bg-gray-800/60 transition-all duration-200 hover:border-green-500/30 hover:shadow-xl">
                        <div className="p-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl w-fit mx-auto mb-6">
                            <Gauge className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Best Rates</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Get the most competitive exchange rates with minimal slippage and transparent fees.
                        </p>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="text-center">
                    <button
                        onClick={scrollToInstructions}
                        className="animate-bounce p-2 rounded-full bg-gray-800/50 border border-gray-600/50 hover:bg-gray-700/50 transition-colors duration-200"
                    >
                        <ChevronDown className="w-6 h-6 text-gray-400" />
                    </button>
                </div>
            </div>

            {/* Instructions Section */}
            <div id="instructions" className="relative z-10 bg-gray-800/30 backdrop-blur-xl border-t border-gray-700/50">
                <div className="container mx-auto px-4 py-16 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            How to Get Started
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Follow these simple steps to start swapping ETH and BTC
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-2xl w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                                1
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Connect Wallet</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Click "Connect Wallet" to link your MetaMask or compatible wallet. You'll get mock balances for testing.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-2xl w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                                2
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Add Test Balance</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Click on your wallet address to open the wallet modal. Use "Add Test Balance" to get ETH and BTC for testing.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold text-2xl w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                                3
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Select Tokens</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Choose your source and destination tokens (ETH or BTC) and enter the amount you want to swap.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold text-2xl w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                                4
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Execute Swap</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Review the transaction details and confirm your swap. Watch your balance update in real-time!
                            </p>
                        </div>
                    </div>

                    <div className="text-center mt-16">
                        <button
                            onClick={onGetStarted}
                            className="px-12 py-5 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25 text-lg"
                        >
                            Start Swapping Now <ArrowRight className="w-6 h-6 ml-2 inline" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
