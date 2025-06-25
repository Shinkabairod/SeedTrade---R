import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
}

interface SessionState {
  // User data
  stats: UserStats;
  sessions: Session[];
  currentSession: Session | null;
  activeMissionId: string;
  hasCompletedOnboarding: boolean;
  
  // Actions
  startSession: (duration: number) => void;
  completeSession: () => void;
  failSession: () => void;
  setActiveMission: (missionId: string) => void;
  completeOnboarding: () => void;
  resetStore: () => void;
}

const initialStats: UserStats = {
  totalSessions: 0,
  totalMinutes: 0,
  totalPoints: 0,
  currentStreak: 0,
  longestStreak: 0,
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      // Initial state
      stats: initialStats,
      sessions: [],
      currentSession: null,
      activeMissionId: 'reforestation',
      hasCompletedOnboarding: false,

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

      completeSession: () => {
        const { currentSession, sessions, stats } = get();
        
        if (!currentSession) return;
        
        const points = currentSession.duration * 2; // 2 points per minute
        const completedSession: Session = {
          ...currentSession,
          endTime: Date.now(),
          status: 'completed',
          points,
        };
        
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
        const lastSessionDate = stats.lastSessionDate;
        
        let newStreak = stats.currentStreak;
        if (!lastSessionDate || lastSessionDate === yesterday) {
          newStreak = stats.currentStreak + 1;
        } else if (lastSessionDate !== today) {
          newStreak = 1;
        }
        
        set({
          currentSession: null,
          sessions: [completedSession, ...sessions],
          stats: {
            ...stats,
            totalSessions: stats.totalSessions + 1,
            totalMinutes: stats.totalMinutes + currentSession.duration,
            totalPoints: stats.totalPoints + points,
            currentStreak: newStreak,
            longestStreak: Math.max(stats.longestStreak, newStreak),
            lastSessionDate: today,
          }
        });
      },

      failSession: () => {
        const { currentSession, sessions, stats } = get();
        
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
          stats: {
            ...stats,
            currentStreak: 0,
          }
        });
      },

      setActiveMission: (missionId: string) => {
        set({ activeMissionId: missionId });
      },

      completeOnboarding: () => {
        set({ hasCompletedOnboarding: true });
      },

      resetStore: () => {
        set({
          stats: initialStats,
          sessions: [],
          currentSession: null,
          activeMissionId: 'reforestation',
          hasCompletedOnboarding: false,
        });
      },
    }),
    {
      name: 'seedtrade-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);