import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  Share,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Settings, 
  Share2, 
  Award, 
  TrendingUp,
  Calendar,
  Target,
  Star,
  Leaf,
  Globe,
  Heart,
  Zap,
  Medal,
  Crown,
  ChevronRight,
  Edit3,
  Camera,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  Smartphone,
  Timer
} from 'lucide-react-native';
import colors from '@/constants/colors';

const userProfile = {
  name: 'Alex Moreau',
  username: '@alex_zen',
  email: 'alex.moreau@email.com',
  joinDate: '2024-01-15',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200',
  level: 'Eco-Master',
  levelProgress: 75, // Progression vers le niveau suivant
  nextLevel: 'Eco-Legend',
  currentMission: 'Reforestation',
  location: '🇫🇷 Paris, France',
  bio: 'Passionné de méditation et d\'écologie. Chaque minute compte pour un monde meilleur ! 🌱',
};

const userStats = {
  totalPoints: 3247,
  totalMinutes: 1847,
  totalSessions: 156,
  currentStreak: 12,
  longestStreak: 28,
  averageSession: 18, // minutes
  favoriteTime: '07:30', // Heure préférée pour méditer
  totalImpact: {
    trees: 127,
    water: 2840,
    education: 45,
    health: 23
  }
};

const achievements = [
  {
    id: 'first_session',
    title: 'Premier Pas',
    description: 'Première session terminée',
    icon: Target,
    color: colors.primary,
    unlocked: true,
    unlockedAt: '2024-01-15',
    rarity: 'common'
  },
  {
    id: 'week_streak',
    title: 'Semaine Parfaite',
    description: 'Session tous les jours pendant 7 jours',
    icon: Calendar,
    color: colors.secondary,
    unlocked: true,
    unlockedAt: '2024-02-03',
    rarity: 'common'
  },
  {
    id: 'hundred_points',
    title: 'Centurion',
    description: '100 points gagnés',
    icon: Star,
    color: colors.accent,
    unlocked: true,
    unlockedAt: '2024-02-10',
    rarity: 'uncommon'
  },
  {
    id: 'hour_session',
    title: 'Maître du Temps',
    description: 'Session de 60 minutes',
    icon: Timer,
    color: '#8B5CF6',
    unlocked: true,
    unlockedAt: '2024-03-15',
    rarity: 'rare'
  },
  {
    id: 'thousand_points',
    title: 'Millionnaire',
    description: '1000 points gagnés',
    icon: Crown,
    color: '#FFD700',
    unlocked: true,
    unlockedAt: '2024-05-20',
    rarity: 'epic'
  },
  {
    id: 'month_streak',
    title: 'Moine Moderne',
    description: 'Session tous les jours pendant 30 jours',
    icon: Medal,
    color: '#FF6B6B',
    unlocked: false,
    rarity: 'legendary'
  },
  {
    id: 'ten_thousand_points',
    title: 'Légende Vivante',
    description: '10 000 points gagnés',
    icon: Zap,
    color: '#FF3366',
    unlocked: false,
    rarity: 'mythic'
  }
];

const monthlyData = [
  { month: 'Jan', sessions: 23, points: 487 },
  { month: 'Fév', sessions: 28, points: 623 },
  { month: 'Mar', sessions: 31, points: 734 },
  { month: 'Avr', sessions: 27, points: 612 },
  { month: 'Mai', sessions: 33, points: 823 },
  { month: 'Juin', sessions: 14, points: 368 } // Mois en cours
];

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAllAchievements, setShowAllAchievements] = useState(false);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `J'ai accumulé ${userStats.totalPoints} points avec SeedTrade en aidant la planète ! 🌍\n\n${userStats.totalImpact.trees} arbres plantés 🌱\n${userStats.totalImpact.water}L d'eau fournis 💧\n\nRejoins-moi sur SeedTrade ! #SeedTrade #ImpactPositif`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditProfile = () => {
    Alert.alert(
      "Modifier le profil",
      "Cette fonctionnalité sera bientôt disponible !",
      [{ text: "OK", style: "default" }]
    );
  };

  const handleSettings = () => {
    Alert.alert(
      "Paramètres",
      "Notifications, confidentialité, compte...",
      [
        { text: "Notifications", onPress: () => {} },
        { text: "Confidentialité", onPress: () => {} },
        { text: "Annuler", style: "cancel" }
      ]
    );
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return '#6B7280';
      case 'uncommon': return '#10B981';
      case 'rare': return '#3B82F6';
      case 'epic': return '#8B5CF6';
      case 'legendary': return '#F59E0B';
      case 'mythic': return '#EF4444';
      default: return colors.textLight;
    }
  };

  const getProgressColor = () => {
    if (userProfile.levelProgress > 80) return colors.success;
    if (userProfile.levelProgress > 50) return colors.accent;
    return colors.primary;
  };

  const ProfileHeader = () => (
    <View style={styles.profileHeader}>
      <LinearGradient
        colors={[colors.primary, colors.primaryLight]}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Avatar et actions */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: userProfile.avatar }}
              style={styles.avatar}
              contentFit="cover"
            />
            <TouchableOpacity style={styles.cameraButton}>
              <Camera size={16} color="white" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton} onPress={handleEditProfile}>
              <Edit3 size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton} onPress={handleShare}>
              <Share2 size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton} onPress={handleSettings}>
              <Settings size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Infos utilisateur */}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userProfile.name}</Text>
          <Text style={styles.userUsername}>{userProfile.username}</Text>
          <Text style={styles.userLocation}>{userProfile.location}</Text>
          <Text style={styles.userBio}>{userProfile.bio}</Text>
        </View>

        {/* Niveau et progression */}
        <View style={styles.levelSection}>
          <View style={styles.levelInfo}>
            <Text style={styles.currentLevel}>{userProfile.level}</Text>
            <Text style={styles.nextLevel}>→ {userProfile.nextLevel}</Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { 
                    width: `${userProfile.levelProgress}%`,
                    backgroundColor: getProgressColor()
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>{userProfile.levelProgress}%</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  const StatsOverview = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Tes Statistiques</Text>
      
      {/* Stats principales */}
      <View style={styles.mainStats}>
        <View style={styles.mainStatCard}>
          <LinearGradient
            colors={[colors.primary, colors.primaryLight]}
            style={styles.statGradient}
          >
            <Star size={28} color="white" />
            <Text style={styles.mainStatValue}>{userStats.totalPoints.toLocaleString()}</Text>
            <Text style={styles.mainStatLabel}>Points Totaux</Text>
          </LinearGradient>
        </View>
        
        <View style={styles.mainStatCard}>
          <LinearGradient
            colors={[colors.secondary, '#059669']}
            style={styles.statGradient}
          >
            <Timer size={28} color="white" />
            <Text style={styles.mainStatValue}>{Math.floor(userStats.totalMinutes / 60)}h</Text>
            <Text style={styles.mainStatLabel}>Temps Total</Text>
          </LinearGradient>
        </View>
      </View>

      {/* Stats détaillées */}
      <View style={styles.detailedStats}>
        <View style={styles.statRow}>
          <View style={styles.statItem}>
            <Target size={20} color={colors.primary} />
            <Text style={styles.statValue}>{userStats.totalSessions}</Text>
            <Text style={styles.statLabel}>Sessions</Text>
          </View>
          <View style={styles.statItem}>
            <TrendingUp size={20} color={colors.secondary} />
            <Text style={styles.statValue}>{userStats.currentStreak}</Text>
            <Text style={styles.statLabel}>Série Actuelle</Text>
          </View>
          <View style={styles.statItem}>
            <Award size={20} color={colors.accent} />
            <Text style={styles.statValue}>{userStats.longestStreak}</Text>
            <Text style={styles.statLabel}>Record</Text>
          </View>
        </View>
        
        <View style={styles.statRow}>
          <View style={styles.statItem}>
            <Calendar size={20} color={colors.stats.time} />
            <Text style={styles.statValue}>{userStats.averageSession}min</Text>
            <Text style={styles.statLabel}>Moy. Session</Text>
          </View>
          <View style={styles.statItem}>
            <Smartphone size={20} color="#6B7280" />
            <Text style={styles.statValue}>{userStats.favoriteTime}</Text>
            <Text style={styles.statLabel}>Heure Préférée</Text>
          </View>
          <View style={styles.statItem}>
            <Globe size={20} color="#3B82F6" />
            <Text style={styles.statValue}>#{42}</Text>
            <Text style={styles.statLabel}>Classement</Text>
          </View>
        </View>
      </div>
    </View>
  );

  const ImpactSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Ton Impact Réel</Text>
      
      <View style={styles.impactGrid}>
        <View style={styles.impactCard}>
          <Leaf size={32} color={colors.missions.tree} />
          <Text style={styles.impactValue}>{userStats.totalImpact.trees}</Text>
          <Text style={styles.impactLabel}>Arbres plantés</Text>
          <Text style={styles.impactEquivalent}>= 2.7 tonnes CO2 absorbées</Text>
        </View>
        
        <View style={styles.impactCard}>
          <Globe size={32} color={colors.missions.water} />
          <Text style={styles.impactValue}>{userStats.totalImpact.water}L</Text>
          <Text style={styles.impactLabel}>Eau potable</Text>
          <Text style={styles.impactEquivalent}>= 142 personnes/jour</Text>
        </View>
        
        <View style={styles.impactCard}>
          <Heart size={32} color={colors.missions.education} />
          <Text style={styles.impactValue}>{userStats.totalImpact.education}h</Text>
          <Text style={styles.impactLabel}>Enseignement</Text>
          <Text style={styles.impactEquivalent}>= 3 enfants éduqués</Text>
        </View>
        
        <View style={styles.impactCard}>
          <Shield size={32} color="#EF4444" />
          <Text style={styles.impactValue}>{userStats.totalImpact.health}</Text>
          <Text style={styles.impactLabel}>Consultations</Text>
          <Text style={styles.impactEquivalent}>= 23 vies sauvées</Text>
        </View>
      </View>
    </View>
  );

  const AchievementsSection = () => {
    const unlockedAchievements = achievements.filter(a => a.unlocked);
    const displayedAchievements = showAllAchievements ? achievements : unlockedAchievements.slice(0, 6);
    
    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tes Badges</Text>
          <Text style={styles.achievementCounter}>
            {unlockedAchievements.length}/{achievements.length}
          </Text>
        </View>
        
        <View style={styles.achievementsGrid}>
          {displayedAchievements.map((achievement) => {
            const IconComponent = achievement.icon;
            return (
              <TouchableOpacity
                key={achievement.id}
                style={[
                  styles.achievementCard,
                  !achievement.unlocked && styles.lockedAchievement
                ]}
                onPress={() => {
                  Alert.alert(
                    achievement.title,
                    `${achievement.description}\n\nRareté: ${achievement.rarity}${achievement.unlockedAt ? `\nDébloqué le: ${new Date(achievement.unlockedAt).toLocaleDateString('fr-FR')}` : ''}`,
                    [{ text: "Cool !", style: "default" }]
                  );
                }}
              >
                <View style={[
                  styles.achievementIcon,
                  { 
                    backgroundColor: achievement.unlocked ? achievement.color : colors.border,
                    borderColor: getRarityColor(achievement.rarity),
                    borderWidth: achievement.unlocked ? 2 : 1
                  }
                ]}>
                  <IconComponent 
                    size={24} 
                    color={achievement.unlocked ? 'white' : colors.textLight} 
                  />
                </View>
                <Text style={[
                  styles.achievementTitle,
                  !achievement.unlocked && styles.lockedText
                ]}>
                  {achievement.title}
                </Text>
                <Text style={[
                  styles.achievementDescription,
                  !achievement.unlocked && styles.lockedText
                ]}>
                  {achievement.description}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        
        {!showAllAchievements && achievements.length > 6 && (
          <TouchableOpacity 
            style={styles.showMoreButton}
            onPress={() => setShowAllAchievements(true)}
          >
            <Text style={styles.showMoreText}>Voir tous les badges</Text>
            <ChevronRight size={16} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const MonthlyChart = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Évolution Mensuelle</Text>
      
      <View style={styles.chartContainer}>
        <View style={styles.chartBars}>
          {monthlyData.map((data, index) => {
            const maxSessions = Math.max(...monthlyData.map(d => d.sessions));
            const height = (data.sessions / maxSessions) * 100;
            
            return (
              <View key={data.month} style={styles.barContainer}>
                <View style={styles.barColumn}>
                  <View 
                    style={[
                      styles.bar,
                      { 
                        height: `${height}%`,
                        backgroundColor: index === monthlyData.length - 1 ? colors.primary : colors.secondary
                      }
                    ]}
                  />
                </View>
                <Text style={styles.barLabel}>{data.month}</Text>
                <Text style={styles.barValue}>{data.sessions}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );

  const SettingsSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Paramètres</Text>
      
      <View style={styles.settingsGroup}>
        <TouchableOpacity style={styles.settingItem}>
          <Bell size={20} color={colors.textSecondary} />
          <Text style={styles.settingText}>Notifications</Text>
          <ChevronRight size={20} color={colors.textLight} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <Shield size={20} color={colors.textSecondary} />
          <Text style={styles.settingText}>Confidentialité</Text>
          <ChevronRight size={20} color={colors.textLight} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <HelpCircle size={20} color={colors.textSecondary} />
          <Text style={styles.settingText}>Aide & Support</Text>
          <ChevronRight size={20} color={colors.textLight} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.settingItem, styles.dangerSetting]}
          onPress={() => {
            Alert.alert(
              "Déconnexion",
              "Es-tu sûr de vouloir te déconnecter ?",
              [
                { text: "Annuler", style: "cancel" },
                { text: "Déconnecter", style: "destructive" }
              ]
            );
          }}
        >
          <LogOut size={20} color={colors.error} />
          <Text style={[styles.settingText, { color: colors.error }]}>Déconnexion</Text>
          <ChevronRight size={20} color={colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ProfileHeader />
        
        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
            onPress={() => setActiveTab('overview')}
          >
            <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>
              Aperçu
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'achievements' && styles.activeTab]}
            onPress={() => setActiveTab('achievements')}
          >
            <Text style={[styles.tabText, activeTab === 'achievements' && styles.activeTabText]}>
              Badges
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'settings' && styles.activeTab]}
            onPress={() => setActiveTab('settings')}
          >
            <Text style={[styles.tabText, activeTab === 'settings' && styles.activeTabText]}>
              Paramètres
            </Text>
          </TouchableOpacity>
        </View>

        {/* Contenu des tabs */}
        {activeTab === 'overview' && (
          <>
            <StatsOverview />
            <ImpactSection />
            <MonthlyChart />
          </>
        )}
        
        {activeTab === 'achievements' && <AchievementsSection />}
        
        {activeTab === 'settings' && <SettingsSection />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  profileHeader: {
    marginBottom: 20,
  },
  headerGradient: {
    padding: 24,
    paddingTop: 16,
  },
  avatarSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  userUsername: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
  },
  userLocation: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 12,
  },
  userBio: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 22,
  },
  levelSection: {
    gap: 12,
  },
  levelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  currentLevel: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  nextLevel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    minWidth: 40,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    marginHorizontal: 24,
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  activeTabText: {
    color: 'white',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  achievementCounter: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  mainStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  mainStatCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  statGradient: {
    padding: 20,
    alignItems: 'center',
  },
  mainStatValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 8,
  },
  mainStatLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
  },
  detailedStats: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    gap: 20,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    gap: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  impactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  impactCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  impactValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginVertical: 12,
  },
  impactLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
    textAlign: 'center',
  },
  impactEquivalent: {
    fontSize: 11,
    color: colors.textLight,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  achievementCard: {
    width: '30%',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  lockedAchievement: {
    opacity: 0.6,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  achievementTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 10,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 14,
  },
  lockedText: {
    color: colors.textLight,
  },
  showMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    paddingVertical: 12,
    gap: 8,
  },
  showMoreText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '500',
  },
  chartContainer: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    height: 200,
  },
  chartBars: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    gap: 8,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
  },
  barColumn: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    marginBottom: 8,
  },
  bar: {
    width: '100%',
    borderRadius: 4,
    minHeight: 4,
  },
  barLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  barValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  settingsGroup: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dangerSetting: {
    borderBottomWidth: 0,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    marginLeft: 16,
  },
});