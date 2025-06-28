import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type SessionStatus = 'active' | 'paused' | 'completed' | 'cancelled';

export interface Session {
  id: string;
  missionId: string;
  startTime: number;
  endTime?: number;
  targetDuration: number; // in minutes
  actualDuration?: number; // in minutes
  status: SessionStatus;
  points: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  target: number;
  progress: number;
  unlockedAt?: number;
}

export interface Stats {
  totalPoints: number;
  totalMinutes: number;
  totalSessions: number;
  currentStreak: number;
  longestStreak: number;
  weeklyData: number[]; // 7 days of minutes
  treesPlanted: number;
  oceanCleaned: number;
  materialsRecycled: number;
}

export interface CurrentSession {
  id: string;
  missionId: string;
  duration: number; // target duration in minutes
  startTime: number;
}

interface SessionStore {
  // Core state
  stats: Stats;
  sessions: Session[];
  achievements: Achievement[];
  activeMissionId: string;
  hasCompletedOnboarding: boolean;
  currentSession: CurrentSession | null;
  
  // UI state
  showSessionResult: boolean;
  lastSessionSuccess: boolean;
  
  // Settings
  notifications: boolean;
  userName: string;
  
  // Loading state
  isHydrated: boolean;
  
  // Actions
  setActiveMission: (missionId: string) => void;
  startSession: (duration: number) => void;
  completeSession: (success?: boolean) => void;
  failSession: () => void;
  setShowSessionResult: (show: boolean) => void;
  setNotifications: (enabled: boolean) => void;
  setUserName: (name: string) => void;
  completeOnboarding: () => void;
  resetStore: () => void;
  updateAchievementProgress: (achievementId: string, progress: number) => void;
  unlockAchievement: (achievementId: string) => void;
  setHydrated: () => void;
}

const initialStats: Stats = {
  totalPoints: 0,
  totalMinutes: 0,
  totalSessions: 0,
  currentStreak: 0,
  longestStreak: 0,
  weeklyData: [0, 0, 0, 0, 0, 0, 0],
  treesPlanted: 0,
  oceanCleaned: 0,
  materialsRecycled: 0,
};

const initialAchievements: Achievement[] = [
  {
    id: 'first_session',
    title: 'Premier pas',
    description: 'Termine ta première session',
    icon: '🎯',
    target: 1,
    progress: 0,
  },
  {
    id: 'streak_7',
    title: 'Persévérant',
    description: 'Maintiens une série de 7 jours',
    icon: '🔥',
    target: 7,
    progress: 0,
  },
  {
    id: 'trees_50',
    title: 'Eco-warrior',
    description: 'Plante 50 arbres virtuels',
    icon: '🌳',
    target: 50,
    progress: 0,
  },
  {
    id: 'sessions_100',
    title: 'Maître zen',
    description: 'Complète 100 sessions',
    icon: '🧘‍♂️',
    target: 100,
    progress: 0,
  },
  {
    id: 'marathon_60',
    title: 'Marathon',
    description: 'Termine une session de 60 minutes',
    icon: '⏰',
    target: 1,
    progress: 0,
  },
  {
    id: 'ocean_100',
    title: 'Océan protégé',
    description: 'Nettoie 100kg de déchets océaniques',
    icon: '🌊',
    target: 100,
    progress: 0,
  },
];

export const useSessionStore = create<SessionStore>()(
  persist(
    (set, get) => ({
      // Initial state
      stats: initialStats,
      sessions: [],
      achievements: initialAchievements,
      activeMissionId: 'reforestation',
      hasCompletedOnboarding: false,
      currentSession: null,
      showSessionResult: false,
      lastSessionSuccess: false,
      notifications: true,
      userName: 'Eco-Warrior',
      isHydrated: false,

      // Actions
      setHydrated: () => set({ isHydrated: true }),

      setActiveMission: (missionId: string) => {
        set({ activeMissionId: missionId });
      },

      startSession: (duration: number) => {
        const state = get();
        const newSession: CurrentSession = {
          id: `session_${Date.now()}`,
          missionId: state.activeMissionId,
          duration,
          startTime: Date.now(),
        };
        set({ currentSession: newSession });
      },

      completeSession: (success: boolean = true) => {
        const state = get();
        if (!state.currentSession) return;

        const now = Date.now();
        const sessionDuration = Math.floor((now - state.currentSession.startTime) / 60000); // minutes
        
        // Create session record
        const newSession: Session = {
          id: state.currentSession.id,
          missionId: state.currentSession.missionId,
          startTime: state.currentSession.startTime,
          endTime: now,
          targetDuration: state.currentSession.duration,
          actualDuration: sessionDuration,
          status: 'completed',
          points: success ? sessionDuration * 2 : 0, // 2 points per minute if successful
        };

        // Calculate streak
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        const lastSessionDate = state.sessions.length > 0 
          ? new Date(state.sessions[state.sessions.length - 1].startTime).toDateString()
          : null;

        let newStreak = 1;
        if (lastSessionDate === today) {
          newStreak = state.stats.currentStreak; // Same day, keep streak
        } else if (lastSessionDate === yesterday) {
          newStreak = state.stats.currentStreak + 1; // Consecutive day
        }

        // Update stats
        const newStats: Stats = {
          ...state.stats,
          totalPoints: state.stats.totalPoints + newSession.points,
          totalMinutes: state.stats.totalMinutes + sessionDuration,
          totalSessions: state.stats.totalSessions + 1,
          currentStreak: newStreak,
          longestStreak: Math.max(state.stats.longestStreak, newStreak),
        };

        set({
          sessions: [...state.sessions, newSession],
          stats: newStats,
          currentSession: null,
          showSessionResult: true,
          lastSessionSuccess: success,
        });

        // Update achievements
        get().updateAchievementProgress('first_session', 1);
        get().updateAchievementProgress('sessions_100', newStats.totalSessions);
        get().updateAchievementProgress('streak_7', newStreak);
        
        if (sessionDuration >= 60) {
          get().updateAchievementProgress('marathon_60', 1);
        }
      },

      failSession: () => {
        const state = get();
        if (!state.currentSession) return;

        const newSession: Session = {
          id: state.currentSession.id,
          missionId: state.currentSession.missionId,
          startTime: state.currentSession.startTime,
          endTime: Date.now(),
          targetDuration: state.currentSession.duration,
          actualDuration: 0,
          status: 'cancelled',
          points: 0,
        };

        set({
          sessions: [...state.sessions, newSession],
          currentSession: null,
          showSessionResult: true,
          lastSessionSuccess: false,
        });
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

      completeOnboarding: () => {
        set({ hasCompletedOnboarding: true });
      },

      resetStore: () => {
        set({
          stats: initialStats,
          sessions: [],
          achievements: initialAchievements,
          activeMissionId: 'reforestation',
          hasCompletedOnboarding: false,
          currentSession: null,
          showSessionResult: false,
          lastSessionSuccess: false,
          notifications: true,
          userName: 'Eco-Warrior',
        });
      },

      updateAchievementProgress: (achievementId: string, progress: number) => {
        const state = get();
        const achievements = state.achievements.map(achievement => {
          if (achievement.id === achievementId) {
            const newProgress = Math.min(progress, achievement.target);
            const wasUnlocked = achievement.progress >= achievement.target;
            const isNowUnlocked = newProgress >= achievement.target;
            
            if (!wasUnlocked && isNowUnlocked) {
              get().unlockAchievement(achievementId);
            }
            
            return {
              ...achievement,
              progress: newProgress,
            };
          }
          return achievement;
        });
        
        set({ achievements });
      },

      unlockAchievement: (achievementId: string) => {
        const state = get();
        const achievements = state.achievements.map(achievement => {
          if (achievement.id === achievementId && !achievement.unlockedAt) {
            return {
              ...achievement,
              unlockedAt: Date.now(),
            };
          }
          return achievement;
        });
        
        set({ achievements });
      },
    }),
    {
      name: 'seedtrade-session-store',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);