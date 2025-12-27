import React from 'react';

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link?: string;
}

export interface Service {
  title: string;
  price: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum SkillLevel {
  Expert = 'Expert',
  Advanced = 'Advanced',
  Intermediate = 'Intermediate'
}

export interface Skill {
  name: string;
  level: SkillLevel;
  icon?: React.ReactNode;
}
