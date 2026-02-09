import { apiClient } from '../client';
import type { LoginCredentials, LoginResponse, RefreshTokenResponse } from '@repo/types';

/**
 * Login with email and password
 */
export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    return response.data;
}

/**
 * Logout current user
 */
export async function logout(): Promise<void> {
    await apiClient.post('/auth/logout');
}

/**
 * Refresh access token
 */
export async function refreshToken(token: string): Promise<RefreshTokenResponse> {
    const response = await apiClient.post<RefreshTokenResponse>('/auth/refresh', {
        refreshToken: token,
    });
    return response.data;
}

/**
 * Request password reset
 */
export async function requestPasswordReset(email: string): Promise<void> {
    await apiClient.post('/auth/password/reset', { email });
}

/**
 * Reset password with token
 */
export async function resetPassword(token: string, newPassword: string): Promise<void> {
    await apiClient.post('/auth/password/confirm', { token, newPassword });
}
