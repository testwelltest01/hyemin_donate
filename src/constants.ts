import { Project, FeedItem, UserStats } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: '학교 없는 지역에 교실 만들기',
    description: 'Help build a safe and inspiring learning environment for children in rural areas without access to formal education.',
    category: 'Education',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
    targetAmount: 25000,
    currentAmount: 18450,
    backers: 245,
    daysLeft: 12,
    statusText: '벽 세우는 중',
    whyNeeded: 'In the rural community of Rari, the only primary school currently operates out of temporary structures that offer little protection from the elements. This project aims to construct three permanent, weather-resistant classrooms.'
  },
  {
    id: '2',
    title: '아이들을 위한 작은 도서관 만들기',
    description: 'Creating a cozy community space filled with books to spark imagination and foster a love for reading.',
    category: 'Community',
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop',
    targetAmount: 10000,
    currentAmount: 6500,
    backers: 112,
    daysLeft: 8,
    statusText: '책상 배치 중',
    whyNeeded: 'Our local neighborhood lacks a safe indoor space where children can explore literature. A small library will provide not just books, but a center for community growth and literacy.'
  },
  {
    id: '3',
    title: '사각지대 아동 식사 지원',
    description: 'Providing nutritious meals to children in vulnerable situations, ensuring they have the energy to grow.',
    category: 'Health',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
    targetAmount: 5000,
    currentAmount: 4250,
    backers: 89,
    daysLeft: 5,
    statusText: '정기 배달 중',
    whyNeeded: 'Many children in marginalized communities rely on school meals that are currently suspended. We are bridging the gap by delivering weekly nutrition packs directly to families in need.'
  }
];

export const FEED_ITEMS: FeedItem[] = [
  {
    id: 'f1',
    userName: 'Sarah J.',
    userAvatar: 'https://i.pravatar.cc/150?u=sarah',
    action: 'Supported Clean Water Initiative',
    message: 'Just chipped in to help build a new well in rural Kenya. Every drop counts! 💧',
    timeAgo: '2h ago',
    impactImageUrl: 'https://images.unsplash.com/photo-1517638851339-a711cfcf3279?q=80&w=800&auto=format&fit=crop',
    likes: 24,
    comments: 5,
    isVerified: true,
    matchInfo: '$25 matched by Corporate Partner'
  },
  {
    id: 'f2',
    userName: 'Marcus T.',
    userAvatar: 'https://i.pravatar.cc/150?u=marcus',
    action: 'Supported Local Food Bank',
    message: 'Happy to help restock the shelves for families this weekend. Small acts, big impact.',
    timeAgo: '5h ago',
    impactImageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop',
    likes: 112,
    comments: 12,
    isVerified: true
  }
];

export const MOCK_USER: UserStats = {
  totalImpact: 1240,
  causesCount: 15,
  streakMonths: 4,
  level: 12,
  badges: [
    { id: 'b1', name: 'Clean Water', icon: 'water_drop', color: 'bg-secondary-container', isLocked: false },
    { id: 'b2', name: 'Tree Planter', icon: 'forest', color: 'bg-tertiary-container', isLocked: false },
    { id: 'b3', name: 'Early Adopter', icon: 'volunteer_activism', color: 'bg-primary-fixed', isLocked: false },
    { id: 'b4', name: 'Secret Badge', icon: 'lock', color: 'bg-surface-container-high', isLocked: true }
  ]
};
