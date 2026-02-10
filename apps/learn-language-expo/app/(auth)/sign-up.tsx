import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function RegisterScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>注册页面</Text>
            <Text style={styles.subtitle}>Register Screen</Text>

            <Link href="/(auth)/sign-in" style={styles.link}>
                <Text>已有账号？去登录</Text>
            </Link>
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
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 32,
    },
    link: {
        padding: 8,
    },
});
