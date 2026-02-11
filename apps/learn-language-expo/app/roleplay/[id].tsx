import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Modal, Animated } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { MOCK_SCENARIOS } from '../../src/mock/scenarios';
import { ChatMessage } from '../../src/types';

export default function RoleplayScreen() {
    const { id } = useLocalSearchParams();
    const scenario = MOCK_SCENARIOS.find(s => s.id === id);

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isRecording, setIsRecording] = useState(false);
    const [inputText, setInputText] = useState('');
    const scrollViewRef = useRef<ScrollView>(null);
    const pulseAnim = useRef(new Animated.Value(1)).current;

    // Initial Message
    useEffect(() => {
        if (scenario && messages.length === 0) {
            setMessages([
                {
                    id: 'init',
                    role: 'ai',
                    content: scenario.initialMessage,
                    timestamp: Date.now(),
                }
            ]);
        }
    }, [scenario]);

    // Pulse Animation
    useEffect(() => {
        if (isRecording) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, { toValue: 1.2, duration: 500, useNativeDriver: true }),
                    Animated.timing(pulseAnim, { toValue: 1, duration: 500, useNativeDriver: true })
                ])
            ).start();
        } else {
            pulseAnim.setValue(1);
        }
    }, [isRecording]);

    const handleSend = () => {
        if (!inputText.trim()) return;

        const newUserMsg: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: inputText,
            timestamp: Date.now(),
        };

        setMessages(prev => [...prev, newUserMsg]);
        setInputText('');

        // Mock AI Response
        setTimeout(() => {
            const aiMsg: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'ai',
                content: "That's a great answer! (Mock AI Response)",
                timestamp: Date.now(),
            };
            setMessages(prev => [...prev, aiMsg]);
        }, 1500);
    };

    // Hold to Speak Logic
    const startRecording = () => {
        setIsRecording(true);
    };

    const stopRecording = () => {
        setIsRecording(false);
        // Mock STT Result
        setTimeout(() => {
            setInputText("Hello, I would like to order a cappuccino.");
        }, 500);
    };

    if (!scenario) return <Text>Scenario not found</Text>;

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: scenario.title }} />

            <View style={styles.scenarioInfo}>
                <Text style={styles.description}>{scenario.description}</Text>
            </View>

            <ScrollView
                style={styles.chatContainer}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            >
                {messages.map(msg => (
                    <View key={msg.id} style={[
                        styles.bubble,
                        msg.role === 'user' ? styles.userBubble : styles.aiBubble
                    ]}>
                        <Text style={[
                            styles.msgText,
                            msg.role === 'user' ? styles.userText : styles.aiText
                        ]}>{msg.content}</Text>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.inputArea}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Type message..."
                    value={inputText}
                    onChangeText={setInputText}
                    onSubmitEditing={handleSend}
                />

                {inputText ? (
                    <Pressable style={styles.sendButton} onPress={handleSend}>
                        <Text style={styles.sendText}>Send</Text>
                    </Pressable>
                ) : (
                    <Pressable
                        style={styles.micButton}
                        onPressIn={startRecording}
                        onPressOut={stopRecording}
                    >
                        <Text style={styles.micText}>Hold to Speak</Text>
                    </Pressable>
                )}
            </View>

            {/* Recording Overlay */}
            <Modal transparent visible={isRecording} animationType="fade">
                <View style={styles.overlay}>
                    <Animated.View style={[styles.bigMic, { transform: [{ scale: pulseAnim }] }]}>
                        <Text style={styles.bigMicText}>🎙️</Text>
                    </Animated.View>
                    <Text style={styles.recordingLabel}>Listening...</Text>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scenarioInfo: {
        backgroundColor: '#fff',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    description: {
        color: '#666',
        fontStyle: 'italic',
    },
    chatContainer: {
        flex: 1,
        padding: 16,
    },
    bubble: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 16,
        marginBottom: 12,
    },
    aiBubble: {
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderBottomLeftRadius: 4,
    },
    userBubble: {
        alignSelf: 'flex-end',
        backgroundColor: '#007AFF',
        borderBottomRightRadius: 4,
    },
    msgText: {
        fontSize: 16,
        lineHeight: 22,
    },
    aiText: {
        color: '#333',
    },
    userText: {
        color: '#fff',
    },
    inputArea: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    textInput: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 16,
        marginRight: 10,
    },
    micButton: {
        height: 50,
        minWidth: 120,
        borderRadius: 25,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    micText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    sendButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 20,
    },
    sendText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bigMic: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#FF3B30',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        elevation: 10,
        shadowColor: 'red',
        shadowOpacity: 0.5,
        shadowRadius: 20,
    },
    bigMicText: {
        fontSize: 80,
    },
    recordingLabel: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 2,
    },
});
