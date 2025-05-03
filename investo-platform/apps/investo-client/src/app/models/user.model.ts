export interface User {
  id: number;
  email: string;
  name: string;
  avatarUrl?: string;
  walletAddress?: string;
  kycVerified?: boolean;
  twoFactorEnabled?: boolean;
  joinDate?: Date;
  isPublicProfile?: boolean;
}