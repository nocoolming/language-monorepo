import { View, Text, StyleSheet, ScrollView, Image, Pressable, Alert } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { MOCK_NEWS_FEED } from '../../../../../src/mock/newsFeed';

export default function ArticleScreen() {
    const { id } = useLocalSearchParams();
    const article = MOCK_NEWS_FEED.find(item => item.id === id);

    if (!article) return <Text>Article not found</Text>;

    return (
        <ScrollView style={styles.container}>
            <Stack.Screen options={{ title: 'Article Details' }} />

            <Image source={{ uri: article.imageUrl }} style={styles.image} />

            <View style={styles.content}>
                <Text style={styles.title}>{article.title}</Text>
                <View style={styles.meta}>
                    <Text style={styles.source}>{article.source}</Text>
                    <Text style={styles.date}>{article.date}</Text>
                </View>

                <Pressable style={styles.playBar} onPress={() => Alert.alert('Playing', 'Simulating Audio Playback...')}>
                    <Text style={styles.playIcon}>▶</Text>
                    <Text style={styles.playText}>Listen to Article</Text>
                </Pressable>

                <Text style={styles.body}>
                    {article.summary}
                    {'\n\n'}
                    (Here would be the full article text. In a prototype, we can repeat the summary or add mock lorem ipsum text to simulate length.)
                    {'\n\n'}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 200,
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 12,
    },
    meta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    source: {
        color: '#007AFF',
        fontWeight: '600',
    },
    date: {
        color: '#999',
    },
    playBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 12,
        borderRadius: 12,
        marginBottom: 24,
    },
    playIcon: {
        fontSize: 20,
        marginRight: 10,
        color: '#007AFF',
    },
    playText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    body: {
        fontSize: 18,
        lineHeight: 28,
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
});
