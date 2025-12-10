export enum UserRole {
  TRAVELER = 'TRAVELER',
  SENDER = 'SENDER'
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  verified: boolean;
}

export interface Trip {
  id: string;
  traveler: User;
  origin: string;
  destination: string;
  date: string;
  kilosAvailable: number;
  pricePerKg: number;
  transportType: 'Plane' | 'Train' | 'Car';
}

export interface Package {
  id: string;
  sender: User;
  origin: string;
  destination: string;
  weight: number;
  description: string;
  deadline: string;
  reward: number;
  status: 'Open' | 'In Transit' | 'Delivered';
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  metaTitle: string;
  metaDescription: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}