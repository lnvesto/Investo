export interface BaseResponse {
  success: boolean;
  message: string;
}

export const CLAIMS = {
  NAME_IDENTIFIER: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier',
  ROLE: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
} as const;

export interface TokenPayload {
  [CLAIMS.NAME_IDENTIFIER]: string;
  [CLAIMS.ROLE]: string;
  firstName: string;
  lastName: string;
  email: string;
  exp: number;
  iss: string;
  aud: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  success?: boolean;
  message?: string;
  id?: string;
  email?: string;
  FirstName?: string;
  LastName?: string;
  userTypeId?: number;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  firstname: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  userTypeId: number;
}

export interface PasswordResetCodeResponse extends BaseResponse {
  code?: string;
}

export interface PasswordResetVerifyResponse extends BaseResponse {
  temporaryToken: string;
}

export interface TokenRefreshResponse extends BaseResponse {
  token: string;
}

export interface User {
  id: string;
  email: string;
  FirstName?: string;
  LastName?: string;
  token: string;
  userTypeId?: number;
  avatarUrl?: string;
  walletAddress?: string;
  kycVerified?: boolean;
  twoFactorEnabled?: boolean;
  joinDate?: Date;
  isPublicProfile?: boolean;
} 