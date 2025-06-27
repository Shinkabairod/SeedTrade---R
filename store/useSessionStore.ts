import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { defaultAchievements, Achievement } from '@/constants/achievements';

export interface Session {
  id: string;
  missionId: string;
  duration: number; // in minutes
  startTime: number;
  endTime?: number;
  status: 'active' | 'completed' | 'failed';
  points: number;
}

export interface UserStats {
  totalSessions: number;
  totalMinutes: number;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  lastSessionDate?: string;
  weeklyData: number[];
  treesPlanted: number;
  oceanCleaned: number;
  materialsRecycled: number;
}

interface SessionState {
  // User data
  stats: UserStats;
  sessions: Session[];
  achievements: Achievement[];
  currentSession: Session | null;
  activeMissionId: string;
  hasCompletedOnboarding: boolean;
  
  // UI state
  showSessionResult: boolean;
  lastSessionSuccess: boolean;
  notifications: boolean;
  userName: string;
  
  // Actions
  startSession: (duration: number) => void;
  completeSession: (success?: boolean) => void;
  failSession: () => void;
  setActiveMission: (missionId: string) => void;
  completeOnboarding: () => void;
  updateAchievements: (achievements: Achievement[]) => void;
  setShowSessionResult: (show: boolean) => void;
  setNotifications: (enabled: boolean) => void;
  setUserName: (name: string) => void;
  resetStore: () => void;
}

const initialStats: UserStats = {
  totalSessions: 0,
  totalMinutes: 0,
  totalPoints: 0,
  currentStreak: 0,
  longestStreak: 0,
  weeklyData: [0, 0, 0, 0, 0, 0, 0],
  treesPlanted: 0,
  oceanCleaned: 0,
  materialsRecycled: 0,
};

export const useSessionStore = create<SessionState>()(
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
      startSession: (duration: number) => {
        const newSession: Session = {
          id: Date.now().toString(),
          missionId: get().activeMissionId,
          duration,
          startTime: Date.now(),
          status: 'active',
          points: 0,
        };
        
        set({ currentSession: newSession });
      },

      completeSession: (success = true) => {
        const { currentSession, sessions, stats, activeMissionId } = get();
        
        if (!currentSession) return;
        
        const sessionTimeMinutes = Math.floor((Date.now() - currentSession.startTime) / 60000);
        const actualDuration = Math.min(sessionTimeMinutes, currentSession.duration);
        
        // Calculate points based on mission
        let pointsPerMinute = 2; // default
        switch (activeMissionId) {
          case 'reforestation':
            pointsPerMinute = 10;
            break;
          case 'ocean':
            pointsPerMinute = 8;
            break;
          case 'recycling':
            pointsPerMinute = 12;
            break;
        }
        
        const points = success ? actualDuration * pointsPerMinute : 0;
        const impactAmount = success ? actualDuration : 0;
        
        const completedSession: Session = {
          ...currentSession,
          endTime: Date.now(),
          status: success ? 'completed' : 'failed',
          points,
        };
        
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
        const lastSessionDate = stats.lastSessionDate;
        
        let newStreak = stats.currentStreak;
        if (success) {
          if (!lastSessionDate || lastSessionDate === yesterday) {
            newStreak = stats.currentStreak + 1;
          } else if (lastSessionDate !== today) {
            newStreak = 1;
          }
        } else {
          newStreak = 0;
        }
        
        // Update weekly data (simplified)
        const newWeeklyData = [...stats.weeklyData];
        const dayOfWeek = new Date().getDay();
        newWeeklyData[dayOfWeek] = Math.min(newWeeklyData[dayOfWeek] + (success ? actualDuration : 0), 100);
        
        // Update impact based on mission
        let newTreesPlanted = stats.treesPlanted;
        let newOceanCleaned = stats.oceanCleaned;
        let newMaterialsRecycled = stats.materialsRecycled;
        
        if (success) {
          switch (activeMissionId) {
            case 'reforestation':
              newTreesPlanted += impactAmount;
              break;
            case 'ocean':
              newOceanCleaned += impactAmount;
              break;
            case 'recycling':
              newMaterialsRecycled += impactAmount;
              break;
          }
        }
        
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
    }
  )
);