import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useState } from 'react';
import { useUserStore } from '../../src/store/userStore';
import { UserProfile, UserLevel } from '../../src/types';

export default function UserSetupScreen() {
    const { login } = useUserStore();

    // Workflow State
    const [step, setStep] = useState(1);
    const totalSteps = 5;

    // Data State
    const [ageGroup] = useState('26-35');
    const [nativeLang, setNativeLang] = useState('');
    const [targetLang, setTargetLang] = useState('');
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [quizScore, setQuizScore] = useState(0);
    const [dailyGoal, setDailyGoal] = useState(15);

    // Step 4: Quiz State
    const [quizIndex, setQuizIndex] = useState(0);


    const INTERESTS_LIST = ['Technology', 'Travel', 'Food', 'Business', 'Movies', 'Music', 'Sports', 'Science'];

    const QUIZ_QUESTIONS = [
        { q: "Listen: 'Can I get a coffee?' - What does the speaker want?", options: ["Tea", "Coffee", "Water"], correct: 1 },
        { q: "Grammar: She ____ to the store yesterday.", options: ["go", "goes", "went"], correct: 2 },
        { q: "Vocab: Which word is a fruit?", options: ["Car", "Apple", "Dog"], correct: 1 },
    ];

    const LANGUAGE_OPTIONS = [
        { label: '中文 (Chinese)', code: 'zh-CN' },
        { label: 'English', code: 'en-US' },
        { label: 'Español (Spanish)', code: 'es-ES' },
        { label: '日本語 (Japanese)', code: 'ja-JP' },
        { label: 'Deutsch (German)', code: 'de-DE' },
        { label: 'Français (French)', code: 'fr-FR' },
        { label: 'Italiano (Italian)', code: 'it-IT' },
        { label: 'Português (Portuguese)', code: 'pt-BR' },
    ];

    const handleNext = () => {
        if (step < totalSteps) {
            setStep(step + 1);
        } else {
            handleComplete();
        }
    };

    const handleComplete = () => {
        // Calculate Level based on Quiz
        let calculatedLevel: UserLevel = 'Beginner';
        if (quizScore === 3) calculatedLevel = 'Advanced';
        else if (quizScore === 2) calculatedLevel = 'Intermediate';

        // Create Profile
        const newUser: UserProfile = {
            id: 'user_' + Date.now(),
            name: 'New Learner',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
            ageGroup,
            nativeLanguage: nativeLang || 'zh-CN',
            targetLanguage: targetLang as any || 'en-US',
            level: calculatedLevel,
            interests: selectedInterests,
            dailyGoalMinutes: dailyGoal,
            stats: {
                wordsSpoken: 0,
                listeningHours: 0,
                scenariosCompleted: 0,
                socialBattery: 80, // Start high
                studyHistory: [false, false, false, false, false, false, true], // Just started today
            }
        };

        login(newUser);
    };

    // --- Sub-Components for Steps ---

    const Step1NativeLang = () => (
        <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>What is your native language?</Text>
            <Text style={styles.stepSubtitle}>母语是？</Text>
            <ScrollView style={styles.scrollOptions}>
                {LANGUAGE_OPTIONS.map(opt => (
                    <Option key={opt.code} label={opt.label} selected={nativeLang === opt.code} onPress={() => setNativeLang(opt.code)} />
                ))}
            </ScrollView>
        </View>
    );

    const Step2TargetLang = () => (
        <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>What do you want to learn?</Text>
            <Text style={styles.stepSubtitle}>想学什么？</Text>
            <View style={styles.options}>
                <Option label="English (US)" selected={targetLang === 'en-US'} onPress={() => setTargetLang('en-US')} />
                <Option label="English (UK)" selected={targetLang === 'en-UK'} onPress={() => setTargetLang('en-UK')} />
                <Text style={styles.comingSoon}>More languages coming soon...</Text>
            </View>
        </View>
    );

    const Step3Interests = () => {
        const toggleInterest = (interest: string) => {
            if (selectedInterests.includes(interest)) {
                setSelectedInterests(prev => prev.filter(i => i !== interest));
            } else {
                setSelectedInterests(prev => [...prev, interest]);
            }
        };

        return (
            <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>What interests you?</Text>
                <Text style={styles.stepSubtitle}>你的兴趣是？(We'll customize content)</Text>
                <View style={styles.tagsContainer}>
                    {INTERESTS_LIST.map(tag => (
                        <Pressable
                            key={tag}
                            style={[styles.tag, selectedInterests.includes(tag) && styles.tagSelected]}
                            onPress={() => toggleInterest(tag)}
                        >
                            <Text style={[styles.tagText, selectedInterests.includes(tag) && styles.tagTextSelected]}>{tag}</Text>
                        </Pressable>
                    ))}
                </View>
            </View>
        );
    };

    const Step4Quiz = () => {
        if (quizIndex >= QUIZ_QUESTIONS.length) {
            return (
                <View style={styles.stepContent}>
                    <Text style={styles.stepTitle}>Assessment Complete!</Text>
                    <Text style={styles.resultText}>You got {quizScore} / {QUIZ_QUESTIONS.length} correct.</Text>
                    <Text style={styles.resultDesc}>We recommend starting at: {quizScore === 3 ? 'Advanced' : (quizScore === 2 ? 'Intermediate' : 'Beginner')}</Text>
                </View>
            );
        }

        const currentQ = QUIZ_QUESTIONS[quizIndex];
        const handleAnswer = (optionIdx: number) => {
            if (optionIdx === currentQ.correct) {
                setQuizScore(prev => prev + 1);
            }
            setQuizIndex(prev => prev + 1);
        };

        return (
            <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Quick Proficiency Test</Text>
                <Text style={styles.stepSubtitle}>Question {quizIndex + 1} / {QUIZ_QUESTIONS.length}</Text>

                <View style={styles.quizCard}>
                    <Text style={styles.questionText}>{currentQ.q}</Text>
                    {currentQ.options.map((opt, idx) => (
                        <Pressable key={idx} style={styles.quizOption} onPress={() => handleAnswer(idx)}>
                            <Text style={styles.quizOptionText}>{opt}</Text>
                        </Pressable>
                    ))}
                </View>
            </View>
        );
    };

    const Step5Goal = () => (
        <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Set your Daily Goal</Text>
            <Text style={styles.stepSubtitle}>每天学习多久？</Text>

            <View style={styles.options}>
                <Option label="Casual (15 min)" selected={dailyGoal === 15} onPress={() => setDailyGoal(15)} />
                <Option label="Regular (30 min)" selected={dailyGoal === 30} onPress={() => setDailyGoal(30)} />
                <Option label="Serious (60 min)" selected={dailyGoal === 60} onPress={() => setDailyGoal(60)} />
            </View>
        </View>
    );

    // Helpers
    const Option = ({ label, selected, onPress }: any) => (
        <Pressable style={[styles.option, selected && styles.optionSelected]} onPress={onPress}>
            <Text style={[styles.optionText, selected && styles.optionTextSelected]}>{label}</Text>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: `${(step / totalSteps) * 100}%` }]} />
            </View>

            {step === 1 && <Step1NativeLang />}
            {step === 2 && <Step2TargetLang />}
            {step === 3 && <Step3Interests />}
            {step === 4 && <Step4Quiz />}
            {step === 5 && <Step5Goal />}

            <View style={styles.footer}>
                {step > 1 && (
                    <Pressable style={styles.backButton} onPress={() => setStep(step - 1)}>
                        <Text style={styles.backButtonText}>Back</Text>
                    </Pressable>
                )}

                {(step !== 4 || quizIndex >= QUIZ_QUESTIONS.length) && (
                    <Pressable style={styles.nextButton} onPress={handleNext}>
                        <Text style={styles.nextButtonText}>
                            {step === totalSteps ? 'Finish & Start' : 'Next'}
                        </Text>
                    </Pressable>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 24,
    },
    progressContainer: {
        height: 6,
        backgroundColor: '#f0f0f0',
        borderRadius: 3,
        marginBottom: 32,
        marginTop: 20,
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#007AFF',
        borderRadius: 3,
    },
    stepContent: {
        flex: 1,
    },
    stepTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#1a1a1a',
    },
    stepSubtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 24,
    },
    scrollOptions: {
        maxHeight: 400,
    },
    options: {
        gap: 12,
    },
    option: {
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    optionSelected: {
        borderColor: '#007AFF',
        backgroundColor: '#f0f9ff',
    },
    optionText: {
        fontSize: 16,
        color: '#333',
    },
    optionTextSelected: {
        color: '#007AFF',
        fontWeight: 'bold',
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    tag: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
    },
    tagSelected: {
        backgroundColor: '#007AFF',
    },
    tagText: {
        color: '#333',
    },
    tagTextSelected: {
        color: '#fff',
    },
    quizCard: {
        backgroundColor: '#f9f9f9',
        padding: 20,
        borderRadius: 16,
    },
    questionText: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 20,
    },
    quizOption: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    quizOptionText: {
        fontSize: 16,
        color: '#333',
    },
    resultText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#007AFF',
        marginTop: 20,
        marginBottom: 8,
    },
    resultDesc: {
        fontSize: 16,
        color: '#666',
    },
    footer: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'flex-end',
        gap: 16,
        paddingBottom: 20,
    },
    backButton: {
        padding: 16,
    },
    backButtonText: {
        color: '#999',
        fontSize: 16,
    },
    nextButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 30,
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    comingSoon: {
        textAlign: 'center',
        color: '#999',
        marginTop: 10,
        fontStyle: 'italic',
    },
});
