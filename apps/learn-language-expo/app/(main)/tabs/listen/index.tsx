import { View, Text, StyleSheet, FlatList, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { MOCK_NEWS_FEED } from '../../../../src/mock/newsFeed';
import { NewsItem } from '../../../../src/types';
import { useUserStore } from '../../../../src/store/userStore';

export default function ListenScreen() {
    const { user } = useUserStore();

    // Mock daily usage
    const minutesStudied = 20;

    const renderItem = ({ item }: { item: NewsItem }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.source}>{item.source}</Text>
                    <Text style={styles.date}>{item.date}</Text>
                </View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.summary} numberOfLines={2}>{item.summary}</Text>

                <View style={styles.footer}>
                    <View style={[styles.badge, styles[item.level]]}>
                        <Text style={styles.badgeText}>{item.level}</Text>
                    </View>
                    <Link href={`/(main)/article/${item.id}`} asChild>
                        <Pressable style={styles.playButton}>
                            <Text style={styles.playText}>▶ Click to Read/Play</Text>
                        </Pressable>
                    </Link>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {user && (
                <View style={styles.dailyGoalHeader}>
                    <Text style={styles.goalLabel}>Daily Goal / 每日目标</Text>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: '60%' }]} />
                    </View>
                    <Text style={styles.goalValue}>{minutesStudied} / {user.dailyGoalMinutes} min</Text>
                </View>
            )}

            <FlatList
                data={MOCK_NEWS_FEED}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    dailyGoalHeader: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    goalLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    progressBar: {
        height: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 4,
        marginBottom: 8,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#34C759', // Green
    },
    goalValue: {
        fontSize: 12,
        color: '#666',
        textAlign: 'right',
    },
    list: {
        padding: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    image: {
        width: '100%',
        height: 150,
    },
    content: {
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    source: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#007AFF',
    },
    date: {
        fontSize: 12,
        color: '#999',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    summary: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    Beginner: { backgroundColor: '#e6f7ff' },
    Intermediate: { backgroundColor: '#fff7e6' },
    Advanced: { backgroundColor: '#f6ffed' },
    badgeText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#333',
    },
    playButton: {
        backgroundColor: '#000',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    playText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});
