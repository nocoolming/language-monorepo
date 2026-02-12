import { View, Text, StyleSheet, Image, ScrollView, Pressable, Alert } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { MOCK_NEWS_FEED } from '../../../../../src/mock/newsFeed';
import { useUserStore } from '../../../../../src/store/userStore';
import { useEffect, useState, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function ArticleDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const article = MOCK_NEWS_FEED.find(a => a.id === id);
    const { addProgress } = useUserStore();

    // Mock Player State
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0); // in seconds
    const duration = 120; // Mock duration: 2 minutes
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Timer Logic for "Listening"
    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(() => {
                setProgress(prev => {
                    if (prev >= duration) {
                        setIsPlaying(false);
                        return duration;
                    }
                    return prev + 1;
                });
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isPlaying]);

    // Cleanup on unmount (simulating "Done" when leaving? Or just manual complete)
    // For MVP, we require manual "Complete" or reaching end.

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleComplete = () => {
        // Calculate minutes (minimum 1 minute if < 1 min, or actual)
        // For MVP, let's give fixed credit or actual time.
        // Let's give credit based on duration (mocking full listen)
        const minutesToAdd = Math.ceil(duration / 60);

        addProgress(minutesToAdd);

        Alert.alert(
            "Great Job! / 太棒了！",
            `You finished reading/listening. +${minutesToAdd} min added to daily goal.`,
            [
                { text: "Back to List", onPress: () => router.back() }
            ]
        );
    };

    if (!article) {
        return (
            <View style={styles.center}>
                <Text>Article not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Article' }} />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Image source={{ uri: article.imageUrl }} style={styles.image} />

                <View style={styles.content}>
                    <Text style={styles.title}>{article.title}</Text>
                    <View style={styles.metaRow}>
                        <Text style={styles.source}>{article.source}</Text>
                        <Text style={styles.date}>{article.date}</Text>
                        <View style={[styles.badge, styles[article.level]]}>
                            <Text style={styles.badgeText}>{article.level}</Text>
                        </View>
                    </View>

                    <Text style={styles.summary}>{article.summary}</Text>

                    {/* Mock Body Text */}
                    <Text style={styles.body}>
                        Here is the full content of the article. Since we are using mock data, this text is static.
                        {"\n\n"}
                        Imagine this contains the transcript of the audio or the full news story.
                        In a real app, this would be fetched from the API.
                        {"\n\n"}
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Text>

                    <View style={styles.vocabSection}>
                        <Text style={styles.vocabTitle}>Key Vocabulary</Text>
                        <View style={styles.vocabItem}>
                            <Text style={styles.vocabWord}>Innovation</Text>
                            <Text style={styles.vocabDef}>A new method, idea, product, etc.</Text>
                        </View>
                        <View style={styles.vocabItem}>
                            <Text style={styles.vocabWord}>Technology</Text>
                            <Text style={styles.vocabDef}>The application of scientific knowledge.</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Sticky Player Footer */}
            <View style={styles.playerFooter}>
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${(progress / duration) * 100}%` }]} />
                </View>

                <View style={styles.playerControls}>
                    <Text style={styles.timeText}>
                        {Math.floor(progress / 60)}:{String(progress % 60).padStart(2, '0')}
                    </Text>

                    <Pressable onPress={handlePlayPause} style={styles.playButton}>
                        <Ionicons name={isPlaying ? "pause" : "play"} size={24} color="#fff" />
                    </Pressable>

                    <Text style={styles.timeText}>
                        {Math.floor(duration / 60)}:{String(duration % 60).padStart(2, '0')}
                    </Text>

                    <Pressable onPress={handleComplete} style={styles.completeButton}>
                        <Text style={styles.completeText}>Complete</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingBottom: 120, // Space for footer
    },
    image: {
        width: '100%',
        height: 200,
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 12,
    },
    source: {
        color: '#007AFF',
        fontWeight: '600',
    },
    date: {
        color: '#999',
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
    summary: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#666',
        marginBottom: 20,
        lineHeight: 24,
    },
    body: {
        fontSize: 16,
        lineHeight: 26,
        color: '#333',
        marginBottom: 32,
    },
    vocabSection: {
        backgroundColor: '#f9f9f9',
        padding: 16,
        borderRadius: 12,
    },
    vocabTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    vocabItem: {
        marginBottom: 12,
    },
    vocabWord: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007AFF',
    },
    vocabDef: {
        fontSize: 14,
        color: '#666',
    },
    playerFooter: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingBottom: 20, // Safe area
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    progressBar: {
        height: 4,
        backgroundColor: '#f0f0f0',
        width: '100%',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#007AFF',
    },
    playerControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    playButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timeText: {
        fontSize: 12,
        color: '#666',
        width: 40,
        textAlign: 'center',
    },
    completeButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#34C759',
        borderRadius: 20,
    },
    completeText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
});
