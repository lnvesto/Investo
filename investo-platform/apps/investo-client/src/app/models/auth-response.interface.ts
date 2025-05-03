export interface AuthResponse {
    success: boolean;
    message: string;
    userType?: string;
    token?: string;
    errors?: string[];
    id?: number;
    email?: string;
    fullName?: string;
} 