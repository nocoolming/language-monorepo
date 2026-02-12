import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Pressable, ScrollView, Alert, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { useUserStore } from '../../src/store/userStore';
import { useNavigation, useRouter } from 'expo-router';

export default function SettingsScreen() {
    const { user, logout } = useUserStore();
    const router = useRouter();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerTitleAlign: 'center',
            headerLeft: () => (
                <Pressable onPress={() => router.replace('/(main)/tabs')} style={{ marginLeft: 16 }}>
                    <Ionicons name="arrow-back" size={24} color="#007AFF" />
                </Pressable>
            ),
            headerRight: undefined,
        });
    }, [navigation]);

    // Settings State
    const [rate, setRate] = useState('1.0');
    const [gender, setGender] = useState<'Male' | 'Female'>('Female');
    const [dailyGoal, setDailyGoal] = useState(user?.dailyGoalMinutes || 15);
    const [weeklyGoal, setWeeklyGoal] = useState(5); // Days per week

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Study Goals</Text>

                <View style={styles.row}>
                    <Text style={styles.label}>Daily Goal (Minutes)</Text>
                    <View style={styles.controls}>
                        <Pressable onPress={() => setDailyGoal(Math.max(5, dailyGoal - 5))} style={styles.btnSmall}><Text>-</Text></Pressable>
                        <Text style={styles.value}>{dailyGoal} min</Text>
                        <Pressable onPress={() => setDailyGoal(dailyGoal + 5)} style={styles.btnSmall}><Text>+</Text></Pressable>
                    </View>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Weekly Goal (Days)</Text>
                    <View style={styles.controls}>
                        <Pressable onPress={() => setWeeklyGoal(Math.max(1, weeklyGoal - 1))} style={styles.btnSmall}><Text>-</Text></Pressable>
                        <Text style={styles.value}>{weeklyGoal} days</Text>
                        <Pressable onPress={() => setWeeklyGoal(Math.min(7, weeklyGoal + 1))} style={styles.btnSmall}><Text>+</Text></Pressable>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Audio Settings</Text>

                <View style={styles.row}>
                    <Text style={styles.label}>Voice Speed</Text>
                    <View style={styles.controls}>
                        {['0.8', '1.0', '1.2'].map(r => (
                            <Pressable
                                key={r}
                                style={[styles.btnOption, rate === r && styles.btnOptionSelected]}
                                onPress={() => setRate(r)}
                            >
                                <Text style={[styles.btnText, rate === r && styles.btnTextSelected]}>{r}x</Text>
                            </Pressable>
                        ))}
                    </View>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Voice Gender</Text>
                    <View style={styles.controls}>
                        {['Male', 'Female'].map(g => (
                            <Pressable
                                key={g}
                                style={[styles.btnOption, gender === g && styles.btnOptionSelected]}
                                onPress={() => setGender(g as any)}
                            >
                                <Text style={[styles.btnText, gender === g && styles.btnTextSelected]}>{g}</Text>
                            </Pressable>
                        ))}
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Pressable style={styles.btnLogout} onPress={logout}>
                    <Text style={styles.btnLogoutText}>Sign Out</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        color: '#333',
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    value: {
        fontSize: 16,
        fontWeight: 'bold',
        width: 60,
        textAlign: 'center',
    },
    btnSmall: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnOption: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        backgroundColor: '#f0f0f0',
    },
    btnOptionSelected: {
        backgroundColor: '#007AFF',
    },
    btnText: {
        color: '#333',
    },
    btnTextSelected: {
        color: '#fff',
        fontWeight: 'bold',
    },
    subLabel: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        marginTop: 8,
    },
    input: {
        backgroundColor: '#f9f9f9',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#eee',
    },
    btnSave: {
        backgroundColor: '#333',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    btnSaveText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 20,
    },
    btnLogout: {
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'red',
    },
    btnLogoutText: {
        color: 'red',
        fontWeight: 'bold',
    },
});
