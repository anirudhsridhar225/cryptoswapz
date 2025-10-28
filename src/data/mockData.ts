import { Cryptocurrency, SwapTransaction, Portfolio } from '../types/crypto';

export const mockCryptocurrencies: Cryptocurrency[] = [
  {
    id: '1',
    symbol: 'ETH',
    name: 'Ethereum',
    price: 1876.42,
    change24h: 2.45,
    icon: '⟠',
    balance: 0
  },
  {
    id: '2',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 43250.67,
    change24h: -0.87,
    icon: '₿',
    balance: 0
  }
];

export const mockTransactions: SwapTransaction[] = [
  {
    id: 'tx1',
    fromToken: mockCryptocurrencies[0], // ETH
    toToken: mockCryptocurrencies[1], // BTC
    fromAmount: 1.0,
    toAmount: 0.04341,
    rate: 0.04341,
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    status: 'completed',
    txHash: '0x7f8c...3a9d',
    gasFee: 12.45
  },
  {
    id: 'tx2',
    fromToken: mockCryptocurrencies[1], // BTC
    toToken: mockCryptocurrencies[0], // ETH
    fromAmount: 0.01,
    toAmount: 0.2304,
    rate: 23.04,
    timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    status: 'completed',
    txHash: '0x2b4e...7f1c',
    gasFee: 8.90
  }
];

export const mockPortfolio: Portfolio = {
  totalValue: 0,
  change24h: 0,
  tokens: mockCryptocurrencies
};

export const exchangeRates: { [key: string]: { [key: string]: number } } = {
  'ETH': {
    'BTC': 0.04341
  },
  'BTC': {
    'ETH': 23.04
  }
};