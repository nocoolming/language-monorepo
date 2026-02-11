import { View, Text, StyleSheet, ScrollView, Image, Pressable, TextInput, Alert } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { MOCK_COMMUNITY_POSTS } from '../../../../../src/mock/communityPosts';

export default function PostScreen() {
    const { id } = useLocalSearchParams();
    const post = MOCK_COMMUNITY_POSTS.find(item => item.id === id);

    if (!post) return <Text>Post not found</Text>;

    const COMMENTS = [
        { id: 1, user: 'Alice', content: 'Great tip! I also struggle with this.', time: '2h ago' },
        { id: 2, user: 'Bob', content: 'Have you tried recording yourself?', time: '5h ago' },
    ];

    return (
        <ScrollView style={styles.container}>
            <Stack.Screen options={{ title: 'Post Details' }} />

            <View style={styles.postCard}>
                <View style={styles.header}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{post.authorName[0]}</Text>
                    </View>
                    <View>
                        <Text style={styles.author}>{post.authorName}</Text>
                        <Text style={styles.time}>{post.timestamp}</Text>
                    </View>
                </View>

                <Text style={styles.content}>{post.content}</Text>

                <View style={styles.stats}>
                    <Text>❤️ {post.likes}</Text>
                    <Text>💬 {post.comments}</Text>
                </View>
            </View>

            <View style={styles.commentsSection}>
                <Text style={styles.sectionTitle}>Comments / 评论</Text>
                {COMMENTS.map(c => (
                    <View key={c.id} style={styles.commentItem}>
                        <Text style={styles.commentUser}>{c.user}</Text>
                        <Text style={styles.commentContent}>{c.content}</Text>
                        <Text style={styles.commentTime}>{c.time}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.inputArea}>
                <TextInput style={styles.input} placeholder="Write a comment..." />
                <Pressable onPress={() => Alert.alert('Proposed', 'Comment feature coming soon')}><Text style={{ color: '#007AFF' }}>Post</Text></Pressable>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    postCard: {
        backgroundColor: '#fff',
        padding: 20,
        marginBottom: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    avatarText: {
        fontSize: 18,
    },
    author: {
        fontWeight: 'bold',
    },
    time: {
        color: '#999',
        fontSize: 12,
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
        marginBottom: 16,
    },
    stats: {
        flexDirection: 'row',
        gap: 16,
    },
    commentsSection: {
        backgroundColor: '#fff',
        padding: 20,
        minHeight: 200,
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 16,
    },
    commentItem: {
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingBottom: 8,
    },
    commentUser: {
        fontWeight: '600',
        marginBottom: 4,
    },
    commentContent: {
        color: '#333',
        marginBottom: 4,
    },
    commentTime: {
        color: '#999',
        fontSize: 12,
    },
    inputArea: {
        padding: 16,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#eee',
    },
    input: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 20,
        marginRight: 10,
    }
});
