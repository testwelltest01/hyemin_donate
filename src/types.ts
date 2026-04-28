/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'Education' | 'Community' | 'Health' | 'Environment';
  imageUrl: string;
  targetAmount: number;
  currentAmount: number;
  backers: number;
  daysLeft: number;
  whyNeeded: string;
  statusText?: string;
}

export interface FeedItem {
  id: string;
  userName: string;
  userAvatar: string;
  action: string;
  message: string;
  timeAgo: string;
  impactImageUrl: string;
  likes: number;
  comments: number;
  isVerified: boolean;
  matchInfo?: string;
}

export interface UserStats {
  totalImpact: number;
  causesCount: number;
  streakMonths: number;
  level: number;
  badges: Array<{
    id: string;
    name: string;
    icon: string;
    color: string;
    isLocked: boolean;
  }>;
}
