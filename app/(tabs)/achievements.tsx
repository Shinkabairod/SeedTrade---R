import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trophy, Star, Target, Clock, Award } from 'lucide-react-native';
import { useSessionStore } from '@/store/useSessionStore';
import colors from '@/constants/colors';

export default function AchievementsScreen() {
  const { achievements, stats } = useSessionStore();

  const unlockedAchievements = achievements.filter(a => a.unlockedAt);
  const lockedAchievements = achievements.filter(a => !a.unlockedAt);

  const handleAchievementPress = (achievement: any) => {
    if (achievement.unlockedAt) {
      const unlockedDate = new Date(achievement.unlockedAt).toLocaleDateString('fr-FR');
      Alert.alert(
        `🏆 ${achievement.title}`,
        `${achievement.description}

Débloqué le ${unlockedDate}

Félicitations pour ce succès !`
      );
    } else {
      Alert.alert(
        `📈 ${achievement.title}`,
        `${achievement.description}

Progression: ${achievement.progress}/${achievement.target}

Continue comme ça !`
      );
    }
  };

  const renderAchievementCard = (achievement: any, isUnlocked: boolean) => (
    <TouchableOpacity
      key={achievement.id}
      style={[
        styles.achievementCard,
        isUnlocked ? styles.unlockedCard : styles.lockedCard
      ]}
      onPress={() => handleAchievementPress(achievement)}
    >
      <View style={[
        styles.achievementIcon,
        { backgroundColor: isUnlocked ? colors.success : colors.border }
      ]}>
        <Text style={styles.achievementEmoji}>{achievement.icon}</Text>
      </View>
      
      <View style={styles.achievementContent}>
        <Text style={[
          styles.achievementTitle,
          { color: isUnlocked ? colors.text : colors.textLight }
        ]}>
          {achievement.title}
        </Text>
        <Text style={styles.achievementDescription}>
          {achievement.description}
        </Text>
        
        {!isUnlocked && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { 
                    width: `${Math.min((achievement.progress / achievement.target) * 100, 100)}%`,
                    backgroundColor: colors.accent,
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {achievement.progress}/{achievement.target}
            </Text>
          </View>
        )}
      </View>
      
      {isUnlocked && (
        <View style={styles.unlockedBadge}>
          <Star size={16} color={colors.success} fill={colors.success} />
        </View>
      )}
    </TouchableOpacity>
  );

  const getNextAchievements = () => {
    return lockedAchievements
      .filter(a => a.progress > 0)
      .sort((a, b) => (b.progress / b.target) - (a.progress / a.target))
      .slice(0, 3);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Succès</Text>
        <Text style={styles.subtitle}>
          {unlockedAchievements.length}/{achievements.length} débloqués
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Progress Overview */}
        <View style={styles.overviewContainer}>
          <View style={styles.overviewCard}>
            <Trophy size={32} color={colors.stats.points} />
            <Text style={styles.overviewValue}>{unlockedAchievements.length}</Text>
            <Text style={styles.overviewLabel}>Succès débloqués</Text>
          </View>
          
          <View style={styles.overviewCard}>
            <Target size={32} color={colors.stats.streak} />
            <Text style={styles.overviewValue}>
              {Math.round((unlockedAchievements.length / achievements.length) * 100)}%
            </Text>
            <Text style={styles.overviewLabel}>Progression</Text>
          </View>
        </View>

        {/* Unlocked Achievements */}
        {unlockedAchievements.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🏆 Succès débloqués</Text>
            {unlockedAchievements.map(achievement => 
              renderAchievementCard(achievement, true)
            )}
          </View>
        )}

        {/* Next Achievements */}
        {getNextAchievements().length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎯 Prochains objectifs</Text>
            {getNextAchievements().map(achievement => 
              renderAchievementCard(achievement, false)
            )}
          </View>
        )}

        {/* All Locked Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔒 Tous les succès</Text>
          {lockedAchievements.map(achievement => 
            renderAchievementCard(achievement, false)
          )}
        </View>

        {/* Motivation */}
        <View style={styles.motivationContainer}>
          <Text style={styles.motivationTitle}>Continue comme ça ! 🌟</Text>
          <Text style={styles.motivationText}>
            Chaque session te rapproche de nouveaux succès. 
            Reste régulier et découvre tous les achievements !
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
  
  // Overview
  overviewContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  overviewCard: {
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
  overviewValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 8,
    marginBottom: 4,
  },
  overviewLabel: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
  },

  // Sections
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },

  // Achievement Cards
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  unlockedCard: {
    borderWidth: 2,
    borderColor: colors.success,
  },
  lockedCard: {
    opacity: 0.8,
  },
  achievementIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  achievementEmoji: {
    fontSize: 28,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 8,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: 'right',
  },
  unlockedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
  },

  // Motivation
  motivationContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: colors.primary,
    borderRadius: 16,
    alignItems: 'center',
  },
  motivationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  motivationText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 20,
  },
});