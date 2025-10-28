import { useState, useCallback } from 'react';
import { SwapTransaction, Cryptocurrency } from '../types/crypto';

export const useSwap = () => {
  const [transactions, setTransactions] = useState<SwapTransaction[]>([]);
  const [isSwapping, setIsSwapping] = useState(false);

  const executeSwap = useCallback(async (
    fromToken: Cryptocurrency,
    toToken: Cryptocurrency,
    fromAmount: number,
    toAmount: number
  ) => {
    setIsSwapping(true);

    // Simulate blockchain transaction
    const newTransaction: SwapTransaction = {
      id: `tx_${Date.now()}`,
      fromToken,
      toToken,
      fromAmount,
      toAmount,
      rate: toAmount / fromAmount,
      timestamp: new Date(),
      status: 'pending',
      txHash: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
      gasFee: Math.random() * 15 + 5 // Random gas fee between $5-20
    };

    setTransactions(prev => [newTransaction, ...prev]);

    // Simulate transaction confirmation delay
    setTimeout(() => {
      setTransactions(prev => 
        prev.map(tx => 
          tx.id === newTransaction.id 
            ? { ...tx, status: 'completed' as const }
            : tx
        )
      );
      setIsSwapping(false);
    }, 3000);

    return newTransaction;
  }, []);

  return {
    transactions,
    isSwapping,
    executeSwap
  };
};