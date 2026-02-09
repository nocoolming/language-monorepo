import { apiClient } from '../client';
import type { Course, Lesson, Enrollment, LearningProgress } from '@repo/types';

/**
 * Get list of courses
 */
export async function getCourses(params?: {
    categoryId?: string;
    difficulty?: string;
    page?: number;
    limit?: number;
}): Promise<{ data: Course[]; total: number }> {
    const response = await apiClient.get<{ data: Course[]; total: number }>('/courses', { params });
    return response.data;
}

/**
 * Get course details
 */
export async function getCourse(courseId: string): Promise<Course> {
    const response = await apiClient.get<Course>(`/courses/${courseId}`);
    return response.data;
}

/**
 * Get lessons for a course
 */
export async function getCourseLessons(courseId: string): Promise<Lesson[]> {
    const response = await apiClient.get<Lesson[]>(`/courses/${courseId}/lessons`);
    return response.data;
}

/**
 * Enroll in a course
 */
export async function enrollCourse(courseId: string): Promise<Enrollment> {
    const response = await apiClient.post<Enrollment>(`/courses/${courseId}/enroll`);
    return response.data;
}

/**
 * Get user enrollments
 */
export async function getEnrollments(): Promise<Enrollment[]> {
    const response = await apiClient.get<Enrollment[]>('/user/enrollments');
    return response.data;
}

/**
 * Update learning progress
 */
export async function updateProgress(
    lessonId: string,
    progress: number
): Promise<LearningProgress> {
    const response = await apiClient.post<LearningProgress>(`/lessons/${lessonId}/progress`, {
        progress,
    });
    return response.data;
}

/**
 * Mark lesson as completed
 */
export async function completeLesson(lessonId: string): Promise<LearningProgress> {
    const response = await apiClient.post<LearningProgress>(`/lessons/${lessonId}/complete`);
    return response.data;
}
