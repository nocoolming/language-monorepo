import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useAuthStore } from '../../../store';

export default function ProfileScreen() {
    const { isAuthenticated, logout } = useAuthStore();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>我的</Text>
            <Text style={styles.info}>
                登录状态: {isAuthenticated ? '✅ 已登录' : '❌ 未登录'}
            </Text>

            <Pressable style={styles.button} onPress={logout}>
                <Text style={styles.buttonText}>退出登录</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    info: {
        fontSize: 16,
        marginBottom: 24,
    },
    button: {
        backgroundColor: '#FF3B30',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
