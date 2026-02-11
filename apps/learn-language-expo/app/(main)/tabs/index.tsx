import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useUserStore } from '../../../src/store/userStore';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
    const { user } = useUserStore();
    const router = useRouter();

    const userName = user?.name || 'Learner';

    return (
        <ScrollView style={styles.container}>
            <Pressable style={styles.header} onPress={() => router.push('/(main)/profile')}>
                <Text style={styles.greeting}>Welcome back,</Text>
                <Text style={styles.name}>{userName}!</Text>
                <Text style={{ fontSize: 12, color: '#007AFF', marginTop: 4 }}>View Profile &gt;</Text>
            </Pressable>

            <View style={styles.statsCard}>
                <Text style={styles.cardTitle}>Today's Goal</Text>
                <View style={styles.progressRow}>
                    <View style={styles.progressItem}>
                        <Text style={styles.progressValue}>10 / {user?.dailyGoalMinutes || 15}</Text>
                        <Text style={styles.progressLabel}>Minutes</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.progressItem}>
                        <Text style={styles.progressValue}>Day 3</Text>
                        <Text style={styles.progressLabel}>Streak</Text>
                    </View>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Quick Actions</Text>

            <View style={styles.actionGrid}>
                <Pressable style={styles.actionButton} onPress={() => router.push('/(main)/tabs/listen')}>
                    <Text style={styles.actionIcon}>🎧</Text>
                    <Text style={styles.actionText}>Daily News</Text>
                </Pressable>

                <Pressable style={styles.actionButton} onPress={() => router.push('/(main)/tabs/speak')}>
                    <Text style={styles.actionIcon}>🎙️</Text>
                    <Text style={styles.actionText}>Roleplay</Text>
                </Pressable>

                <Pressable style={styles.actionButton} onPress={() => router.push('/(main)/tabs/community')}>
                    <Text style={styles.actionIcon}>👥</Text>
                    <Text style={styles.actionText}>Community</Text>
                </Pressable>

                <Pressable style={styles.actionButton} onPress={() => router.push('/(main)/profile')}>
                    <Text style={styles.actionIcon}>👤</Text>
                    <Text style={styles.actionText}>Profile</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    header: {
        marginTop: 20,
        marginBottom: 30,
    },
    greeting: {
        fontSize: 18,
        color: '#666',
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    statsCard: {
        backgroundColor: '#007AFF',
        borderRadius: 20,
        padding: 24,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    cardTitle: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 16,
        marginBottom: 16,
    },
    progressRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    progressItem: {
        alignItems: 'center',
        flex: 1,
    },
    progressValue: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    progressLabel: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
    },
    divider: {
        width: 1,
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    actionGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    actionButton: {
        backgroundColor: '#fff',
        width: '47%', // roughly half width minus gap
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    actionIcon: {
        fontSize: 32,
        marginBottom: 8,
    },
    actionText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
});
