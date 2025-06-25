export interface Mission {
  id: string;
  title: string;
  description: string;
  image: string;
  color: string;
  pointsPerMinute: number;
  current: number;
  target: number;
  unit: string;
  category: 'environment' | 'social' | 'education';
}

export const missions: Mission[] = [
  {
    id: 'reforestation',
    title: 'Reforestation Mondiale',
    description: 'Aide à planter des arbres pour lutter contre le changement climatique et restaurer les écosystèmes forestiers.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800',
    color: '#10B981',
    pointsPerMinute: 2,
    current: 12847,
    target: 50000,
    unit: 'arbres plantés',
    category: 'environment',
  },
  {
    id: 'ocean-cleanup',
    title: 'Nettoyage des Océans',
    description: 'Contribue au nettoyage des océans et à la protection de la vie marine en finançant des projets de dépollution.',
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=800',
    color: '#3B82F6',
    pointsPerMinute: 1.5,
    current: 8932,
    target: 25000,
    unit: 'kg de déchets collectés',
    category: 'environment',
  },
  {
    id: 'clean-water',
    title: 'Accès à l\'Eau Potable',
    description: 'Finance la construction de puits et systèmes d\'assainissement dans les communautés qui en ont besoin.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=800',
    color: '#06B6D4',
    pointsPerMinute: 2.5,
    current: 156432,
    target: 500000,
    unit: 'litres d\'eau fournis',
    category: 'social',
  },
  {
    id: 'education',
    title: 'Éducation pour Tous',
    description: 'Soutient l\'éducation d\'enfants défavorisés en finançant fournitures scolaires et frais de scolarité.',
    image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?q=80&w=800',
    color: '#F59E0B',
    pointsPerMinute: 3,
    current: 2847,
    target: 10000,
    unit: 'heures d\'enseignement',
    category: 'education',
  },
  {
    id: 'renewable-energy',
    title: 'Énergie Renouvelable',
    description: 'Contribue au développement de l\'énergie solaire et éolienne dans les communautés isolées.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800',
    color: '#8B5CF6',
    pointsPerMinute: 1.8,
    current: 45672,
    target: 100000,
    unit: 'kWh d\'énergie verte',
    category: 'environment',
  },
  {
    id: 'food-security',
    title: 'Sécurité Alimentaire',
    description: 'Aide à nourrir les familles dans le besoin et soutient l\'agriculture durable locale.',
    image: 'https://images.unsplash.com/photo-1594736797933-d0200ba70f88?q=80&w=800',
    color: '#EF4444',
    pointsPerMinute: 2.2,
    current: 18934,
    target: 75000,
    unit: 'repas fournis',
    category: 'social',
  },
];