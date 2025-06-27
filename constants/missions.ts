import { TreePine, Waves, Recycle } from 'lucide-react-native';

export interface Mission {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  icon: any;
  color: string;
  unit: string;
  pointsPerMinute: number;
  category: 'environment' | 'social' | 'education';
  impactDescription: string;
}

export const missions: Mission[] = [
  {
    id: 'reforestation',
    title: 'Reforestation',
    description: 'Plante des arbres virtuellement',
    detailedDescription: 'Contribue à la reforestation mondiale en plantant des arbres virtuels. Chaque minute de concentration se transforme en arbres plantés dans des projets réels de reforestation.',
    icon: TreePine,
    color: '#22c55e',
    unit: 'arbres',
    pointsPerMinute: 10,
    category: 'environment',
    impactDescription: 'Tes sessions contribuent à des projets de reforestation réels. Chaque arbre planté aide à lutter contre le changement climatique et préserve la biodiversité.',
  },
  {
    id: 'ocean',
    title: 'Océans propres',
    description: 'Nettoie les océans des déchets plastiques',
    detailedDescription: 'Aide à nettoyer les océans en retirant les déchets plastiques. Ton temps de méditation se convertit en kilos de déchets retirés des océans.',
    icon: Waves,
    color: '#3b82f6',
    unit: 'kg déchets',
    pointsPerMinute: 8,
    category: 'environment',
    impactDescription: 'Chaque minute contribue au nettoyage des océans. Les déchets plastiques sont une menace majeure pour la vie marine et les écosystèmes.',
  },
  {
    id: 'recycling',
    title: 'Recyclage',
    description: 'Recycle des matériaux pour l\'économie circulaire',
    detailedDescription: 'Participe à l\'économie circulaire en recyclant des matériaux. Tes sessions de concentration permettent de recycler plus de matériaux et réduire les déchets.',
    icon: Recycle,
    color: '#8b5cf6',
    unit: 'kg recyclés',
    pointsPerMinute: 12,
    category: 'environment',
    impactDescription: 'Le recyclage est essentiel pour réduire notre empreinte environnementale. Chaque kilo recyclé économise des ressources naturelles.',
  },
];