import { View, Text, StyleSheet } from 'react-native';

export default function ExploreScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>探索</Text>
            <Text style={styles.subtitle}>发现更多学习内容</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
});
