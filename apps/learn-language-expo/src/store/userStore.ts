import { create } from 'zustand';
import { UserProfile } from '../types';

interface UserState {
    user: UserProfile | null;
    isAuthenticated: boolean;

    // Actions
    login: (user: UserProfile) => void;
    logout: () => void;
    updateStats: (newStats: Partial<UserProfile['stats']>) => void;
    chargeBattery: (amount: number) => void;
    drainBattery: (amount: number) => void;
}

export const DEFAULT_USER: UserProfile = {
    id: 'mock_user_1',
    name: 'Introvert Hero',
    ageGroup: '26-35',
    nativeLanguage: 'zh-CN',
    targetLanguage: 'en-US',
    level: 'Intermediate',
    interests: ['Tech', 'Travel', 'Food'],
    dailyGoalMinutes: 30,
    stats: {
        wordsSpoken: 1250,
        listeningHours: 5.5,
        scenariosCompleted: 12,
        socialBattery: 40, // Low battery!
        studyHistory: [true, true, false, true, true, false, true], // Mock history
    },
};

export const useUserStore = create<UserState>((set) => ({
    user: null, // Start unauthenticated
    isAuthenticated: false,

    login: (user) => set({ user, isAuthenticated: true }),

    logout: () => set({ user: null, isAuthenticated: false }),

    updateStats: (newStats) =>
        set((state) => ({
            user: state.user
                ? { ...state.user, stats: { ...state.user.stats, ...newStats } }
                : null,
        })),

    chargeBattery: (amount) =>
        set((state) => {
            if (!state.user) return {};
            const newBattery = Math.min(100, state.user.stats.socialBattery + amount);
            return {
                user: {
                    ...state.user,
                    stats: { ...state.user.stats, socialBattery: newBattery },
                },
            };
        }),

    drainBattery: (amount) =>
        set((state) => {
            if (!state.user) return {};
            const newBattery = Math.max(0, state.user.stats.socialBattery - amount);
            return {
                user: {
                    ...state.user,
                    stats: { ...state.user.stats, socialBattery: newBattery },
                },
            };
        }),
}));
