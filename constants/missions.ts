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
  }
];