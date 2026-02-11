import { View, Text, StyleSheet, FlatList, Image, Pressable } from 'react-native';
import { router } from 'expo-router';
import { MOCK_SCENARIOS } from '../../../src/mock/scenarios';
import { Scenario } from '../../../src/types';

export default function SpeakScreen() {
    const handleStart = (id: string) => {
        router.push(`/roleplay/${id}`);
    };

    const renderItem = ({ item }: { item: Scenario }) => (
        <Pressable style={styles.card} onPress={() => handleStart(item.id)}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.overlay}>
                <View style={[styles.badge, styles[item.difficulty]]}>
                    <Text style={styles.badgeText}>{item.difficulty}</Text>
                </View>
                <View style={styles.details}>
                    <Text style={styles.category}>{item.category}</Text>
                    <Text style={styles.title}>{item.title}</Text>
                </View>
            </View>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Choose a Scenario</Text>
            <FlatList
                data={MOCK_SCENARIOS}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    list: {
        paddingBottom: 20,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        height: 200,
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 16,
        overflow: 'hidden',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 12,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    title: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    category: {
        color: '#ddd',
        fontSize: 12,
        marginBottom: 4,
    },
    badge: {
        position: 'absolute',
        top: -140, // Positioned relative to overlay bottom
        right: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    Easy: { backgroundColor: '#52c41a' },
    Medium: { backgroundColor: '#faad14' },
    Hard: { backgroundColor: '#f5222d' },
    badgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    details: {
        // Just a wrapper
    }
});
