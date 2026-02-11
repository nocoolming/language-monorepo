import { Slot, Redirect, useSegments } from 'expo-router';
import { useUserStore } from '../src/store/userStore';

export default function RootLayout() {
    const { isAuthenticated } = useUserStore();
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
