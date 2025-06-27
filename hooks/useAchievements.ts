import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useSessionStore } from '@/store/useSessionStore';
import { Achievement } from '@/constants/achievements';

export const useAchievements = () => {
  const { achievements, stats, updateAchievements } = useSessionStore();

  const checkAchievements = useCallback((
    earnedPoints: number, 
    sessionTime: number, 
    missionId: string
  ) => {
    const updatedAchievements = achievements.map(achievement => {
      if (achievement.unlocked) return achievement;

      let shouldUnlock = false;
      let newProgress = achievement.progress || 0;

      switch (achievement.id) {
        case 1: // Premier pas
          shouldUnlock = stats.totalSessions >= 1;
          break;
        case 2: // Persévérant - 7 jours de suite
          newProgress = stats.currentStreak;
          shouldUnlock = stats.currentStreak >= 7;
          break;
        case 3: // Eco-warrior - 50 arbres
          newProgress = stats.treesPlanted || 0;
          shouldUnlock = (stats.treesPlanted || 0) >= 50;
          break;
        case 4: // Maître zen - 100 sessions
          newProgress = stats.totalSessions;
          shouldUnlock = stats.totalSessions >= 100;
          break;
        case 5: // Marathon - 60 min session
          if (sessionTime >= 3600) { // 60 minutes
            newProgress = 1;
            shouldUnlock = true;
          }
          break;
        case 6: // Océan protégé - 100kg
          newProgress = stats.oceanCleaned || 0;
          shouldUnlock = (stats.oceanCleaned || 0) >= 100;
          break;
        case 7: // Débutant déterminé - 10 sessions
          newProgress = stats.totalSessions;
          shouldUnlock = stats.totalSessions >= 10;
          break;
        case 8: // Gardien de la planète - 1000 points
          newProgress = stats.totalPoints;
          shouldUnlock = stats.totalPoints >= 1000;
          break;
      }

      const updated = {
        ...achievement,
        progress: newProgress,
        unlocked: shouldUnlock
      };

      // Show achievement notification
      if (shouldUnlock && !achievement.unlocked) {
        setTimeout(() => {
          Alert.alert(
            '🎉 Nouveau succès !',
            `${achievement.title}\n${achievement.description}`,
            [{ text: 'Super !', style: 'default' }]
          );
        }, 1000);
      }

      return updated;
    });

    updateAchievements(updatedAchievements);
  }, [achievements, stats, updateAchievements]);

  const getUnlockedCount = useCallback(() => {
    return achievements.filter(a => a.unlocked).length;
  }, [achievements]);

  const getProgressAchievements = useCallback(() => {
    return achievements.filter(a => !a.unlocked && a.progress !== undefined);
  }, [achievements]);

  return {
    achievements,
    checkAchievements,
    getUnlockedCount,
    getProgressAchievements
  };
};