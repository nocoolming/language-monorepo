export type Language = 'en-US' | 'en-UK' | 'zh-CN' | 'es-ES';
export type UserLevel = 'Beginner' | 'Intermediate' | 'Advanced';

// User Profile
export interface UserProfile {
    id: string;
    name: string;
    avatar?: string;
    ageGroup: string; // e.g., '18-25', '26-35'
    nativeLanguage: string;
    targetLanguage: Language;
    level: UserLevel;
    interests: string[]; // e.g., ['Tech', 'Travel']
    dailyGoalMinutes: number; // e.g., 30
    dailyProgress: number; // e.g., 10 (Current progress today)
    stats: {
        wordsSpoken: number;
        listeningHours: number;
        scenariosCompleted: number;
        socialBattery: number; // 0-100
        studyHistory: boolean[]; // Last 7 days: [true, false, true...]
    };
}

// Tab 1: Listen (News/Media)
export interface NewsItem {
    id: string;
    title: string;
    summary: string;
    source: string; // e.g., 'BBC', 'VOA'
    imageUrl: string;
    audioUrl: string; // Mock URL
    level: UserLevel;
    date: string;
}

// Tab 2: Speak (Roleplay)
export interface Scenario {
    id: string;
    title: string;
    description: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    category: 'Survival' | 'Work' | 'Social' | 'Travel';
    initialMessage: string; // What the AI says first
    imageUrl: string;
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'ai';
    content: string;
    audioUrl?: string; // If the message was spoken
    timestamp: number;
}

// Tab 3: Community
export interface CommunityPost {
    id: string;
    authorId: string;
    authorName: string;
    authorAvatar?: string;
    content: string;
    tags: string[]; // e.g., ['#IELTS', '#StudyPartner']
    likes: number;
    comments: number;
    timestamp: string;
}
