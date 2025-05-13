export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  walletAddress?: string;
  kycVerified?: boolean;
  twoFactorEnabled?: boolean;
  joinDate?: Date;
  isPublicProfile?: boolean;
}

export interface Investment {
  id: string;
  propertyName: string;
  location: string;
  imageUrl: string;
  investedAmount: number;
  currentValue: number;
  roi: number;
  status: 'active' | 'pending' | 'completed' | 'cancelled';
  investmentDate: Date;
  nextPayout?: Date;
}

export interface Transaction {
  type: 'deposit' | 'withdrawal' | 'investment' | 'return' | 'reward';
  details: string;
  date: Date;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
}

export interface ProfileStats {
  totalInvested: number;
  totalReturns: number;
  activeInvestments: number;
  averageROI: number;
  investmentScore: number;
}