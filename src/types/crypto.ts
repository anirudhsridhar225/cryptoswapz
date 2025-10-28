export interface Cryptocurrency {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  icon: string;
  balance?: number;
}

export interface SwapTransaction {
  id: string;
  fromToken: Cryptocurrency;
  toToken: Cryptocurrency;
  fromAmount: number;
  toAmount: number;
  rate: number;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
  txHash: string;
  gasFee: number;
}

export interface Portfolio {
  totalValue: number;
  change24h: number;
  tokens: Cryptocurrency[];
}

export interface SwapSettings {
  slippageTolerance: number;
  deadline: number;
  gasPrice: 'slow' | 'standard' | 'fast';
}