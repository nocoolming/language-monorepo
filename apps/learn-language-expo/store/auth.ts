import { create } from 'zustand';

interface User {
    id: string;
    email: string;
    displayName: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    setAuthenticated: (value: boolean) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,

    setAuthenticated: (value: boolean) => {
        set({ isAuthenticated: value });
    },

    logout: () => {
        set({ user: null, isAuthenticated: false });
    },
}));
