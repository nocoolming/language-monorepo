import { Stack } from 'expo-router';

export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerStyle: { backgroundColor: '#f5f5f5' },
                headerTintColor: '#333',
            }}
        >
            <Stack.Screen name="sign-in" options={{ title: '登录' }} />
            <Stack.Screen name="sign-on" options={{ title: '注册账号' }} />
            <Stack.Screen name="user-setup" options={{ title: '初始设置' }} />
            <Stack.Screen name="forgot-password" options={{ title: '找回密码' }} />
            <Stack.Screen name="sign-up" options={{ title: '注册(旧)' }} />
        </Stack>
    );
}
