export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  target?: number;
  category: 'session' | 'impact' | 'streak' | 'time';
}

export const defaultAchievements: Achievement[] = [
  {
    id: 1,
    title: 'Premier pas',
    description: 'Première session terminée',
    icon: '🎯',
    unlocked: false,
    category: 'session'
  },
  {
    id: 2,
    title: 'Persévérant',
    description: '7 jours de suite',
    icon: '🔥',
    unlocked: false,
    progress: 0,
    target: 7,
    category: 'streak'
  },
  {
    id: 3,
    title: 'Eco-warrior',
    description: '50 arbres plantés',
    icon: '🌳',
    unlocked: false,
    progress: 0,
    target: 50,
    category: 'impact'
  },
  {
    id: 4,
    title: 'Maître zen',
    description: '100 sessions terminées',
    icon: '🧘‍♂️',
    unlocked: false,
    progress: 0,
    target: 100,
    category: 'session'
  },
  {
    id: 5,
    title: 'Marathon',
    description: '60 min en une session',
    icon: '⏰',
    unlocked: false,
    progress: 0,
    target: 1,
    category: 'time'
  },
  {
    id: 6,
    title: 'Océan protégé',
    description: '100kg de déchets nettoyés',
    icon: '🌊',
    unlocked: false,
    progress: 0,
    target: 100,
    category: 'impact'
  },
  {
    id: 7,
    title: 'Débutant déterminé',
    description: '10 sessions terminées',
    icon: '💪',
    unlocked: false,
    progress: 0,
    target: 10,
    category: 'session'
  },
  {
    id: 8,
    title: 'Gardien de la planète',
    description: '1000 points gagnés',
    icon: '🌍',
    unlocked: false,
    progress: 0,
    target: 1000,
    category: 'impact'
  }
];