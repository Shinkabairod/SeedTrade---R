import { useSessionStore } from '@/store/useSessionStore';

export function useAchievements() {
  const { 
    stats, 
    achievements, 
    updateAchievementProgress, 
    unlockAchievement 
  } = useSessionStore();

  const checkAchievements = (earnedPoints: number, sessionTimeSeconds: number, missionId: string) => {
    const sessionTimeMinutes = Math.floor(sessionTimeSeconds / 60);
    
    // Check first session achievement
    const firstSessionAchievement = achievements.find(a => a.id === 'first_session');
    if (firstSessionAchievement && !firstSessionAchievement.unlockedAt && stats.totalSessions === 0) {
      unlockAchievement('first_session');
    }

    // Check streak achievement
    const streakAchievement = achievements.find(a => a.id === 'streak_7');
    if (streakAchievement && !streakAchievement.unlockedAt) {
      updateAchievementProgress('streak_7', stats.currentStreak + 1);
      if (stats.currentStreak + 1 >= 7) {
        unlockAchievement('streak_7');
      }
    }

    // Check trees achievement
    if (missionId === 'reforestation') {
      const treesAchievement = achievements.find(a => a.id === 'trees_50');
      if (treesAchievement && !treesAchievement.unlockedAt) {
        const newTreesCount = stats.treesPlanted + Math.floor(sessionTimeMinutes / 2);
        updateAchievementProgress('trees_50', newTreesCount);
        if (newTreesCount >= 50) {
          unlockAchievement('trees_50');
        }
      }
    }

    // Check ocean achievement
    if (missionId === 'ocean') {
      const oceanAchievement = achievements.find(a => a.id === 'ocean_100');
      if (oceanAchievement && !oceanAchievement.unlockedAt) {
        const newOceanCount = stats.oceanCleaned + Math.floor(sessionTimeMinutes / 3);
        updateAchievementProgress('ocean_100', newOceanCount);
        if (newOceanCount >= 100) {
          unlockAchievement('ocean_100');
        }
      }
    }

    // Check sessions achievement
    const sessionsAchievement = achievements.find(a => a.id === 'sessions_100');
    if (sessionsAchievement && !sessionsAchievement.unlockedAt) {
      const newSessionsCount = stats.totalSessions + 1;
      updateAchievementProgress('sessions_100', newSessionsCount);
      if (newSessionsCount >= 100) {
        unlockAchievement('sessions_100');
      }
    }

    // Check marathon achievement
    const marathonAchievement = achievements.find(a => a.id === 'marathon_60');
    if (marathonAchievement && !marathonAchievement.unlockedAt && sessionTimeMinutes >= 60) {
      unlockAchievement('marathon_60');
    }
  };

  return {
    checkAchievements,
  };
}