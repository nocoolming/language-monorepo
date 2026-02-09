import { create } from 'zustand';

/**
 * Supported locales
 */
export type Locale = 'en' | 'zh-CN' | 'zh-TW' | 'ja' | 'ko';

interface I18nState {
    // State
    locale: Locale;

    // Actions
    setLocale: (locale: Locale) => void;
}

/**
 * Get default locale from environment or system
 */
function getDefaultLocale(): Locale {
    // Check environment variable
    if (typeof process !== 'undefined' && process.env?.EXPO_PUBLIC_DEFAULT_LOCALE) {
        return process.env.EXPO_PUBLIC_DEFAULT_LOCALE as Locale;
    }

    // Default to English
    return 'en';
}

export const useI18nStore = create<I18nState>((set) => ({
    // Initial state
    locale: getDefaultLocale(),

    // Actions
    setLocale: (locale: Locale) => {
        set({ locale });
        // Could persist to storage here
    },
}));
