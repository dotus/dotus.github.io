import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

// Blog Post types for Knowledge section
export interface BlogPost {
  id: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    initials: string;
  };
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
  coverImage?: string;
  relatedQuestId?: number;
  relatedQuestTitle?: string;
  stats?: {
    views: number;
    shares: number;
  };
}