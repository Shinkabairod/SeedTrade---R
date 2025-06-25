import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  RefreshControl,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Trophy, 
  TrendingUp, 
  TrendingDown,
  Medal,
  Crown,
  Star,
  Users,
  Target,
  Zap,
  RefreshCw,
  Calendar,
  Globe
} from 'lucide-react-native';
import colors from '@/constants/colors';

const leaderboardData = [
  { 
    id: 1, 
    name: 'Sarah M.', 
    username: '@sarah_green',
    points: 2847, 
    sessions: 89, 
    streak: 12,
    trend: 'up',
    trendValue: '+127',
    level: 'Eco-Master',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b95210e5?q=80&w=150',
    mission: 'Reforestation',
    country: '🇫🇷'
  },
  { 
    id: 2, 
    name: 'Alex K.', 
    username: '@alex_impact',
    points: 2653, 
    sessions: 76, 
    streak: 8,
    trend: 'up',
    trendValue: '+89',
    level: 'Eco-Expert',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150',
    mission: 'Eau Potable',
    country: '🇨🇦'
  },
  { 
    id: 3, 
    name: 'Marie L.', 
    username: '@marie_zen',
    points: 2341, 
    sessions: 67, 
    streak: 15,
    trend: 'up',
    trendValue: '+156',
    level: 'Eco-Hero',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150',
    mission: 'Education',
    country: '🇧🇪'
  },
  { 
    id: 4, 
    name: 'Thomas B.', 
    username: '@thomas_calm',
    points: 2129, 
    sessions: 54, 
    streak: 6,
    trend: 'down',
    trendValue: '-23',
    level: 'Eco-Warrior',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150',
    mission: 'Santé',
    country: '🇨🇭'
  },
  { 
    id: 5, 
    name: 'Emma P.', 
    username: '@emma_focus',
    points: 1987, 
    sessions: 45, 
    streak: 9,
    trend: 'up',
    trendValue: '+67',
    level: 'Eco-Guardian',
    avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?q=80&w=150',
    mission: 'Océan',
    country: '🇩🇰'
  },
  { 
    id: 6, 
    name: 'Lucas D.', 
    username: '@lucas_mindful',
    points: 1823, 
    sessions: 41, 
    streak: 4,
    trend: 'stable',
    trendValue: '+12',
    level: 'Eco-Apprentice',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150',
    mission: 'Energie',
    country: '🇪🇸'
  },
  { 
    id: 7, 
    name: 'Chloe R.', 
    username: '@chloe_nature',
    points: 1756, 
    sessions: 38, 
    streak: 11,
    trend: 'up',
    trendValue: '+98',
    level: 'Eco-Seeker',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150',
    mission: 'Reforestation',
    country: '🇮🇹'
  },
  { 
    id: 8, 
    name: 'Dylan M.', 
    username: '@dylan_peace',
    points: 1642, 
    sessions: 35, 
    streak: 7,
    trend: 'up',
    trendValue: '+45',
    level: 'Eco-Explorer',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150',
    mission: 'Education',
    country: '🇳🇱'
  }
];

const currentUser = {
  id: 42,
  name: 'Toi',
  username: '@mon_profil',
  points: 1247,
  sessions: 23,
  streak: 5,
  trend: 'up',
  trendValue: '+34',
  level: 'Eco-Beginner',
  mission: 'Reforestation',
  country: '🇦🇪'
};

const timeframes = [
  { id: 'week', label: 'Semaine', icon: Calendar },
  { id: 'month', label: 'Mois', icon: Target },
  { id: 'all', label: 'Tout temps', icon: Globe },
];

const categories = [
  { id: 'points', label: 'Points', icon: Star },
  { id: 'sessions', label: 'Sessions', icon: Target },
  { id: 'streak', label: 'Série', icon: Zap },
];

export default function RankingsScreen() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [selectedCategory, setSelectedCategory] = useState('points');
  const [refreshing, setRefreshing] = useState(false);
  const [animatedValues] = useState(
    leaderboardData.map(() => new Animated.Value(0))
  );

  useEffect(() => {
    // Animation d'entrée pour chaque item
    const animations = animatedValues.map((animValue, index) =>
      Animated.timing(animValue, {
        toValue: 1,
        duration: 600,
        delay: index * 100,
        useNativeDriver: true,
      })
    );

    Animated.stagger(100, animations).start();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    // Simuler un rechargement
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return '#FFD700'; // Or
      case 2: return '#C0C0C0'; // Argent
      case 3: return '#CD7F32'; // Bronze
      default: return colors.primary;
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return Crown;
      case 2: return Medal;
      case 3: return Trophy;
      default: return null;
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      default: return null;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return colors.success;
      case 'down': return colors.error;
      default: return colors.textLight;
    }
  };

  const UserRankCard = () => (
    <View style={styles.userRankCard}>
      <LinearGradient
        colors={[colors.primary, colors.primaryLight]}
        style={styles.userRankGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.userRankHeader}>
          <View style={styles.userRankBadge}>
            <Text style={styles.userRankNumber}>#42</Text>
          </View>
          <View style={styles.userRankInfo}>
            <Text style={styles.userRankName}>{currentUser.name}</Text>
            <Text style={styles.userRankLevel}>{currentUser.level}</Text>
          </View>
          <View style={styles.userTrendContainer}>
            <TrendingUp size={20} color="rgba(255,255,255,0.9)" />
            <Text style={styles.userTrendText}>{currentUser.trendValue}</Text>
          </View>
        </View>
        
        <View style={styles.userStatsRow}>
          <View style={styles.userStat}>
            <Text style={styles.userStatValue}>{currentUser.points}</Text>
            <Text style={styles.userStatLabel}>Points</Text>
          </View>
          <View style={styles.userStat}>
            <Text style={styles.userStatValue}>{currentUser.sessions}</Text>
            <Text style={styles.userStatLabel}>Sessions</Text>
          </View>
          <View style={styles.userStat}>
            <Text style={styles.userStatValue}>{currentUser.streak}</Text>
            <Text style={styles.userStatLabel}>Série</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  const LeaderboardItem = ({ user, index, rank }) => {
    const RankIcon = getRankIcon(rank);
    const TrendIcon = getTrendIcon(user.trend);
    
    return (
      <Animated.View
        style={[
          styles.leaderboardItem,
          { 
            opacity: animatedValues[index],
            transform: [{
              translateY: animatedValues[index].interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            }],
          },
        ]}
      >
        <View style={styles.rankContainer}>
          <View style={[
            styles.rankBadge,
            { backgroundColor: getRankColor(rank) },
            rank <= 3 && styles.topRankBadge
          ]}>
            {RankIcon ? (
              <RankIcon size={16} color="white" />
            ) : (
              <Text style={styles.rankText}>{rank}</Text>
            )}
          </View>
        </View>

        <Image 
          source={{ uri: user.avatar }}
          style={styles.userAvatar}
          contentFit="cover"
        />

        <View style={styles.userDetails}>
          <View style={styles.userNameRow}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userCountry}>{user.country}</Text>
          </View>
          <Text style={styles.userUsername}>{user.username}</Text>
          <Text style={styles.userMission}>{user.mission} • {user.level}</Text>
        </View>

        <View style={styles.userMetrics}>
          <View style={styles.mainMetric}>
            <Text style={styles.metricValue}>
              {selectedCategory === 'points' ? user.points :
               selectedCategory === 'sessions' ? user.sessions :
               user.streak}
            </Text>
            <Text style={styles.metricLabel}>
              {selectedCategory === 'points' ? 'pts' :
               selectedCategory === 'sessions' ? 'sessions' :
               'jours'}
            </Text>
          </View>
          
          {TrendIcon && (
            <View style={styles.trendContainer}>
              <TrendIcon size={16} color={getTrendColor(user.trend)} />
              <Text style={[
                styles.trendValue,
                { color: getTrendColor(user.trend) }
              ]}>
                {user.trendValue}
              </Text>
            </View>
          )}
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Classements</Text>
        <TouchableOpacity 
          style={styles.refreshButton}
          onPress={onRefresh}
        >
          <RefreshCw size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
        contentContainerStyle={styles.scrollContent}
      >
        {/* Filtres temporels */}
        <View style={styles.filtersSection}>
          <Text style={styles.filterTitle}>Période</Text>
          <View style={styles.filterButtons}>
            {timeframes.map((timeframe) => {
              const IconComponent = timeframe.icon;
              return (
                <TouchableOpacity
                  key={timeframe.id}
                  style={[
                    styles.filterButton,
                    selectedTimeframe === timeframe.id && styles.activeFilterButton,
                  ]}
                  onPress={() => setSelectedTimeframe(timeframe.id)}
                >
                  <IconComponent 
                    size={16} 
                    color={selectedTimeframe === timeframe.id ? 'white' : colors.primary} 
                  />
                  <Text style={[
                    styles.filterButtonText,
                    selectedTimeframe === timeframe.id && styles.activeFilterButtonText,
                  ]}>
                    {timeframe.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Filtres catégories */}
        <View style={styles.filtersSection}>
          <Text style={styles.filterTitle}>Catégorie</Text>
          <View style={styles.filterButtons}>
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.filterButton,
                    selectedCategory === category.id && styles.activeFilterButton,
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <IconComponent 
                    size={16} 
                    color={selectedCategory === category.id ? 'white' : colors.primary} 
                  />
                  <Text style={[
                    styles.filterButtonText,
                    selectedCategory === category.id && styles.activeFilterButtonText,
                  ]}>
                    {category.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Ton classement */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ton Classement</Text>
          <UserRankCard />
        </View>

        {/* Podium */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Podium 🏆</Text>
          <View style={styles.podium}>
            {/* 2ème place */}
            <View style={[styles.podiumPosition, styles.secondPlace]}>
              <Image 
                source={{ uri: leaderboardData[1].avatar }}
                style={styles.podiumAvatar}
                contentFit="cover"
              />
              <View style={[styles.podiumBadge, { backgroundColor: '#C0C0C0' }]}>
                <Text style={styles.podiumBadgeText}>2</Text>
              </View>
              <Text style={styles.podiumName}>{leaderboardData[1].name}</Text>
              <Text style={styles.podiumPoints}>{leaderboardData[1].points} pts</Text>
            </View>

            {/* 1ère place */}
            <View style={[styles.podiumPosition, styles.firstPlace]}>
              <View style={styles.crownContainer}>
                <Crown size={24} color="#FFD700" />
              </View>
              <Image 
                source={{ uri: leaderboardData[0].avatar }}
                style={[styles.podiumAvatar, styles.winnerAvatar]}
                contentFit="cover"
              />
              <View style={[styles.podiumBadge, { backgroundColor: '#FFD700' }]}>
                <Text style={styles.podiumBadgeText}>1</Text>
              </View>
              <Text style={styles.podiumName}>{leaderboardData[0].name}</Text>
              <Text style={styles.podiumPoints}>{leaderboardData[0].points} pts</Text>
            </View>

            {/* 3ème place */}
            <View style={[styles.podiumPosition, styles.thirdPlace]}>
              <Image 
                source={{ uri: leaderboardData[2].avatar }}
                style={styles.podiumAvatar}
                contentFit="cover"
              />
              <View style={[styles.podiumBadge, { backgroundColor: '#CD7F32' }]}>
                <Text style={styles.podiumBadgeText}>3</Text>
              </View>
              <Text style={styles.podiumName}>{leaderboardData[2].name}</Text>
              <Text style={styles.podiumPoints}>{leaderboardData[2].points} pts</Text>
            </View>
          </View>
        </View>

        {/* Classement complet */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Classement Complet</Text>
          <View style={styles.leaderboard}>
            {leaderboardData.map((user, index) => (
              <LeaderboardItem
                key={user.id}
                user={user}
                index={index}
                rank={index + 1}
              />
            ))}
          </View>
        </View>

        {/* Stats globales */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistiques Globales</Text>
          <View style={styles.globalStats}>
            <View style={styles.globalStatCard}>
              <Users size={28} color={colors.primary} />
              <Text style={styles.globalStatValue}>124,567</Text>
              <Text style={styles.globalStatLabel}>Utilisateurs actifs</Text>
            </View>
            <View style={styles.globalStatCard}>
              <Target size={28} color={colors.secondary} />
              <Text style={styles.globalStatValue}>2.4M</Text>
              <Text style={styles.globalStatLabel}>Sessions terminées</Text>
            </View>
            <View style={styles.globalStatCard}>
              <Zap size={28} color={colors.accent} />
              <Text style={styles.globalStatValue}>847</Text>
              <Text style={styles.globalStatLabel}>Série record</Text>
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
  refreshButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: colors.surface,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  filtersSection: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary,
    gap: 6,
  },
  activeFilterButton: {
    backgroundColor: colors.primary,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
  activeFilterButtonText: {
    color: 'white',
  },
  section: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
  },
  userRankCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  userRankGradient: {
    padding: 20,
  },
  userRankHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  userRankBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  userRankNumber: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userRankInfo: {
    flex: 1,
  },
  userRankName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  userRankLevel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  userTrendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  userTrendText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    fontWeight: '600',
  },
  userStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  userStat: {
    alignItems: 'center',
  },
  userStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  userStatLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  podium: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 200,
    gap: 16,
  },
  podiumPosition: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  firstPlace: {
    height: 180,
    marginTop: -20,
  },
  secondPlace: {
    height: 160,
  },
  thirdPlace: {
    height: 140,
  },
  crownContainer: {
    position: 'absolute',
    top: -12,
  },
  podiumAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 8,
  },
  winnerAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  podiumBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  podiumBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  podiumName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  podiumPoints: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  leaderboard: {
    gap: 12,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  rankContainer: {
    marginRight: 16,
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topRankBadge: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  rankText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  userCountry: {
    fontSize: 16,
  },
  userUsername: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 2,
  },
  userMission: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  userMetrics: {
    alignItems: 'flex-end',
  },
  mainMetric: {
    alignItems: 'center',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  metricLabel: {
    fontSize: 10,
    color: colors.textLight,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  trendValue: {
    fontSize: 12,
    fontWeight: '600',
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
    fontSize: 18,
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