import { TreePine, Waves, Recycle, Heart, Globe, Lightbulb } from 'lucide-react-native';

export interface Mission {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  icon: any;
  color: string;
  pointsPerMinute: number;
  unit: string;
  impactDescription: string;
  category: 'environment' | 'social' | 'education';
}

export const missions: Mission[] = [
  {
    id: 'reforestation',
    title: 'Reforestation',
    description: 'Chaque minute = 1 arbre planté',
    detailedDescription: 'Contribuez à la reforestation mondiale. Votre temps de déconnexion finance la plantation d\'arbres dans des zones déforestées.',
    icon: TreePine,
    color: '#2E7D32',
    pointsPerMinute: 10,
    unit: 'arbres plantés',
    impactDescription: 'Votre session permet de planter des arbres qui absorberont du CO2 pendant des décennies.',
    category: 'environment',
  },
  {
    id: 'ocean',
    title: 'Nettoyage océan',
    description: 'Chaque minute = 50g déchets retirés',
    detailedDescription: 'Aidez à nettoyer nos océans. Votre temps finance l\'extraction de déchets plastiques des océans.',
    icon: Waves,
    color: '#1976D2',
    pointsPerMinute: 8,
    unit: 'kg déchets retirés',
    impactDescription: 'Votre session contribue à retirer des déchets plastiques qui menacent la vie marine.',
    category: 'environment',
  },
  {
    id: 'recycling',
    title: 'Recyclage',
    description: 'Chaque minute = matériaux recyclés',
    detailedDescription: 'Soutenez les programmes de recyclage locaux et la transformation de déchets en ressources utiles.',
    icon: Recycle,
    color: '#388E3C',
    pointsPerMinute: 12,
    unit: 'kg matériaux recyclés',
    impactDescription: 'Votre session finance le recyclage de matériaux qui retrouvent une seconde vie.',
    category: 'environment',
  },
  {
    id: 'education',
    title: 'Éducation',
    description: 'Chaque minute = 1 heure d\'école financée',
    detailedDescription: 'Financez l\'éducation d\'enfants dans des régions défavorisées du monde.',
    icon: Lightbulb,
    color: '#F57C00',
    pointsPerMinute: 15,
    unit: 'heures d\'école financées',
    impactDescription: 'Votre session offre des opportunités d\'éducation à des enfants dans le besoin.',
    category: 'education',
  },
  {
    id: 'health',
    title: 'Santé communautaire',
    description: 'Chaque minute = soins de santé',
    detailedDescription: 'Financez des soins de santé de base dans des communautés sans accès médical.',
    icon: Heart,
    color: '#C62828',
    pointsPerMinute: 18,
    unit: 'soins financés',
    impactDescription: 'Votre session permet d\'apporter des soins médicaux essentiels.',
    category: 'social',
  },
  {
    id: 'water',
    title: 'Eau potable',
    description: 'Chaque minute = 10L eau potable',
    detailedDescription: 'Financez l\'accès à l\'eau potable dans des régions où elle fait défaut.',
    icon: Globe,
    color: '#0277BD',
    pointsPerMinute: 14,
    unit: 'litres d\'eau potable',
    impactDescription: 'Votre session fournit de l\'eau potable à des familles dans le besoin.',
    category: 'social',
  },
];

export const getMissionById = (id: string): Mission | undefined => {
  return missions.find(mission => mission.id === id);
};

export const getMissionsByCategory = (category: Mission['category']): Mission[] => {
  return missions.filter(mission => mission.category === category);
};