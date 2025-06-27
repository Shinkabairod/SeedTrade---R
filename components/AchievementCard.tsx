import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '@/constants/colors';
import { Achievement } from '@/constants/achievements';

type AchievementCardProps = {
  achievement: Achievement;
  onPress?: () => void;
};

export default function AchievementCard({ achievement, onPress }: AchievementCardProps) {
  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }

    if (achievement.unlocked) {
      Alert.alert(
        `🏆 ${achievement.title}`,
        `${achievement.description}\n\nFélicitations pour ce succès !`,
        [{ text: 'Super !', style: 'default' }]
      );
    } else if (achievement.progress !== undefined && achievement.target) {
      Alert.alert(
        `📈 ${achievement.title}`,
        `Progression: ${achievement.progress}/${achievement.target}\n${achievement.description}`,
        [{ text: 'OK', style: 'default' }]
      );
    }
  };

  const progress = achievement.progress && achievement.target 
    ? (achievement.progress / achievement.target) * 100 
    : 0;

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      {achievement.unlocked ? (
        <LinearGradient
          colors={['#FFD700', '#FFA500']}
          style={styles.unlockedCard}
        >
          <Text style={styles.unlockedIcon}>{achievement.icon}</Text>
          <Text style={styles.unlockedTitle}>{achievement.title}</Text>
          <Text style={styles.unlockedDescription}>{achievement.description}</Text>
        </LinearGradient>
      ) : (
        <View style={styles.lockedCard}>
          <Text style={styles.lockedIcon}>{achievement.icon}</Text>
          <Text style={styles.lockedTitle}>{achievement.title}</Text>
          <Text style={styles.lockedDescription}>{achievement.description}</Text>
          
          {achievement.progress !== undefined && achievement.target && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[styles.progressFill, { width: `${progress}%` }]}
                />
              </View>
              <Text style={styles.progressText}>
                {achievement.progress}/{achievement.target}
              </Text>
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: '45%',
    marginBottom: 12,
  },
  unlockedCard: {
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  lockedCard: {
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  unlockedIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  lockedIcon: {
    fontSize: 32,
    marginBottom: 8,
    opacity: 0.6,
  },
  unlockedTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  lockedTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  unlockedDescription: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 16,
  },
  lockedDescription: {
    fontSize: 11,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 12,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    marginBottom: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  progressText: {
    fontSize: 10,
    color: colors.textLight,
    fontWeight: '500',
  },
});