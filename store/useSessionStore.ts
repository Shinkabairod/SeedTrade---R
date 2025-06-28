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
          points: success ? sessionDuration * 10 : 0, // 10 points per minute
        };

        // Update stats
        const newStats = { ...state.stats };
        if (success) {
          newStats.totalPoints += newSession.points;
          newStats.totalMinutes += sessionDuration;
          newStats.totalSessions += 1;
          newStats.currentStreak += 1;
          newStats.longestStreak = Math.max(newStats.longestStreak, newStats.currentStreak);
          
          // Update mission-specific stats
          if (state.activeMissionId === 'reforestation') {
            newStats.treesPlanted += Math.floor(sessionDuration / 2);
          } else if (state.activeMissionId === 'ocean') {
            newStats.oceanCleaned += Math.floor(sessionDuration / 3);
          } else if (state.activeMissionId === 'recycling') {
            newStats.materialsRecycled += Math.floor(sessionDuration / 2);
          }
        }

        set({
          sessions: [newSession, ...state.sessions],
          stats: newStats,
          currentSession: null,
          lastSessionSuccess: success,
          showSessionResult: true,
        });
      },

      failSession: () => {
        const state = get();
        if (!state.currentSession) return;

        set({
          currentSession: null,
          lastSessionSuccess: false,
          showSessionResult: true,
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
        set((state) => ({
          achievements: state.achievements.map((achievement) =>
            achievement.id === achievementId
              ? { ...achievement, progress }
              : achievement
          ),
        }));
      },

      unlockAchievement: (achievementId: string) => {
        set((state) => ({
          achievements: state.achievements.map((achievement) =>
            achievement.id === achievementId
              ? { ...achievement, unlockedAt: Date.now() }
              : achievement
          ),
        }));
      },
    }),
    {
      name: 'session-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        stats: state.stats,
        sessions: state.sessions,
        achievements: state.achievements,
        activeMissionId: state.activeMissionId,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        notifications: state.notifications,
        userName: state.userName,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);