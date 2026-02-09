/**
 * Difficulty level for learning content
 */
export type DifficultyLevel = 'beginner' | 'elementary' | 'intermediate' | 'upper-intermediate' | 'advanced';

/**
 * Content type for lessons
 */
export type ContentType = 'video' | 'audio' | 'text' | 'quiz' | 'exercise';

/**
 * Course category
 */
export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    parentId?: string;
}

/**
 * Course model
 */
export interface Course {
    id: string;
    title: string;
    description: string;
    thumbnail?: string;
    categoryId: string;
    difficulty: DifficultyLevel;
    duration: number; // in minutes
    lessonCount: number;
    enrolledCount: number;
    rating: number;
    price: number;
    isFree: boolean;
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
}

/**
 * Lesson model
 */
export interface Lesson {
    id: string;
    courseId: string;
    title: string;
    description?: string;
    contentType: ContentType;
    contentUrl?: string;
    content?: string;
    duration: number; // in minutes
    order: number;
    isFree: boolean;
    createdAt: string;
    updatedAt: string;
}

/**
 * User learning progress
 */
export interface LearningProgress {
    id: string;
    userId: string;
    courseId: string;
    lessonId: string;
    progress: number; // 0-100
    isCompleted: boolean;
    lastAccessedAt: string;
    completedAt?: string;
}

/**
 * User course enrollment
 */
export interface Enrollment {
    id: string;
    userId: string;
    courseId: string;
    enrolledAt: string;
    expiresAt?: string;
    progress: number; // overall course progress 0-100
    completedLessons: number;
    totalLessons: number;
}

/**
 * Quiz question
 */
export interface QuizQuestion {
    id: string;
    lessonId: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation?: string;
    order: number;
}

/**
 * Quiz attempt result
 */
export interface QuizResult {
    id: string;
    userId: string;
    lessonId: string;
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    attemptedAt: string;
    timeSpent: number; // in seconds
}
