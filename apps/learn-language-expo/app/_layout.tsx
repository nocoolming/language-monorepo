import { Slot, Redirect, useSegments } from 'expo-router';
import { useAuthStore } from '../store';

export default function RootLayout() {
    const { isAuthenticated } = useAuthStore();
    const segments = useSegments();
    const inAuthGroup = segments[0] === '(auth)';

    // 未登录且不在 auth 路由组
    if (!isAuthenticated && !inAuthGroup) {
        return <Redirect href="/(auth)/sign-in" />;
    }

    // 已登录但在 auth 路由组
    if (isAuthenticated && inAuthGroup) {
        return <Redirect href="/(main)/tabs" />;
    }

    return <Slot />;
}
