import { CommunityPost } from '../types';

export const MOCK_COMMUNITY_POSTS: CommunityPost[] = [
    {
        id: '1',
        authorId: 'user_1',
        authorName: 'Sarah J.',
        content: 'Looking for a study partner for IELTS Speaking. I am aiming for Band 7.0! We can practice on Zoom weekends.',
        tags: ['#IELTS', '#StudyPartner'],
        likes: 12,
        comments: 4,
        timestamp: '2 hours ago',
    },
    {
        id: '2',
        authorId: 'user_2',
        authorName: 'David Chen',
        content: 'Just finished the "Job Interview" scenario. It was super hard! The AI asked me about my weaknesses and I froze. 😂',
        tags: ['#Roleplay', '#Progress'],
        likes: 25,
        comments: 8,
        timestamp: '5 hours ago',
    },
    {
        id: '3',
        authorId: 'user_3',
        authorName: 'Maria G.',
        content: 'My "Social Battery" is finally at 100%! I managed to practice for 30 minutes straight today.',
        tags: ['#DailyChallenge', '#Motivation'],
        likes: 45,
        comments: 12,
        timestamp: '1 day ago',
    },
];
