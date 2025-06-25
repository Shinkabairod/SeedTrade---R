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
    title: "Plant Trees",
    description: "Help reforest areas affected by deforestation. Each tree absorbs CO2 and provides habitat for wildlife.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    target: 1000,
    current: 423,
    pointsPerMinute: 0.05,
    unit: "trees",
  },
  {
    id: "water",
    title: "Clean Water Access",
    description: "Provide clean drinking water to communities in need. Access to clean water improves health and quality of life.",
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    target: 500,
    current: 187,
    pointsPerMinute: 0.1,
    unit: "liters",
  },
  {
    id: "education",
    title: "School Supplies",
    description: "Provide educational materials to children in underserved communities. Education is the key to a better future.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1422&q=80",
    target: 200,
    current: 89,
    pointsPerMinute: 0.02,
    unit: "kits",
  },
];