import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { useUserStore } from '../../src/store/userStore';

export default function LoginScreen() {
    const { login } = useUserStore();

    const handleLogin = () => {
        // Mock login
        login({
            id: 'mock_user',
            name: 'Demo User',
            ageGroup: '26-35',
            nativeLanguage: 'zh-CN',
            targetLanguage: 'en-US',
            level: 'Intermediate',
            interests: ['Tech', 'Travel'], // Added interests
            dailyGoalMinutes: 30,
            dailyProgress: 12, // Mock initial progress
            stats: {
                wordsSpoken: 0,
                listeningHours: 0,
                scenariosCompleted: 0,
                socialBattery: 80,
                studyHistory: [false, false, false, false, false, false, false]
            }
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>登录</Text>

            <Pressable style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>模拟登录</Text>
            </Pressable>

            <View style={styles.links}>
                <Link href="/(auth)/sign-on">
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
