import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  Alert,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Leaf, 
  Droplet, 
  BookOpen, 
  Heart, 
  Shield, 
  Users,
  CheckCircle,
  TrendingUp,
  Globe,
  Zap
} from 'lucide-react-native';
import colors from '@/constants/colors';

const missions = [
  {
    id: 'reforestation',
    title: 'Reforestation Mondiale',
    shortDescription: 'Plante des arbres pour lutter contre le réchauffement climatique',
    longDescription: 'Chaque minute de ta session contribue à planter des arbres dans des zones déforestées. Nos partenaires locaux s\'occupent de la plantation et du suivi des jeunes pousses.',
    icon: Leaf,
    color: colors.missions.tree,
    gradient: ['#10B981', '#059669'],
    pointsPerMinute: 2.5,
    impact: 'arbres plantés',
    totalContributions: 125847,
    currentGoal: 150000,
    participants: 12453,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800',
    achievements: [
      { milestone: 10, reward: 'Badge Petit Planteur', unlocked: true },
      { milestone: 50, reward: 'Badge Jardinier', unlocked: true },
      { milestone: 100, reward: 'Badge Forestier', unlocked: false },
    ],
    facts: [
      'Un arbre absorbe 22kg de CO2 par an',
      'Une forêt de 100 arbres produit l\'oxygène pour 2 personnes',
      'Les forêts abritent 80% de la biodiversité terrestre'
    ]
  },
  {
    id: 'water',
    title: 'Accès à l\'Eau Potable',
    shortDescription: 'Aide à construire des puits et systèmes d\'eau dans le monde',
    longDescription: 'Tes sessions financent la construction de puits, la purification d\'eau et l\'installation de systèmes d\'accès à l\'eau potable dans les communautés qui en ont besoin.',
    icon: Droplet,
    color: colors.missions.water,
    gradient: ['#3B82F6', '#1D4ED8'],
    pointsPerMinute: 3,
    impact: 'litres d\'eau fournis',
    totalContributions: 2847293,
    currentGoal: 3000000,
    participants: 8932,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=800',
    achievements: [
      { milestone: 100, reward: 'Badge Goutte d\'Eau', unlocked: true },
      { milestone: 500, reward: 'Badge Source', unlocked: false },
      { milestone: 1000, reward: 'Badge Rivière', unlocked: false },
    ],
    facts: [
      '2.2 milliards de personnes n\'ont pas accès à l\'eau potable',
      'Une personne a besoin de 20L d\'eau par jour minimum',
      'Les maladies liées à l\'eau tuent plus que les guerres'
    ]
  },
  {
    id: 'education',
    title: 'Éducation pour Tous',
    shortDescription: 'Finance l\'éducation d\'enfants dans le monde entier',
    longDescription: 'Contribue au financement de l\'éducation d\'enfants défavorisés : fournitures scolaires, frais de scolarité, formation des enseignants et construction d\'écoles.',
    icon: BookOpen,
    color: colors.missions.education,
    gradient: ['#F59E0B', '#D97706'],
    pointsPerMinute: 4,
    impact: 'heures d\'enseignement',
    totalContributions: 45672,
    currentGoal: 60000,
    participants: 15234,
    image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?q=80&w=800',
    achievements: [
      { milestone: 50, reward: 'Badge Apprenti', unlocked: true },
      { milestone: 200, reward: 'Badge Professeur', unlocked: true },
      { milestone: 500, reward: 'Badge Sage', unlocked: false },
    ],
    facts: [
      '244 millions d\'enfants ne vont pas à l\'école',
      'L\'éducation peut réduire la pauvreté de 9%',
      'Chaque année d\'école augmente les revenus de 10%'
    ]
  },
  {
    id: 'health',
    title: 'Santé Communautaire',
    shortDescription: 'Améliore l\'accès aux soins de santé essentiels',
    longDescription: 'Aide à financer des dispensaires mobiles, des campagnes de vaccination et la formation de personnel médical dans les zones rurales et défavorisées.',
    icon: Heart,
    color: '#EF4444',
    gradient: ['#EF4444', '#DC2626'],
    pointsPerMinute: 3.5,
    impact: 'consultations médicales',
    totalContributions: 8934,
    currentGoal: 15000,
    participants: 6742,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=800',
    achievements: [
      { milestone: 25, reward: 'Badge Secouriste', unlocked: true },
      { milestone: 100, reward: 'Badge Infirmier', unlocked: false },
      { milestone: 300, reward: 'Badge Docteur', unlocked: false },
    ],
    facts: [
      '400 millions de personnes n\'ont pas accès aux soins',
      'La prévention coûte 10x moins que le traitement',
      'Un dispensaire peut servir 1000 personnes'
    ]
  },
  {
    id: 'environment',
    title: 'Protection Océanique',
    shortDescription: 'Nettoie les océans et protège la vie marine',
    longDescription: 'Participe au nettoyage des océans, à la protection des récifs coralliens et à la sensibilisation contre la pollution plastique.',
    icon: Shield,
    color: '#0EA5E9',
    gradient: ['#0EA5E9', '#0284C7'],
    pointsPerMinute: 2,
    impact: 'kg de déchets collectés',
    totalContributions: 12847,
    currentGoal: 20000,
    participants: 9156,
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=800',
    achievements: [
      { milestone: 20, reward: 'Badge Plongeur', unlocked: true },
      { milestone: 100, reward: 'Badge Gardien des Mers', unlocked: false },
      { milestone: 250, reward: 'Badge Protecteur Océan', unlocked: false },
    ],
    facts: [
      '8 millions de tonnes de plastique dans l\'océan/an',
      'Les microplastiques sont dans 83% de l\'eau du robinet',
      '1 million d\'oiseaux marins meurent du plastique/an'
    ]
  },
  {
    id: 'energy',
    title: 'Énergie Renouvelable',
    shortDescription: 'Développe l\'accès à l\'énergie verte dans le monde',
    longDescription: 'Contribue à l\'installation de panneaux solaires, d\'éoliennes et de systèmes d\'énergie propre dans les communautés isolées.',
    icon: Zap,
    color: '#8B5CF6',
    gradient: ['#8B5CF6', '#7C3AED'],
    pointsPerMinute: 1.5,
    impact: 'kWh d\'énergie verte',
    totalContributions: 567234,
    currentGoal: 750000,
    participants: 7823,
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800',
    achievements: [
      { milestone: 100, reward: 'Badge Éclair', unlocked: true },
      { milestone: 500, reward: 'Badge Générateur', unlocked: false },
      { milestone: 1000, reward: 'Badge Central Solaire', unlocked: false },
    ],
    facts: [
      '1.1 milliard de personnes sans électricité',
      'Le solaire est l\'énergie la moins chère au monde',
      'L\'énergie renouvelable crée 3x plus d\'emplois'
    ]
  }
];

// Types
interface Mission {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  icon: any;
  color: string;
  gradient: string[];
  pointsPerMinute: number;
  impact: string;
  totalContributions: number;
  currentGoal: number;
  participants: number;
  image: string;
  achievements: Achievement[];
  facts: string[];
}

interface Achievement {
  milestone: number;
  reward: string;
  unlocked: boolean;
}

export default function MissionsScreen() {
  const [selectedMission, setSelectedMission] = useState<Mission>(missions[0]);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const fadeAnim = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleMissionSelect = (mission: Mission) => {
    if (selectedMission.id !== mission.id) {
      setSelectedMission(mission);
      Alert.alert(
        'Mission Activée ! 🎯',
        `Tu contribues maintenant à "${mission.title}". Chaque minute de session vaut ${mission.pointsPerMinute} points !`,
        [{ text: 'Parfait !', style: 'default' }]
      );
    }
  };

  const progressPercentage = (selectedMission.totalContributions / selectedMission.currentGoal) * 100;

  const MissionCard = ({ mission, isSelected }: { mission: Mission; isSelected: boolean }) => {
    const IconComponent = mission.icon;
    const isExpanded = expandedCard === mission.id;
    
    return (
      <TouchableOpacity
        style={[
          styles.missionCard,
          isSelected && styles.selectedMissionCard,
        ]}
        onPress={() => handleMissionSelect(mission)}
        onLongPress={() => setExpandedCard(isExpanded ? null : mission.id)}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={isSelected ? mission.gradient : ['rgba(255,255,255,0.8)', 'rgba(255,255,255,1)']}
          style={styles.missionCardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Header */}
          <View style={styles.missionHeader}>
            <View style={[
              styles.missionIcon, 
              { backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : mission.color }
            ]}>
              <IconComponent 
                size={24} 
                color={isSelected ? 'white' : 'white'} 
              />
            </View>
            <View style={styles.missionInfo}>
              <Text style={[
                styles.missionTitle,
                { color: isSelected ? 'white' : colors.text }
              ]}>
                {mission.title}
              </Text>
              <Text style={[
                styles.missionDescription,
                { color: isSelected ? 'rgba(255,255,255,0.9)' : colors.textSecondary }
              ]}>
                {mission.shortDescription}
              </Text>
            </View>
            {isSelected && (
              <CheckCircle size={24} color="white" />
            )}
          </View>

          {/* Stats */}
          <View style={styles.missionStats}>
            <View style={styles.statItem}>
              <Text style={[
                styles.statValue,
                { color: isSelected ? 'white' : mission.color }
              ]}>
                {mission.pointsPerMinute}
              </Text>
              <Text style={[
                styles.statLabel,
                { color: isSelected ? 'rgba(255,255,255,0.8)' : colors.textLight }
              ]}>
                pts/min
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[
                styles.statValue,
                { color: isSelected ? 'white' : mission.color }
              ]}>
                {mission.participants.toLocaleString()}
              </Text>
              <Text style={[
                styles.statLabel,
                { color: isSelected ? 'rgba(255,255,255,0.8)' : colors.textLight }
              ]}>
                participants
              </Text>
            </View>
          </View>

          {/* Progress */}
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={[
                styles.progressLabel,
                { color: isSelected ? 'rgba(255,255,255,0.9)' : colors.textSecondary }
              ]}>
                Objectif: {mission.currentGoal.toLocaleString()} {mission.impact}
              </Text>
              <Text style={[
                styles.progressPercent,
                { color: isSelected ? 'white' : mission.color }
              ]}>
                {Math.round(progressPercentage)}%
              </Text>
            </View>
            <View style={[
              styles.progressBar,
              { backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : colors.border }
            ]}>
              <View 
                style={[
                  styles.progressFill,
                  { 
                    width: `${Math.min(progressPercentage, 100)}%`,
                    backgroundColor: isSelected ? 'white' : mission.color
                  }
                ]} 
              />
            </View>
          </View>

          {/* Expanded content */}
          {isExpanded && (
            <View style={styles.expandedContent}>
              <Text style={[
                styles.expandedDescription,
                { color: isSelected ? 'rgba(255,255,255,0.9)' : colors.text }
              ]}>
                {mission.longDescription}
              </Text>
              
              <View style={styles.achievementsContainer}>
                <Text style={[
                  styles.achievementsTitle,
                  { color: isSelected ? 'white' : colors.text }
                ]}>
                  Tes badges
                </Text>
                <View style={styles.achievementsList}>
                  {mission.achievements.map((achievement: Achievement, index: number) => (
                    <View key={index} style={styles.achievementItem}>
                      <View style={[
                        styles.achievementBadge,
                        { 
                          backgroundColor: achievement.unlocked 
                            ? (isSelected ? 'rgba(255,255,255,0.2)' : mission.color)
                            : colors.border
                        }
                      ]}>
                        <Text style={[
                          styles.achievementNumber,
                          { 
                            color: achievement.unlocked 
                              ? 'white' 
                              : colors.textLight
                          }
                        ]}>
                          {achievement.milestone}
                        </Text>
                      </View>
                      <Text style={[
                        styles.achievementText,
                        { 
                          color: isSelected ? 'rgba(255,255,255,0.8)' : colors.textSecondary,
                          opacity: achievement.unlocked ? 1 : 0.6
                        }
                      ]}>
                        {achievement.reward}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  };
    
    return (
      <TouchableOpacity
        style={[
          styles.missionCard,
          isSelected && styles.selectedMissionCard,
        ]}
        onPress={() => handleMissionSelect(mission)}
        onLongPress={() => setExpandedCard(isExpanded ? null : mission.id)}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={isSelected ? mission.gradient : ['rgba(255,255,255,0.8)', 'rgba(255,255,255,1)']}
          style={styles.missionCardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Header */}
          <View style={styles.missionHeader}>
            <View style={[
              styles.missionIcon, 
              { backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : mission.color }
            ]}>
              <IconComponent 
                size={24} 
                color={isSelected ? 'white' : 'white'} 
              />
            </View>
            <View style={styles.missionInfo}>
              <Text style={[
                styles.missionTitle,
                { color: isSelected ? 'white' : colors.text }
              ]}>
                {mission.title}
              </Text>
              <Text style={[
                styles.missionDescription,
                { color: isSelected ? 'rgba(255,255,255,0.9)' : colors.textSecondary }
              ]}>
                {mission.shortDescription}
              </Text>
            </View>
            {isSelected && (
              <CheckCircle size={24} color="white" />
            )}
          </View>

          {/* Stats */}
          <View style={styles.missionStats}>
            <View style={styles.statItem}>
              <Text style={[
                styles.statValue,
                { color: isSelected ? 'white' : mission.color }
              ]}>
                {mission.pointsPerMinute}
              </Text>
              <Text style={[
                styles.statLabel,
                { color: isSelected ? 'rgba(255,255,255,0.8)' : colors.textLight }
              ]}>
                pts/min
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[
                styles.statValue,
                { color: isSelected ? 'white' : mission.color }
              ]}>
                {mission.participants.toLocaleString()}
              </Text>
              <Text style={[
                styles.statLabel,
                { color: isSelected ? 'rgba(255,255,255,0.8)' : colors.textLight }
              ]}>
                participants
              </Text>
            </View>
          </View>

          {/* Progress */}
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={[
                styles.progressLabel,
                { color: isSelected ? 'rgba(255,255,255,0.9)' : colors.textSecondary }
              ]}>
                Objectif: {mission.currentGoal.toLocaleString()} {mission.impact}
              </Text>
              <Text style={[
                styles.progressPercent,
                { color: isSelected ? 'white' : mission.color }
              ]}>
                {Math.round(progressPercentage)}%
              </Text>
            </View>
            <View style={[
              styles.progressBar,
              { backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : colors.border }
            ]}>
              <View 
                style={[
                  styles.progressFill,
                  { 
                    width: `${Math.min(progressPercentage, 100)}%`,
                    backgroundColor: isSelected ? 'white' : mission.color
                  }
                ]} 
              />
            </View>
          </View>

          {/* Expanded content */}
          {isExpanded && (
            <View style={styles.expandedContent}>
              <Text style={[
                styles.expandedDescription,
                { color: isSelected ? 'rgba(255,255,255,0.9)' : colors.text }
              ]}>
                {mission.longDescription}
              </Text>
              
              <View style={styles.achievementsContainer}>
                <Text style={[
                  styles.achievementsTitle,
                  { color: isSelected ? 'white' : colors.text }
                ]}>
                  Tes badges
                </Text>
                <View style={styles.achievementsList}>
                  {mission.achievements.map((achievement, index) => (
                    <View key={index} style={styles.achievementItem}>
                      <View style={[
                        styles.achievementBadge,
                        { 
                          backgroundColor: achievement.unlocked 
                            ? (isSelected ? 'rgba(255,255,255,0.2)' : mission.color)
                            : colors.border
                        }
                      ]}>
                        <Text style={[
                          styles.achievementNumber,
                          { 
                            color: achievement.unlocked 
                              ? 'white' 
                              : colors.textLight
                          }
                        ]}>
                          {achievement.milestone}
                        </Text>
                      </View>
                      <Text style={[
                        styles.achievementText,
                        { 
                          color: isSelected ? 'rgba(255,255,255,0.8)' : colors.textSecondary,
                          opacity: achievement.unlocked ? 1 : 0.6
                        }
                      ]}>
                        {achievement.reward}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Missions</Text>
        <TouchableOpacity 
          style={styles.detailsButton}
          onPress={() => setShowDetails(!showDetails)}
        >
          <Text style={styles.detailsButtonText}>
            {showDetails ? 'Masquer' : 'Détails'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Mission active highlight */}
        <Animated.View style={[styles.activeMissionSection, { opacity: fadeAnim }]}>
          <Text style={styles.sectionTitle}>Mission Active</Text>
          <View style={styles.activeMissionHighlight}>
            <Image 
              source={{ uri: selectedMission.image }}
              style={styles.activeMissionImage}
              contentFit="cover"
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.7)']}
              style={styles.activeMissionOverlay}
            />
            <View style={styles.activeMissionContent}>
              <Text style={styles.activeMissionTitle}>{selectedMission.title}</Text>
              <Text style={styles.activeMissionImpact}>
                {selectedMission.totalContributions.toLocaleString()} {selectedMission.impact} financés
              </Text>
              <View style={styles.activeMissionProgress}>
                <View style={styles.progressBarActive}>
                  <View 
                    style={[
                      styles.progressFillActive,
                      { width: `${Math.min(progressPercentage, 100)}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.progressTextActive}>
                  {Math.round(progressPercentage)}% de l'objectif atteint
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Facts section */}
        {showDetails && (
          <View style={styles.factsSection}>
            <Text style={styles.sectionTitle}>Le savais-tu ? 🤔</Text>
            <View style={styles.factsList}>
              {selectedMission.facts.map((fact, index) => (
                <View key={index} style={styles.factItem}>
                  <View style={[styles.factBullet, { backgroundColor: selectedMission.color }]} />
                  <Text style={styles.factText}>{fact}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* All missions */}
        <View style={styles.missionsSection}>
          <Text style={styles.sectionTitle}>Toutes les Missions</Text>
          <Text style={styles.sectionSubtitle}>
            Choisis la cause qui te tient à cœur. Appuie longuement pour plus de détails.
          </Text>
          
          <View style={styles.missionsList}>
            {missions.map((mission) => (
              <MissionCard
                key={mission.id}
                mission={mission}
                isSelected={selectedMission.id === mission.id}
              />
            ))}
          </View>
        </View>

        {/* Global impact */}
        <View style={styles.globalImpactSection}>
          <Text style={styles.sectionTitle}>Impact Global 🌍</Text>
          <View style={styles.globalStats}>
            <View style={styles.globalStatCard}>
              <Users size={32} color={colors.primary} />
              <Text style={styles.globalStatValue}>
                {missions.reduce((acc, m) => acc + m.participants, 0).toLocaleString()}
              </Text>
              <Text style={styles.globalStatLabel}>Contributeurs actifs</Text>
            </View>
            <View style={styles.globalStatCard}>
              <Globe size={32} color={colors.secondary} />
              <Text style={styles.globalStatValue}>42</Text>
              <Text style={styles.globalStatLabel}>Pays touchés</Text>
            </View>
            <View style={styles.globalStatCard}>
              <TrendingUp size={32} color={colors.accent} />
              <Text style={styles.globalStatValue}>€2.4M</Text>
              <Text style={styles.globalStatLabel}>Fonds collectés</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  detailsButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.primary,
    borderRadius: 12,
  },
  detailsButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 20,
    lineHeight: 22,
  },
  activeMissionSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  activeMissionHighlight: {
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  activeMissionImage: {
    width: '100%',
    height: '100%',
  },
  activeMissionOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
  },
  activeMissionContent: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  activeMissionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  activeMissionImpact: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 12,
  },
  activeMissionProgress: {
    gap: 8,
  },
  progressBarActive: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFillActive: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 3,
  },
  progressTextActive: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
  },
  factsSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  factsList: {
    gap: 16,
  },
  factItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  factBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  factText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  missionsSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  missionsList: {
    gap: 16,
  },
  missionCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
  },
  selectedMissionCard: {
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  missionCardGradient: {
    padding: 20,
  },
  missionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  missionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  missionInfo: {
    flex: 1,
  },
  missionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  missionDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  missionStats: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  progressContainer: {
    gap: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  expandedContent: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  expandedDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  achievementsContainer: {
    gap: 12,
  },
  achievementsTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  achievementsList: {
    gap: 12,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  achievementBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementNumber: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  achievementText: {
    fontSize: 14,
    fontWeight: '500',
  },
  globalImpactSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  globalStats: {
    flexDirection: 'row',
    gap: 12,
  },
  globalStatCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  globalStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginVertical: 8,
  },
  globalStatLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
});