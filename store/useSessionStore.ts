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
  completeSession: () => void;
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

      completeSession: () => {
        const { currentSession, sessions, stats } = get();
        
        if (!currentSession) return;
        
        const endTime = Date.now();
        const actualDuration = Math.floor((endTime - currentSession.startTime) / 60000);
        const success = actualDuration >= currentSession.targetDuration;
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

        set({
          currentSession: null,
          sessions: [completedSession, ...sessions],
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