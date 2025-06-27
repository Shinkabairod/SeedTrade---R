import { useSessionStore } from '@/store/useSessionStore';
import { Alert } from 'react-native';

export function useAchievements() {
  const { achievements, updateAchievementProgress, unlockAchievement, stats } = useSessionStore();

  const checkAchievements = (earnedPoints: number, sessionTimeSeconds: number, missionId: string) => {
    const sessionTimeMinutes = Math.floor(sessionTimeSeconds / 60);
    
    achievements.forEach((achievement) => {
      if (achievement.unlockedAt) return; // Already unlocked
      
      let newProgress = achievement.progress;
      let shouldUnlock = false;
      
      switch (achievement.id) {
        case 'first_session':
          newProgress = stats.totalSessions + 1;
          shouldUnlock = newProgress >= 1;
          break;
          
        case 'streak_7':
          newProgress = stats.currentStreak + 1;
          shouldUnlock = newProgress >= 7;
          break;
          
        case 'trees_50':
          if (missionId === 'reforestation') {
            newProgress = stats.treesPlanted + Math.floor(sessionTimeMinutes / 2);
          } else {
            newProgress = stats.treesPlanted;
          }
          shouldUnlock = newProgress >= 50;
          break;
          
        case 'sessions_100':
          newProgress = stats.totalSessions + 1;
          shouldUnlock = newProgress >= 100;
          break;
          
        case 'marathon_60':
          if (sessionTimeMinutes >= 60) {
            newProgress = 1;
            shouldUnlock = true;
          }
          break;
          
        case 'ocean_100':
          if (missionId === 'ocean') {
            newProgress = stats.oceanCleaned + Math.floor(sessionTimeMinutes / 3);
          } else {
            newProgress = stats.oceanCleaned;
          }
          shouldUnlock = newProgress >= 100;
          break;
      }
      
      // Update progress
      if (newProgress !== achievement.progress) {
        updateAchievementProgress(achievement.id, newProgress);
      }
      
      // Unlock achievement if target reached
      if (shouldUnlock) {
        unlockAchievement(achievement.id);
        
        // Show achievement notification
        setTimeout(() => {
          Alert.alert(
            '🏆 Nouveau succès !',
            `${achievement.title}\n${achievement.description}`,
            [{ text: 'Super !', style: 'default' }]
          );
        }, 1000);
      }
    });
  };

  return {
    checkAchievements,
  };
}