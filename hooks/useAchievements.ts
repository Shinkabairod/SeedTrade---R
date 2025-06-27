import { useSessionStore } from '@/store/useSessionStore';
import { Alert } from 'react-native';

export const useAchievements = () => {
  const { achievements, updateAchievements } = useSessionStore();

  const checkAchievements = (earnedPoints: number, sessionTime: number, missionId: string) => {
    const updatedAchievements = achievements.map(achievement => {
      if (achievement.unlockedAt) return achievement;
      
      let newProgress = achievement.progress;
      let shouldUnlock = false;
      
      switch (achievement.id) {
        case 'first_session':
          newProgress = 1;
          shouldUnlock = true;
          break;
        case 'marathon':
          if (sessionTime >= 3600) { // 60 minutes
            newProgress = 1;
            shouldUnlock = true;
          }
          break;
        // Add more achievement logic here
      }
      
      if (shouldUnlock && !achievement.unlockedAt) {
        // Show achievement notification
        setTimeout(() => {
          Alert.alert(
            '🎉 Nouveau succès !',
            `Tu as débloqué : ${achievement.title}`,
            [{ text: 'Super !', style: 'default' }]
          );
        }, 1000);
      }
      
      return {
        ...achievement,
        progress: newProgress,
        unlockedAt: shouldUnlock ? Date.now() : achievement.unlockedAt,
      };
    });

    updateAchievements(updatedAchievements);
  };

  return {
    checkAchievements,
  };
};