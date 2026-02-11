import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { MOCK_COMMUNITY_POSTS } from '../../../../src/mock/communityPosts';
import { CommunityPost } from '../../../../src/types';
import { Link } from 'expo-router';
import { useState } from 'react';

export default function CommunityScreen() {
    const [activeTab, setActiveTab] = useState<'recommend' | 'follow'>('recommend');

    const renderItem = ({ item }: { item: CommunityPost }) => (
        <Link href={`/(main)/tabs/community/post/${item.id}`} asChild>
            <Pressable style={styles.card}>
                <View style={styles.header}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{item.authorName[0]}</Text>
                    </View>
                    <View>
                        <Text style={styles.author}>{item.authorName}</Text>
                        <Text style={styles.timestamp}>{item.timestamp}</Text>
                    </View>
                </View>

                <Text style={styles.content} numberOfLines={3}>{item.content}</Text>
                <View style={styles.footer}>
                    <Text style={styles.stat}>❤️ {item.likes}</Text>
                    <Text style={styles.stat}>💬 {item.comments}</Text>
                </View>
            </Pressable>
        </Link>
    );

    return (
        <View style={styles.container}>
            <View style={styles.tabBar}>
                <Pressable
                    style={[styles.tab, activeTab === 'recommend' && styles.activeTab]}
                    onPress={() => setActiveTab('recommend')}
                >
                    <Text style={[styles.tabText, activeTab === 'recommend' && styles.activeTabText]}>推荐 (Recommend)</Text>
                </Pressable>
                <Pressable
                    style={[styles.tab, activeTab === 'follow' && styles.activeTab]}
                    onPress={() => setActiveTab('follow')}
                >
                    <Text style={[styles.tabText, activeTab === 'follow' && styles.activeTabText]}>关注 (Following)</Text>
                </Pressable>
            </View>

            <FlatList
                data={MOCK_COMMUNITY_POSTS}
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
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 8,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: '#007AFF',
    },
    tabText: {
        color: '#666',
        fontSize: 16,
    },
    activeTabText: {
        color: '#007AFF',
        fontWeight: 'bold',
    },
    list: {
        padding: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
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
        color: '#333',
    },
    timestamp: {
        fontSize: 12,
        color: '#999',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    content: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
    },
    footer: {
        flexDirection: 'row',
        gap: 16,
    },
    stat: {
        fontSize: 12,
        color: '#999',
    },
});
