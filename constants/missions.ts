export type Mission = {
  id: string;
  title: string;
  description: string;
  image: string;
  target: number;
  current: number;
  pointsPerMinute: number;
  unit: string;
};

export const missions: Mission[] = [
  {
    id: "trees",
    title: "Planter des arbres",
    description: "Aide à reboiser les zones touchées par la déforestation. Chaque arbre absorbe du CO2 et fournit un habitat pour la faune.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    target: 1000,
    current: 423,
    pointsPerMinute: 0.05,
    unit: "arbres",
  },
  {
    id: "water",
    title: "Accès à l'eau potable",
    description: "Fournis de l'eau potable aux communautés dans le besoin. L'accès à l'eau propre améliore la santé et la qualité de vie.",
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    target: 500,
    current: 187,
    pointsPerMinute: 0.1,
    unit: "litres",
  },
  {
    id: "education",
    title: "Fournitures scolaires",
    description: "Fournis du matériel éducatif aux enfants des communautés défavorisées. L'éducation est la clé d'un avenir meilleur.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1422&q=80",
    target: 200,
    current: 89,
    pointsPerMinute: 0.02,
    unit: "kits",
  },
];