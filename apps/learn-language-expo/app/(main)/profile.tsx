import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useUserStore } from '../../src/store/userStore';
import { useNavigation, useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function ProfileScreen() {
    const { user } = useUserStore();
    const router = useRouter();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerTitleAlign: 'center', // Center the title
            headerLeft: () => (
                <Pressable onPress={() => router.replace('/(main)/tabs')} style={{ marginLeft: 16 }}>
                    <Ionicons name="arrow-back" size={24} color="#007AFF" />
                </Pressable>
            ),
            // Remove the custom right button
            headerRight: undefined,
        });
    }, [navigation]);

    if (!user) {
        return (
            <View style={styles.container}>
                <Text>Please Log In / 请登录</Text>
            </View>
        );
    }

    // Mock Calculation for Streak from History
    const history = user.stats?.studyHistory || [];
    const lastFalseIndex = history.lastIndexOf(false);
    const currentStreak = lastFalseIndex === -1
        ? history.length
        : history.length - 1 - lastFalseIndex;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{user.name[0]}</Text>
                </View>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.level}>{user.level} Learner</Text>
            </View>

            {/* Reporting Section (Study History) */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Study Report / 学习报告</Text>
                <View style={styles.streakRow}>
                    <Text style={styles.streakCount}>{currentStreak} Day Streak 🔥</Text>
                    <Text style={styles.goalText}>Goal: {user.dailyGoalMinutes} min/day</Text>
                </View>

                <Text style={styles.historyLabel}>Last 7 Days / 过去 7 天</Text>
                <View style={styles.historyRow}>
                    {user.stats?.studyHistory?.map((done, idx) => (
                        <View key={idx} style={styles.dayCol}>
                            <View style={[styles.dayCircle, done ? styles.dayDone : styles.dayMissed]}>
                                <Text style={styles.dayIcon}>{done ? '✓' : '✕'}</Text>
                            </View>
                            <Text style={styles.dayText}>Day {idx + 1}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>{user.stats.wordsSpoken}</Text>
                    <Text style={styles.statLabel}>Words</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>{user.stats.listeningHours}</Text>
                    <Text style={styles.statLabel}>Hours</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>{user.stats.socialBattery}%</Text>
                    <Text style={styles.statLabel}>Battery</Text>
                </View>
            </View>

            <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>My Interests / 我的兴趣</Text>
                <View style={styles.tagsRow}>
                    {user.interests?.map(tag => (
                        <View key={tag} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                        </View>
                    )) || <Text style={styles.noTags}>No interests selected</Text>}
                </View>
            </View>

            <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>Details / 详情</Text>
                <View style={styles.row}>
                    <Text style={styles.label}>Native Language:</Text>
                    <Text style={styles.value}>{user.nativeLanguage}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Target Language:</Text>
                    <Text style={styles.value}>{user.targetLanguage}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 24,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    avatarText: {
        fontSize: 32,
        color: '#fff',
        fontWeight: 'bold',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    level: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
    },
    streakRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        alignItems: 'baseline',
    },
    streakCount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF9500',
    },
    goalText: {
        color: '#666',
    },
    historyLabel: {
        fontSize: 12,
        color: '#999',
        marginBottom: 8,
    },
    historyRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dayCol: {
        alignItems: 'center',
        gap: 4,
    },
    dayCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dayDone: {
        backgroundColor: '#E6F9EF', // Green tint
    },
    dayMissed: {
        backgroundColor: '#FFF1F0', // Red tint
    },
    dayIcon: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 12,
    },
    dayText: {
        fontSize: 10,
        color: '#ccc',
    },
    statsContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#007AFF',
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
    },
    infoSection: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
    },
    tagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    tag: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    tagText: {
        color: '#333',
        fontSize: 14,
    },
    noTags: {
        color: '#999',
        fontStyle: 'italic',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f9f9f9',
    },
    label: {
        color: '#666',
    },
    value: {
        color: '#333',
        fontWeight: '500',
    },
});
