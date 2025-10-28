import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface WalletState {
    address: string;
    ethBalance: number;
    btcBalance: number;
    isConnected: boolean;
    isConnecting: boolean;
}

interface WalletContextType {
    wallet: WalletState;
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;
    updateBalance: (token: 'ETH' | 'BTC', amount: number) => void;
    getTokenBalance: (symbol: string) => number;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const INITIAL_WALLET_STATE: WalletState = {
    address: '',
    ethBalance: 0,
    btcBalance: 0,
    isConnected: false,
    isConnecting: false,
};

// Hardcoded wallet data
const MOCK_WALLET_DATA = {
    address: '0x742d35Cc7F2E1C4E3C39e7e1a4Fdc9b4e2C8A3e9',
    ethBalance: 2.456789,
    btcBalance: 0.084321,
};

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [wallet, setWallet] = useState<WalletState>(INITIAL_WALLET_STATE);

    const connectWallet = useCallback(async (): Promise<void> => {
        setWallet(prev => ({ ...prev, isConnecting: true }));

        console.log('🔗 Attempting to connect wallet...');
        console.log('Mock Wallet Provider: MetaMask');

        // Simulate wallet connection delay
        return new Promise((resolve) => {
            setTimeout(() => {
                const newWalletState: WalletState = {
                    address: MOCK_WALLET_DATA.address,
                    ethBalance: MOCK_WALLET_DATA.ethBalance,
                    btcBalance: MOCK_WALLET_DATA.btcBalance,
                    isConnected: true,
                    isConnecting: false,
                };

                setWallet(newWalletState);

                console.log('✅ Wallet connected successfully!');
                console.log('Wallet Details:', {
                    address: newWalletState.address,
                    ethBalance: `${newWalletState.ethBalance} ETH`,
                    btcBalance: `${newWalletState.btcBalance} BTC`,
                    timestamp: new Date().toISOString()
                });

                console.log('🔐 Connection Security:', {
                    encrypted: true,
                    permissions: ['read', 'sign'],
                    sessionId: `session_${Math.random().toString(36).substr(2, 9)}`,
                    chainId: 1
                });

                resolve();
            }, 1500);
        });
    }, []);

    const disconnectWallet = useCallback(() => {
        setWallet(INITIAL_WALLET_STATE);
        console.log('🔌 Wallet disconnected');
        console.log('Session ended at:', new Date().toISOString());
    }, []);

    const updateBalance = useCallback((token: 'ETH' | 'BTC', amount: number) => {
        setWallet(prev => {
            const newWallet = {
                ...prev,
                [token.toLowerCase() + 'Balance']: Math.max(0, prev[token.toLowerCase() + 'Balance' as keyof WalletState] as number + amount)
            };

            console.log(`💰 ${token} balance updated:`, {
                previousBalance: prev[token.toLowerCase() + 'Balance' as keyof WalletState],
                change: amount,
                newBalance: newWallet[token.toLowerCase() + 'Balance' as keyof WalletState],
                timestamp: new Date().toISOString()
            });

            return newWallet;
        });
    }, []);

    const getTokenBalance = useCallback((symbol: string): number => {
        if (!wallet.isConnected) return 0;

        switch (symbol.toLowerCase()) {
            case 'eth':
                return wallet.ethBalance;
            case 'btc':
                return wallet.btcBalance;
            default:
                return 0;
        }
    }, [wallet.isConnected, wallet.ethBalance, wallet.btcBalance]);

    const value: WalletContextType = {
        wallet,
        connectWallet,
        disconnectWallet,
        updateBalance,
        getTokenBalance,
    };

    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = (): WalletContextType => {
    const context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
};
