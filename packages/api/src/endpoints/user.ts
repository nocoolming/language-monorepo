import { apiClient } from '../client';
import type { User } from '@repo/types';

/**
 * Get current user profile
 */
export async function getUserProfile(): Promise<User> {
    const response = await apiClient.get<User>('/user/profile');
    return response.data;
}

/**
 * Update user profile
 */
export async function updateUserProfile(data: Partial<User>): Promise<User> {
    const response = await apiClient.patch<User>('/user/profile', data);
    return response.data;
}

/**
 * Update user avatar
 */
export async function updateAvatar(formData: FormData): Promise<{ avatar: string }> {
    const response = await apiClient.post<{ avatar: string }>('/user/avatar', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}

/**
 * Update user locale preference
 */
export async function updateLocale(locale: string): Promise<void> {
    await apiClient.patch('/user/preferences', { locale });
}
