import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Calendar,
  Clock,
  Award,
  Target,
  TrendingUp,
  BarChart3,
  TreePine,
  Waves,
  Recycle,
  Flame,
  Trophy,
  Star,
} from 'lucide-react-native';
import { useSessionStore } from '@/store/useSessionStore';
import { missions } from '@/constants/missions';
import colors from '@/constants/colors';

const { width } = Dimensions.get('window');

export default function StatsScreen() {
  const { stats, sessions, achievements } = useSessionStore();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'all'>('week');

  // Calculate weekly progress
  const weekDays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  const maxWeeklyMinutes = Math.max(...stats.weeklyData, 1);

  // Calculate achievements progress
  const unlockedAchievements = achievements.filter(a => a.unlockedAt);
  const achievementProgress = achievements.map(achievement => ({
    ...achievement,
    percentage: Math.min((achievement.progress / achievement.target) * 100, 100),
  }));

  // Calculate mission breakdown
  const missionBreakdown = missions.map(mission => {
    const missionSessions = sessions.filter(
      session => session.missionId === mission.id && session.status === 'completed'
    );
    
    const totalMinutes = missionSessions.reduce((sum, session) => sum + (session.actualDuration || 0), 0);
    const totalPoints = missionSessions.reduce((sum, session) => sum + session.points, 0);
    
    return {
      mission,
      minutes: totalMinutes,
      sessions: missionSessions.length,
      points: totalPoints,
      percentage: stats.totalMinutes > 0 ? (totalMinutes / stats.totalMinutes) * 100 : 0,
    };
  }).sort((a, b) => b.minutes - a.minutes);

  // Calculate recent activity
  const recentSessions = sessions
    .filter(session => session.status === 'completed')
    .slice(0, 5)
    .map(session => {
      const mission = missions.find(m => m.id === session.missionId);
      const date = new Date(session.startTime);
      return {
        ...session,
        missionTitle: mission?.title || 'Mission inconnue',
        missionColor: mission?.color || colors.primary,
        dateString: date.toLocaleDateString('fr-FR', { 
          day: 'numeric', 
          month: 'short' 
        }),
      };
    });

  const renderWeeklyChart = () => (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>Activité de la semaine</Text>
      <View style={styles.weeklyChart}>
        {weekDays.map((day, index) => {
          const minutes = stats.weeklyData[index];
          const height = (minutes / maxWeeklyMinutes) * 100 || 5;
          
          return (
            <View key={index} style={styles.weeklyBarContainer}>
              <View style={styles.weeklyBarBackground}>
                <View 
                  style={[
                    styles.weeklyBar, 
                    { 
                      height: `${height}%`,
                      backgroundColor: minutes > 0 ? colors.primary : colors.border,
                    }
                  ]} 
                />
              </View>
              <Text style={styles.weeklyDayLabel}>{day}</Text>
              <Text style={styles.weeklyMinutesLabel}>{minutes}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );

  const renderMissionBreakdown = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Répartition par mission</Text>
      {missionBreakdown.map(({ mission, minutes, sessions, percentage }) => (
        <View key={mission.id} style={styles.missionBreakdownItem}>
          <View style={styles.missionBreakdownHeader}>
            <View style={[styles.missionBreakdownIcon, { backgroundColor: mission.color }]}>
              <mission.icon size={16} color="white" />
            </View>
            <Text style={styles.missionBreakdownTitle}>{mission.title}</Text>
            <Text style={styles.missionBreakdownPercentage}>
              {percentage.toFixed(0)}%
            </Text>
          </View>
          
          <View style={styles.missionBreakdownProgress}>
            <View style={styles.missionBreakdownProgressBackground}>
              <View 
                style={[
                  styles.missionBreakdownProgressBar,
                  { 
                    width: `${percentage}%`,
                    backgroundColor: mission.color,
                  }
                ]} 
              />
            </View>
          </View>
          
          <View style={styles.missionBreakdownStats}>
            <Text style={styles.missionBreakdownStat}>{sessions} sessions</Text>
            <Text style={styles.missionBreakdownStat}>{minutes} min</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderAchievements = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Succès</Text>
        <View style={styles.achievementsBadge}>
          <Trophy size={16} color={colors.stats.points} />
          <Text style={styles.achievementsBadgeText}>
            {unlockedAchievements.length}/{achievements.length}
          </Text>
        </View>
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.achievementsContainer}>
          {achievementProgress.map((achievement) => (
            <View key={achievement.id} style={styles.achievementCard}>
              <View style={[
                styles.achievementIcon,
                { backgroundColor: achievement.unlockedAt ? colors.success : colors.border }
              ]}>
                <Text style={styles.achievementEmoji}>{achievement.icon}</Text>
              </View>
              
              <Text style={styles.achievementTitle} numberOfLines={2}>
                {achievement.title}
              </Text>
              
              <View style={styles.achievementProgress}>
                <View style={styles.achievementProgressBackground}>
                  <View 
                    style={[
                      styles.achievementProgressBar,
                      { 
                        width: `${achievement.percentage}%`,
                        backgroundColor: achievement.unlockedAt ? colors.success : colors.accent,
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.achievementProgressText}>
                  {achievement.progress}/{achievement.target}
                </Text>
              </View>
              
              {achievement.unlockedAt && (
                <View style={styles.achievementUnlocked}>
                  <Star size={12} color={colors.success} fill={colors.success} />
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  const renderRecentActivity = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Activité récente</Text>
      {recentSessions.length > 0 ? (
        recentSessions.map((session, index) => (
          <View key={session.id} style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: session.missionColor }]}>
              <Clock size={16} color="white" />
            </View>
            
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>{session.missionTitle}</Text>
              <Text style={styles.activityDetails}>
                {session.actualDuration} min • {session.points} points
              </Text>
            </View>
            
            <Text style={styles.activityDate}>{session.dateString}</Text>
          </View>
        ))
      ) : (
        <View style={styles.emptyState}>
          <Target size={32} color={colors.textLight} />
          <Text style={styles.emptyStateText}>
            Aucune session terminée pour le moment
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Statistiques</Text>
        <Text style={styles.subtitle}>Suivez votre progression</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Main Stats */}
        <View style={styles.mainStatsContainer}>
          <View style={styles.mainStatCard}>
            <View style={styles.mainStatIcon}>
              <Flame size={24} color={colors.stats.streak} />
            </View>
            <Text style={styles.mainStatValue}>{stats.currentStreak}</Text>
            <Text style={styles.mainStatLabel}>Série actuelle</Text>
            <Text style={styles.mainStatSubLabel}>
              Record: {stats.longestStreak} jours
            </Text>
          </View>
          
          <View style={styles.mainStatCard}>
            <View style={styles.mainStatIcon}>
              <Clock size={24} color={colors.stats.time} />
            </View>
            <Text style={styles.mainStatValue}>{stats.totalMinutes}</Text>
            <Text style={styles.mainStatLabel}>Minutes totales</Text>
            <Text style={styles.mainStatSubLabel}>
              {Math.round(stats.totalMinutes / 60 * 10) / 10}h au total
            </Text>
          </View>
        </View>

        {/* Weekly Chart */}
        {renderWeeklyChart()}

        {/* Mission Breakdown */}
        {renderMissionBreakdown()}

        {/* Achievements */}
        {renderAchievements()}

        {/* Recent Activity */}
        {renderRecentActivity()}

        {/* Impact Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Votre impact total</Text>
          <View style={styles.impactSummary}>
            <View style={styles.impactItem}>
              <TreePine size={24} color={colors.missions.reforestation} />
              <Text style={styles.impactValue}>{stats.treesPlanted}</Text>
              <Text style={styles.impactLabel}>Arbres plantés</Text>
            </View>
            
            <View style={styles.impactItem}>
              <Waves size={24} color={colors.missions.ocean} />
              <Text style={styles.impactValue}>{stats.oceanCleaned}</Text>
              <Text style={styles.impactLabel}>kg océan nettoyé</Text>
            </View>
            
            <View style={styles.impactItem}>
              <Recycle size={24} color={colors.missions.recycling} />
              <Text style={styles.impactValue}>{stats.materialsRecycled}</Text>
              <Text style={styles.impactLabel}>kg recyclés</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Continuez ainsi ! Chaque minute compte pour un monde meilleur. 🌱
          </Text>
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
    padding: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
  },
  content: {
    flex: 1,
  },
  
  // Main Stats
  mainStatsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  mainStatCard: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mainStatIcon: {
    marginBottom: 12,
  },
  mainStatValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  mainStatLabel: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 4,
  },
  mainStatSubLabel: {
    fontSize: 12,
    color: colors.textLight,
  },

  // Weekly Chart
  chartContainer: {
    backgroundColor: colors.surface,
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    padding: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  weeklyChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  weeklyBarContainer: {
    flex: 1,
    alignItems: 'center',
  },
  weeklyBarBackground: {
    height: 80,
    width: '60%',
    backgroundColor: colors.backgroundLight,
    borderRadius: 4,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  weeklyBar: {
    width: '100%',
    borderRadius: 4,
    minHeight: 4,
  },
  weeklyDayLabel: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 2,
  },
  weeklyMinutesLabel: {
    fontSize: 10,
    color: colors.textLight,
  },

  // Sections
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },

  // Mission Breakdown
  missionBreakdownItem: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  missionBreakdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  missionBreakdownIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  missionBreakdownTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  missionBreakdownPercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textLight,
  },
  missionBreakdownProgress: {
    marginBottom: 8,
  },
  missionBreakdownProgressBackground: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
  },
  missionBreakdownProgressBar: {
    height: '100%',
    borderRadius: 2,
  },
  missionBreakdownStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  missionBreakdownStat: {
    fontSize: 12,
    color: colors.textLight,
  },

  // Achievements
  achievementsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  achievementsBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.stats.points,
  },
  achievementsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
  },
  achievementCard: {
    width: 120,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    position: 'relative',
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  achievementEmoji: {
    fontSize: 20,
  },
  achievementTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
    minHeight: 32,
  },
  achievementProgress: {
    width: '100%',
    alignItems: 'center',
  },
  achievementProgressBackground: {
    width: '100%',
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    marginBottom: 4,
  },
  achievementProgressBar: {
    height: '100%',
    borderRadius: 2,
  },
  achievementProgressText: {
    fontSize: 10,
    color: colors.textLight,
  },
  achievementUnlocked: {
    position: 'absolute',
    top: 8,
    right: 8,
  },

  // Recent Activity
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  activityDetails: {
    fontSize: 12,
    color: colors.textLight,
  },
  activityDate: {
    fontSize: 12,
    color: colors.textLight,
  },

  // Impact Summary
  impactSummary: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  impactItem: {
    flex: 1,
    alignItems: 'center',
  },
  impactValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 8,
    marginBottom: 4,
  },
  impactLabel: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: 'center',
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: colors.surface,
    borderRadius: 12,
  },
  emptyStateText: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 8,
    textAlign: 'center',
  },

  // Footer
  footer: {
    padding: 20,
  },
  footerText: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});