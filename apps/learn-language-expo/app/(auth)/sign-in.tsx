import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { useAuthStore } from '../../store';

export default function LoginScreen() {
    const { setAuthenticated } = useAuthStore();

    const handleLogin = () => {
        setAuthenticated(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>登录页面</Text>

            <Pressable style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>模拟登录</Text>
            </Pressable>

            <View style={styles.links}>
                <Link href="/(auth)/sign-up">
                    <Text style={styles.link}>没有账号？去注册</Text>
                </Link>
                <Link href="/(auth)/forgot-password">
                    <Text style={styles.link}>忘记密码？</Text>
                </Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 32,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        marginBottom: 24,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    links: {
        gap: 12,
    },
    link: {
        color: '#007AFF',
        padding: 8,
    },
});
