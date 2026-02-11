import { NewsItem } from '../types';

export const MOCK_NEWS_FEED: NewsItem[] = [
    {
        id: '1',
        title: 'Global Climate Summit Reaches New Agreement',
        summary: 'World leaders have agreed to a new set of goals to reduce carbon emissions by 2030. Listen to the key takeaways.',
        source: 'BBC Learning English',
        imageUrl: 'https://images.unsplash.com/photo-1569163139599-0f4517e36b51?w=800&q=80',
        audioUrl: 'mock_audio_1.mp3',
        level: 'Intermediate',
        date: '2024-05-20',
    },
    {
        id: '2',
        title: 'Technology Trends for 2025',
        summary: 'AI is changing how we work and live. Here is a look at the top 5 tech trends you need to know about.',
        source: 'Tech Daily',
        imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
        audioUrl: 'mock_audio_2.mp3',
        level: 'Advanced',
        date: '2024-05-19',
    },
    {
        id: '3',
        title: 'The History of Coffee',
        summary: 'Do you love coffee? Learn about the origins of your favorite morning drink in this easy-to-follow episode.',
        source: 'VOA Special English',
        imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
        audioUrl: 'mock_audio_3.mp3',
        level: 'Beginner',
        date: '2024-05-18',
    },
];
