import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { useState } from 'react';

export default function SignOnScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Validation State
    const [errors, setErrors] = useState<{ email?: string, password?: string }>({});
    const [clickCount, setClickCount] = useState(0);

    const handleNext = () => {
        setClickCount(prev => prev + 1);

        if (clickCount === 0) {
            // First Click: Demonstrate Errors
            setErrors({
                email: '邮箱格式不正确 (演示错误)',
                password: '密码长度不足8位 (演示错误)'
            });
        } else {
            // Second Click: Pass
            setErrors({});
            Alert.alert('验证通过', '即将进入设置流程', [
                { text: 'OK', onPress: () => router.push('/(auth)/user-setup') }
            ]);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>注册账号</Text>
                <Text style={styles.subtitle}>开始你的英语突破之旅</Text>
            </View>

            <View style={styles.form}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>邮箱</Text>
                    <TextInput
                        style={[styles.input, errors.email && styles.inputError]}
                        placeholder="example@email.com"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    <Text style={styles.ruleText}>规则: 必须包含 @ 符号，且域名有效。</Text>
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>密码</Text>
                    <TextInput
                        style={[styles.input, errors.password && styles.inputError]}
                        placeholder="设置你的密码"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <Text style={styles.ruleText}>规则: 长度至少8位，包含字母和数字。</Text>
                    {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                </View>

                <Pressable style={styles.button} onPress={handleNext}>
                    <Text style={styles.buttonText}>下一步</Text>
                </Pressable>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>已有账号？</Text>
                <Link href="/(auth)/sign-in" asChild>
                    <Pressable>
                        <Text style={styles.link}>去登录</Text>
                    </Pressable>
                </Link>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 24,
        backgroundColor: '#fff',
    },
    header: {
        marginTop: 40,
        marginBottom: 32,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
    form: {
        gap: 24,
    },
    inputGroup: {
        gap: 6,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    inputError: {
        borderColor: '#FF3B30',
        backgroundColor: '#FFF0F0',
    },
    ruleText: {
        fontSize: 12,
        color: '#999',
    },
    errorText: {
        fontSize: 12,
        color: '#FF3B30',
        fontWeight: '600',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
        marginTop: 32,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 4,
    },
    footerText: {
        color: '#666',
    },
    link: {
        color: '#007AFF',
        fontWeight: '600',
    },
});
