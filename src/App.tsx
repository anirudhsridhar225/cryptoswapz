import React, { useState } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { SwapCard } from './components/SwapCard';
import { Portfolio } from './components/Portfolio';
import { WalletPage } from './components/WalletPage';
import { TransactionHistory } from './components/TransactionHistory';
import { MarketData } from './components/MarketData';
import { SettingsPanel } from './components/SettingsPanel';
import { SwapConfirmation } from './components/SwapConfirmation';
import { LandingPage } from './components/LandingPage';
import { useSwap } from './hooks/useSwap';
import { useWallet, WalletProvider } from './contexts/WalletContext';
import { mockCryptocurrencies, mockTransactions } from './data/mockData';
import { Cryptocurrency } from './types/crypto';

const AppContent: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [activeTab, setActiveTab] = useState('swap');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingSwap, setPendingSwap] = useState<{
    fromToken: Cryptocurrency;
    toToken: Cryptocurrency;
    fromAmount: number;
    toAmount: number;
  } | null>(null);
  const { transactions, isSwapping, executeSwap } = useSwap();
  const { updateBalance } = useWallet();

  // Combine mock transactions with new ones
  const allTransactions = [...transactions, ...mockTransactions];

  const handleSwapRequest = (
    fromToken: Cryptocurrency,
    toToken: Cryptocurrency,
    fromAmount: number,
    toAmount: number
  ) => {
    setPendingSwap({ fromToken, toToken, fromAmount, toAmount });
    setShowConfirmation(true);
  };

  const handleConfirmSwap = async () => {
    if (!pendingSwap) return;

    await executeSwap(
      pendingSwap.fromToken,
      pendingSwap.toToken,
      pendingSwap.fromAmount,
      pendingSwap.toAmount
    );

    // Update wallet balances atomically
    updateBalance(pendingSwap.fromToken.symbol as 'ETH' | 'BTC', -pendingSwap.fromAmount);
    updateBalance(pendingSwap.toToken.symbol as 'ETH' | 'BTC', pendingSwap.toAmount);

    setShowConfirmation(false);
    setPendingSwap(null);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'swap':
        return <SwapCard onSwap={handleSwapRequest} />;
      case 'wallet':
        return <WalletPage />;
      case 'portfolio':
        return (
          <div className="space-y-6">
            <Portfolio />
            <TransactionHistory transactions={allTransactions} />
          </div>
        );
      case 'market':
        return <MarketData tokens={mockCryptocurrencies} />;
      case 'history':
        return <TransactionHistory transactions={allTransactions} />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <SwapCard onSwap={handleSwapRequest} />;
    }
  };

  if (showLanding) {
    return <LandingPage onGetStarted={() => setShowLanding(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative">
      {/* Fixed Background - No more glitching */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-purple-900/10"></div>

      <div className="relative z-10 container mx-auto px-4 py-6 max-w-6xl">
        <Header onLogoClick={() => setShowLanding(true)} />

        <div className={`grid grid-cols-1 gap-6 ${(activeTab === 'portfolio' || activeTab === 'wallet') ? 'lg:grid-cols-1' : 'lg:grid-cols-3'}`}>
          <div className={`space-y-6 ${(activeTab === 'portfolio' || activeTab === 'wallet') ? 'lg:col-span-1' : 'lg:col-span-2'}`}>
            <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
            {renderContent()}
          </div>

          {activeTab !== 'portfolio' && activeTab !== 'wallet' && (
            <div className="space-y-6">
              {activeTab === 'swap' && (
                <>
                  <Portfolio />
                  <MarketData tokens={mockCryptocurrencies} />
                </>
              )}
              {activeTab === 'portfolio' && (
                <>
                  <MarketData tokens={mockCryptocurrencies} />
                </>
              )}
              {activeTab === 'market' && (
                <>
                  <Portfolio />
                  <TransactionHistory transactions={allTransactions.slice(0, 3)} />
                </>
              )}
              {activeTab === 'history' && (
                <>
                  <Portfolio />
                  <MarketData tokens={mockCryptocurrencies} />
                </>
              )}
              {activeTab === 'settings' && (
                <Portfolio />
              )}
            </div>
          )}
        </div>
      </div>

      <SwapConfirmation
        isOpen={showConfirmation}
        onClose={() => {
          setShowConfirmation(false);
          setPendingSwap(null);
        }}
        onConfirm={handleConfirmSwap}
        fromToken={pendingSwap?.fromToken || null}
        toToken={pendingSwap?.toToken || null}
        fromAmount={pendingSwap?.fromAmount.toString() || ''}
        toAmount={pendingSwap?.toAmount.toString() || ''}
        priceImpact={0.05}
        gasFee="$8.67"
        isLoading={isSwapping}
      />
    </div>
  );
};

function App() {
  return (
    <WalletProvider>
      <AppContent />
    </WalletProvider>
  );
}

export default App;