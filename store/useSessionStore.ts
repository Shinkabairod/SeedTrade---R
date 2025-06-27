import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Session {
  id: string;
  missionId: string;
  startTime: number;
  endTime?: number;
  targetDuration: number;
  actualDuration?: number;
  status: 'active' | 'completed' | 'failed';
  points: number;
}

export interface Stats {
  totalSessions: number;
  totalMinutes: number;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  lastSessionDate: string | null;
  weeklyData: number[];
  treesPlanted: number;
  oceanCleaned: number;
  materialsRecycled: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: number;
  progress: number;
  target: number;
}

interface SessionStore {
  // State
  stats: Stats;
  sessions: Session[];
  achievements: Achievement[];
  currentSession: Session | null;
  activeMissionId: string;
  hasCompletedOnboarding: boolean;
  showSessionResult: boolean;
  lastSessionSuccess: boolean;
  notifications: boolean;
  userName: string;

  // Actions
  startSession: (missionId: string, targetDuration: number) => void;
  completeSession: (success: boolean) => void;
  failSession: () => void;
  setActiveMission: (missionId: string) => void;
  completeOnboarding: () => void;
  updateAchievements: (achievements: Achievement[]) => void;
  setShowSessionResult: (show: boolean) => void;
  setNotifications: (enabled: boolean) => void;
  setUserName: (name: string) => void;
  resetStore: () => void;
}

const initialStats: Stats = {
  totalSessions: 0,
  totalMinutes: 0,
  totalPoints: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastSessionDate: null,
  weeklyData: [0, 0, 0, 0, 0, 0, 0],
  treesPlanted: 0,
  oceanCleaned: 0,
  materialsRecycled: 0,
};

const defaultAchievements: Achievement[] = [
  {
    id: 'first_session',
    title: 'Premier pas',
    description: 'Terminer votre première session',
    icon: '🌱',
    progress: 0,
    target: 1,
  },
  {
    id: 'weekly_warrior',
    title: 'Guerrier hebdomadaire',
    description: 'Terminer 7 sessions en une semaine',
    icon: '⚡',
    progress: 0,
    target: 7,
  },
  {
    id: 'tree_planter',
    title: 'Planteur d\'arbres',
    description: 'Planter 10 arbres',
    icon: '🌳',
    progress: 0,
    target: 10,
  },
  {
    id: 'zen_master',
    title: 'Maître zen',
    description: 'Terminer 100 sessions',
    icon: '🧘‍♂️',
    progress: 0,
    target: 100,
  },
  {
    id: 'marathon',
    title: 'Marathon',
    description: 'Session de 60 minutes',
    icon: '⏰',
    progress: 0,
    target: 1,
  },
  {
    id: 'ocean_protector',
    title: 'Protecteur des océans',
    description: 'Nettoyer 100kg de déchets',
    icon: '🌊',
    progress: 0,
    target: 100,
  },
  {
    id: 'persistent',
    title: 'Persévérant',
    description: 'Série de 7 jours',
    icon: '🔥',
    progress: 0,
    target: 7,
  },
  {
    id: 'eco_warrior',
    title: 'Eco-warrior',
    description: '1000 points gagnés',
    icon: '🌍',
    progress: 0,
    target: 1000,
  },
];

export const useSessionStore = create<SessionStore>()(
  persist(
    (set, get) => ({
      // Initial state
      stats: initialStats,
      sessions: [],
      achievements: defaultAchievements,
      currentSession: null,
      activeMissionId: 'reforestation',
      hasCompletedOnboarding: false,
      showSessionResult: false,
      lastSessionSuccess: false,
      notifications: true,
      userName: 'Eco-Warrior',

      // Actions
      startSession: (missionId: string, targetDuration: number) => {
        const newSession: Session = {
          id: Date.now().toString(),
          missionId,
          startTime: Date.now(),
          targetDuration,
          status: 'active',
          points: 0,
        };

        set({ currentSession: newSession });
      },

      completeSession: (success: boolean) => {
        const { currentSession, sessions, stats, achievements } = get();
        
        if (!currentSession) return;
        
        const endTime = Date.now();
        const actualDuration = Math.floor((endTime - currentSession.startTime) / 60000);
        const points = success ? actualDuration * 10 : 0; // 10 points par minute

        const completedSession: Session = {
          ...currentSession,
          endTime,
          actualDuration,
          status: success ? 'completed' : 'failed',
          points,
        };

        // Update stats
        const today = new Date().toDateString();
        const isNewDay = stats.lastSessionDate !== today;
        const newStreak = success ? (isNewDay ? stats.currentStreak + 1 : stats.currentStreak) : 0;

        // Update weekly data
        const dayOfWeek = new Date().getDay();
        const newWeeklyData = [...stats.weeklyData];
        if (success) {
          newWeeklyData[dayOfWeek] += actualDuration;
        }

        // Calculate impact metrics
        const newTreesPlanted = success ? stats.treesPlanted + Math.floor(points / 100) : stats.treesPlanted;
        const newOceanCleaned = success ? stats.oceanCleaned + Math.floor(points / 50) : stats.oceanCleaned;
        const newMaterialsRecycled = success ? stats.materialsRecycled + Math.floor(points / 75) : stats.materialsRecycled;

        // Update achievements
        const updatedAchievements = achievements.map(achievement => {
          if (achievement.unlockedAt) return achievement;
          
          let newProgress = achievement.progress;
          let shouldUnlock = false;
          
          switch (achievement.id) {
            case 'first_session':
              if (success) {
                newProgress = 1;
                shouldUnlock = true;
              }
              break;
            case 'weekly_warrior':
              newProgress = Math.min(stats.totalSessions + (success ? 1 : 0), achievement.target);
              shouldUnlock = newProgress >= achievement.target;
              break;
            case 'tree_planter':
              newProgress = newTreesPlanted;
              shouldUnlock = newProgress >= achievement.target;
              break;
            case 'zen_master':
              newProgress = stats.totalSessions + (success ? 1 : 0);
              shouldUnlock = newProgress >= achievement.target;
              break;
            case 'marathon':
              if (success && actualDuration >= 60) {
                newProgress = 1;
                shouldUnlock = true;
              }
              break;
            case 'ocean_protector':
              newProgress = newOceanCleaned;
              shouldUnlock = newProgress >= achievement.target;
              break;
            case 'persistent':
              newProgress = newStreak;
              shouldUnlock = newProgress >= achievement.target;
              break;
            case 'eco_warrior':
              newProgress = stats.totalPoints + points;
              shouldUnlock = newProgress >= achievement.target;
              break;
          }
          
          return {
            ...achievement,
            progress: newProgress,
            unlockedAt: shouldUnlock ? Date.now() : achievement.unlockedAt,
          };
        });

        set({
          currentSession: null,
          sessions: [completedSession, ...sessions],
          achievements: updatedAchievements,
          stats: {
            ...stats,
            totalSessions: success ? stats.totalSessions + 1 : stats.totalSessions,
            totalMinutes: stats.totalMinutes + actualDuration,
            totalPoints: stats.totalPoints + points,
            currentStreak: newStreak,
            longestStreak: Math.max(stats.longestStreak, newStreak),
            lastSessionDate: success ? today : stats.lastSessionDate,
            weeklyData: newWeeklyData,
            treesPlanted: newTreesPlanted,
            oceanCleaned: newOceanCleaned,
            materialsRecycled: newMaterialsRecycled,
          },
          showSessionResult: true,
          lastSessionSuccess: success,
        });
      },

      failSession: () => {
        const { currentSession, sessions } = get();
        
        if (!currentSession) return;
        
        const failedSession: Session = {
          ...currentSession,
          endTime: Date.now(),
          status: 'failed',
          points: 0,
        };
        
        set({
          currentSession: null,
          sessions: [failedSession, ...sessions],
          showSessionResult: true,
          lastSessionSuccess: false,
        });
      },

      setActiveMission: (missionId: string) => {
        set({ activeMissionId: missionId });
      },

      completeOnboarding: () => {
        set({ hasCompletedOnboarding: true });
      },

      updateAchievements: (achievements: Achievement[]) => {
        set({ achievements });
      },

      setShowSessionResult: (show: boolean) => {
        set({ showSessionResult: show });
      },

      setNotifications: (enabled: boolean) => {
        set({ notifications: enabled });
      },

      setUserName: (name: string) => {
        set({ userName: name });
      },

      resetStore: () => {
        set({
          stats: initialStats,
          sessions: [],
          achievements: defaultAchievements,
          currentSession: null,
          activeMissionId: 'reforestation',
          hasCompletedOnboarding: false,
          showSessionResult: false,
          lastSessionSuccess: false,
          notifications: true,
          userName: 'Eco-Warrior',
        });
      },
    }),
    {
      name: 'seedtrade-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Ignore hydration errors to avoid crashes
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.log('Error rehydrating store:', error);
        }
      },
    }
  )
);