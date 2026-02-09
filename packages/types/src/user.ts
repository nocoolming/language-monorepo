/**
 * User roles in the learning platform
 */
export type UserRole = 'student' | 'teacher' | 'staff' | 'admin';

/**
 * Base user model
 */
export interface User {
    id: string;
    email: string;
    username: string;
    displayName: string;
    avatar?: string;
    role: UserRole;
    locale: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * Authentication state
 */
export interface AuthState {
    user: User | null;
    token: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

/**
 * Login credentials
 */
export interface LoginCredentials {
    email: string;
    password: string;
}

/**
 * Login response from API
 */
export interface LoginResponse {
    user: User;
    token: string;
    refreshToken: string;
    expiresIn: number;
}

/**
 * Token refresh response
 */
export interface RefreshTokenResponse {
    token: string;
    refreshToken: string;
    expiresIn: number;
}
