import { TreePine, Waves, Recycle, GraduationCap, Droplets, Zap } from 'lucide-react-native';

export interface Mission {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  impactDescription: string;
  image: string;
  pointsPerMinute: number;
  unit: string;
  color: string;
  category: 'environment' | 'social' | 'education';
  current: number;
  target: number;
  icon: any;
  impact: {
    title: string;
    description: string;
  };
}

export const missions: Mission[] = [
  {
    id: 'reforestation',
    title: 'Reforestation',
    description: 'Aide à planter des arbres et restaurer les forêts dégradées',
    detailedDescription: 'Contribue à la reforestation mondiale en finançant la plantation d\'arbres dans les zones dégradées. Chaque minute de méditation aide à restaurer nos écosystèmes.',
    impactDescription: 'Vos sessions financent directement la plantation d\'arbres réels dans des projets de reforestation certifiés.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    pointsPerMinute: 10,
    unit: 'arbres',
    color: '#10B981',
    category: 'environment',
    current: 1250,
    target: 5000,
    icon: TreePine,
    impact: {
      title: 'Arbres plantés',
      description: 'Chaque minute de méditation contribue à planter des arbres réels'
    }
  },
  {
    id: 'ocean',
    title: 'Protection océanique',
    description: 'Contribue au nettoyage des océans et à la protection marine',
    detailedDescription: 'Aide à nettoyer les océans en finançant des projets de collecte de déchets plastiques et de protection de la vie marine.',
    impactDescription: 'Vos sessions financent le retrait de déchets plastiques des océans et la protection des écosystèmes marins.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    pointsPerMinute: 8,
    unit: 'kg nettoyés',
    color: '#3B82F6',
    category: 'environment',
    current: 850,
    target: 2000,
    icon: Waves,
    impact: {
      title: 'Océan nettoyé',
      description: 'Tes sessions financent le retrait de déchets plastiques'
    }
  },
  {
    id: 'recycling',
    title: 'Recyclage',
    description: 'Soutiens les programmes de recyclage et économie circulaire',
    detailedDescription: 'Contribue au développement de programmes de recyclage innovants et à la promotion de l\'économie circulaire.',
    impactDescription: 'Vos sessions financent des initiatives de recyclage et de transformation de déchets en ressources.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    pointsPerMinute: 12,
    unit: 'kg recyclés',
    color: '#8B5CF6',
    category: 'environment',
    current: 650,
    target: 1500,
    icon: Recycle,
    impact: {
      title: 'Matériaux recyclés',
      description: 'Favorise la transformation de déchets en ressources'
    }
  },
  {
    id: 'education',
    title: 'Éducation',
    description: 'Finance l\'accès à l\'éducation dans les communautés défavorisées',
    detailedDescription: 'Aide à financer l\'accès à l\'éducation pour les enfants dans les communautés défavorisées à travers le monde.',
    impactDescription: 'Vos sessions financent des heures d\'enseignement et du matériel éducatif pour les enfants dans le besoin.',
    image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    pointsPerMinute: 15,
    unit: 'heures cours',
    color: '#F59E0B',
    category: 'education',
    current: 420,
    target: 1000,
    icon: GraduationCap,
    impact: {
      title: 'Heures d\'enseignement',
      description: 'Offre des opportunités éducatives aux enfants'
    }
  },
  {
    id: 'clean_water',
    title: 'Eau potable',
    description: 'Améliore l\'accès à l\'eau potable dans les régions en besoin',
    detailedDescription: 'Contribue à l\'amélioration de l\'accès à l\'eau potable dans les régions où cette ressource vitale fait défaut.',
    impactDescription: 'Vos sessions financent des projets d\'accès à l\'eau potable et de purification dans les communautés.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    pointsPerMinute: 6,
    unit: 'litres',
    color: '#06B6D4',
    category: 'social',
    current: 2100,
    target: 5000,
    icon: Droplets,
    impact: {
      title: 'Eau purifiée',
      description: 'Fournit de l\'eau propre aux communautés'
    }
  },
  {
    id: 'renewable_energy',
    title: 'Énergie renouvelable',
    description: 'Soutiens le développement d\'énergies propres et durables',
    detailedDescription: 'Aide au développement de projets d\'énergie renouvelable pour accélérer la transition énergétique.',
    impactDescription: 'Vos sessions financent des projets d\'énergie solaire, éolienne et autres sources renouvelables.',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    pointsPerMinute: 9,
    unit: 'kWh verts',
    color: '#84CC16',
    category: 'environment',
    current: 780,
    target: 2000,
    icon: Zap,
    impact: {
      title: 'Énergie verte',
      description: 'Contribue à la transition énergétique'
    }
  }
];