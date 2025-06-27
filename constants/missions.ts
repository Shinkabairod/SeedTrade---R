export interface Mission {
  id: string;
  title: string;
  description: string;
  image: string;
  pointsPerMinute: number;
  unit: string;
  color: string;
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
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    pointsPerMinute: 10,
    unit: 'arbres',
    color: '#10B981',
    impact: {
      title: 'Arbres plantés',
      description: 'Chaque minute de méditation contribue à planter des arbres réels'
    }
  },
  {
    id: 'ocean',
    title: 'Protection océanique',
    description: 'Contribue au nettoyage des océans et à la protection marine',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    pointsPerMinute: 8,
    unit: 'kg nettoyés',
    color: '#3B82F6',
    impact: {
      title: 'Océan nettoyé',
      description: 'Tes sessions financent le retrait de déchets plastiques'
    }
  },
  {
    id: 'recycling',
    title: 'Recyclage',
    description: 'Soutiens les programmes de recyclage et économie circulaire',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    pointsPerMinute: 12,
    unit: 'kg recyclés',
    color: '#8B5CF6',
    impact: {
      title: 'Matériaux recyclés',
      description: 'Favorise la transformation de déchets en ressources'
    }
  },
  {
    id: 'education',
    title: 'Éducation',
    description: 'Finance l\'accès à l\'éducation dans les communautés défavorisées',
    image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    pointsPerMinute: 15,
    unit: 'heures cours',
    color: '#F59E0B',
    impact: {
      title: 'Heures d\'enseignement',
      description: 'Offre des opportunités éducatives aux enfants'
    }
  },
  {
    id: 'clean_water',
    title: 'Eau potable',
    description: 'Améliore l\'accès à l\'eau potable dans les régions en besoin',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    pointsPerMinute: 6,
    unit: 'litres',
    color: '#06B6D4',
    impact: {
      title: 'Eau purifiée',
      description: 'Fournit de l\'eau propre aux communautés'
    }
  },
  {
    id: 'renewable_energy',
    title: 'Énergie renouvelable',
    description: 'Soutiens le développement d\'énergies propres et durables',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    pointsPerMinute: 9,
    unit: 'kWh verts',
    color: '#84CC16',
    impact: {
      title: 'Énergie verte',
      description: 'Contribue à la transition énergétique'
    }
  }
];