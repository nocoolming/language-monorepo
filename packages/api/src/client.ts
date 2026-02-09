import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

/**
 * Get base URL from environment variables
 * Supports both Vite (web) and Expo (mobile) environments
 */
function getBaseUrl(): string {
    // Vite environment (web-admin)
    if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) {
        return import.meta.env.VITE_API_BASE_URL;
    }

    // Expo environment (mobile apps)
    if (typeof process !== 'undefined' && process.env?.EXPO_PUBLIC_API_URL) {
        return process.env.EXPO_PUBLIC_API_URL;
    }

    // Default fallback
    return 'http://localhost:3000/api';
}

/**
 * Create axios instance with default configuration
 */
const apiClient: AxiosInstance = axios.create({
    baseURL: getBaseUrl(),
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Token storage for authorization header
 */
let authToken: string | null = null;

/**
 * Set auth token for subsequent requests
 */
export function setAuthToken(token: string): void {
    authToken = token;
}

/**
 * Clear auth token
 */
export function clearAuthToken(): void {
    authToken = null;
}

/**
 * Request interceptor to add auth token
 */
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (authToken && config.headers) {
            config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

/**
 * Response interceptor for error handling
 */
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle common errors
        if (error.response?.status === 401) {
            // Token expired or invalid
            clearAuthToken();
            // Could emit an event here for the app to handle
        }
        return Promise.reject(error);
    }
);

export { apiClient };
