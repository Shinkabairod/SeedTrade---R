export interface Mission {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  color: string;
  pointsPerMinute: number;
  impactUnit: string;
  category: 'environmental' | 'social' | 'educational';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedImpact: string;
}

export const missions: Mission[] = [
  {
    id: 'reforestation',
    title: 'Reforestation',
    description: 'Contribue à la plantation d\'arbres',
    longDescription: 'Chaque minute de calme finance la plantation d\'arbres dans des zones déforestées. Ton temps se transforme directement en oxygène et biodiversité.',
    icon: '🌳',
    color: '#10B981',
    pointsPerMinute: 2,
    impactUnit: 'arbres plantés',
    category: 'environmental',
    difficulty: 'easy',
    estimatedImpact: '1 arbre par 5 minutes'
  },
  {
    id: 'ocean',
    title: 'Nettoyage des océans',
    description: 'Aide au nettoyage des océans',
    longDescription: 'Ton temps de déconnexion finance le retrait de déchets plastiques des océans. Chaque minute compte pour sauver la vie marine.',
    icon: '🌊',
    color: '#3B82F6',
    pointsPerMinute: 3,
    impactUnit: 'kg de déchets retirés',
    category: 'environmental',
    difficulty: 'medium',
    estimatedImpact: '1kg de plastique par 10 minutes'
  },
  {
    id: 'recycling',
    title: 'Recyclage',
    description: 'Soutiens le recyclage de matériaux',
    longDescription: 'Ton calme finance des programmes de recyclage innovants qui transforment les déchets en ressources utiles.',
    icon: '♻️',
    color: '#8B5CF6',
    pointsPerMinute: 2.5,
    impactUnit: 'kg recyclés',
    category: 'environmental',
    difficulty: 'easy',
    estimatedImpact: '2kg recyclés par 10 minutes'
  },
  {
    id: 'education',
    title: 'Éducation',
    description: 'Finance l\'éducation dans les pays en développement',
    longDescription: 'Chaque minute de ton temps permet de financer l\'accès à l\'éducation pour des enfants dans le besoin.',
    icon: '📚',
    color: '#F59E0B',
    pointsPerMinute: 4,
    impactUnit: 'heures d\'école financées',
    category: 'social',
    difficulty: 'medium',
    estimatedImpact: '1h d\'école par 15 minutes'
  },
  {
    id: 'clean_water',
    title: 'Eau potable',
    description: 'Améliore l\'accès à l\'eau potable',
    longDescription: 'Ton temps de calme contribue à l\'installation de puits et systèmes de purification d\'eau dans les communautés qui en ont besoin.',
    icon: '💧',
    color: '#06B6D4',
    pointsPerMinute: 3.5,
    impactUnit: 'litres d\'eau purifiée',
    category: 'social',
    difficulty: 'hard',
    estimatedImpact: '50L d\'eau pure par 10 minutes'
  }
];