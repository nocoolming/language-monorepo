import { Scenario } from '../types';

export const MOCK_SCENARIOS: Scenario[] = [
    {
        id: '1',
        title: 'Ordering Coffee',
        description: 'You are at a busy cafe. Order a latte and a muffin. Don\'t hold up the line!',
        difficulty: 'Easy',
        category: 'Survival',
        initialMessage: 'Hi there! What can I get started for you today?',
        imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80',
    },
    {
        id: '2',
        title: 'Checking into a Hotel',
        description: 'You have a reservation but there is a problem with your booking.',
        difficulty: 'Medium',
        category: 'Travel',
        initialMessage: 'Welcome to the Grand Hotel. Do you have a reservation number?',
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    },
    {
        id: '3',
        title: 'Job Interview',
        description: 'Answer common interview questions for a marketing position.',
        difficulty: 'Hard',
        category: 'Work',
        initialMessage: 'Tell me a little bit about yourself and why you want this job.',
        imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
    },
    {
        id: '4',
        title: 'Declining an Invitation',
        description: 'Your friend wants to go to a loud party, but you want to stay home.',
        difficulty: 'Medium',
        category: 'Social',
        initialMessage: 'Hey! We are all going to the club tonight. You\'re coming, right?',
        imageUrl: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=800&q=80',
    },
];
