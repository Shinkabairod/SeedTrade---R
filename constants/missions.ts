import { TreePine, Waves, Recycle, BookOpen, Users } from 'lucide-react-native';

export interface Mission {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  impactDescription: string;
  icon: any;
  color: string;
  category: 'environment' | 'social' | 'education';
  pointsPerMinute: number;
  unit: string;
  image: string;
}

export const missions: Mission[] = [
  {
    id: 'reforestation',
    title: 'Reforestation',
    description: 'Plante des arbres virtuellement',
    detailedDescription: 'Chaque minute de méditation contribue à la plantation d\'arbres réels dans des zones déforestées. Ton calme aide à restaurer les forêts du monde entier.',
    impactDescription: 'Tes sessions financent la plantation d\'arbres réels via nos partenaires environnementaux.',
    icon: TreePine,
    color: '#22c55e',
    category: 'environment',
    pointsPerMinute: 10,
    unit: 'arbres plantés',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
  },
  {
    id: 'ocean',
    title: 'Océans propres',
    description: 'Nettoie les océans',
    detailedDescription: 'Tes moments de tranquillité contribuent au nettoyage des océans. Chaque session aide à financer la collecte de déchets plastiques.',
    impactDescription: 'Ton temps de méditation finance directement des opérations de nettoyage océanique.',
    icon: Waves,
    color: '#3b82f6',
    category: 'environment',
    pointsPerMinute: 8,
    unit: 'kg de déchets',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
  },
  {
    id: 'recycling',
    title: 'Recyclage',
    description: 'Recycle des matériaux',
    detailedDescription: 'Transforme ton temps de calme en actions de recyclage. Tes sessions financent des programmes de recyclage innovants.',
    impactDescription: 'Chaque minute contribue au financement de centres de recyclage et d\'initiatives zéro déchet.',
    icon: Recycle,
    color: '#8b5cf6',
    category: 'environment',
    pointsPerMinute: 12,
    unit: 'kg recyclés',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=600&fit=crop',
  },
  {
    id: 'education',
    title: 'Éducation',
    description: 'Soutiens l\'éducation',
    detailedDescription: 'Ton temps de méditation aide à financer l\'éducation dans les régions défavorisées. Chaque session contribue à l\'accès à l\'éducation.',
    impactDescription: 'Tes sessions financent des programmes éducatifs et l\'accès aux ressources pédagogiques.',
    icon: BookOpen,
    color: '#f59e0b',
    category: 'education',
    pointsPerMinute: 9,
    unit: 'heures d\'éducation',
    image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=600&fit=crop',
  },
  {
    id: 'community',
    title: 'Aide communautaire',
    description: 'Aide les communautés',
    detailedDescription: 'Tes moments de paix contribuent à des projets communautaires locaux. Chaque session aide à financer des initiatives sociales.',
    impactDescription: 'Ton temps de méditation soutient des projets communautaires et des initiatives d\'entraide.',
    icon: Users,
    color: '#ec4899',
    category: 'social',
    pointsPerMinute: 11,
    unit: 'projets soutenus',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop',
  },
];