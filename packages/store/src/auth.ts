import { create } from 'zustand';

// 临时定义类型，避免依赖 @repo/types
interface User {
    id: string;
    email: string;
    username: string;
    displayName: string;
    avatar?: string;
    role: string;
    locale: string;
}

interface LoginCredentials {
    email: string;
    password: string;
}

interface AuthState {
    // State
    user: User | null;
    token: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
    setUser: (user: User) => void;
    setTokens: (token: string, refreshToken: string) => void;
    clearAuth: () => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    // Initial state
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    // Actions
    login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        try {
            // TODO: 接入真实 API 后替换
            // 模拟登录
            const mockUser: User = {
                id: '1',
                email: credentials.email,
                username: 'student',
                displayName: '学生用户',
                role: 'student',
                locale: 'zh-CN',
            };
            set({
                user: mockUser,
                token: 'mock-token',
                refreshToken: 'mock-refresh-token',
                isAuthenticated: true,
                isLoading: false,
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Login failed';
            set({ error: message, isLoading: false });
            throw error;
        }
    },

    logout: async () => {
        set({ isLoading: true });
        try {
            // TODO: 接入真实 API 后替换
        } finally {
            set({
                user: null,
                token: null,
                refreshToken: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
            });
        }
    },

    setUser: (user: User) => {
        set({ user });
    },

    setTokens: (token: string, refreshToken: string) => {
        set({ token, refreshToken, isAuthenticated: true });
    },

    clearAuth: () => {
        set({
            user: null,
            token: null,
            refreshToken: null,
            isAuthenticated: false,
            error: null,
        });
    },

    setLoading: (isLoading: boolean) => {
        set({ isLoading });
    },

    setError: (error: string | null) => {
        set({ error });
    },
}));
