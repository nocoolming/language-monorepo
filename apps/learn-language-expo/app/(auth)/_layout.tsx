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
            <Stack.Screen name="sign-up" options={{ title: '注册' }} />
            <Stack.Screen name="forgot-password" options={{ title: '忘记密码' }} />
        </Stack>
    );
}
