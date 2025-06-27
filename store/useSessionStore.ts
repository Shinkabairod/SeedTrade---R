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

interface SessionStore {
  // Core state
  stats: Stats;
  sessions: Session[];
  achievements: Achievement[];
  activeMissionId: string;
  hasCompletedOnboarding: boolean;
  
  // UI state
  showSessionResult: boolean;
  lastSessionSuccess: boolean;
  
  // Settings
  notifications: boolean;
  userName: string;
  
  // Actions
  setActiveMission: (missionId: string) => void;
  completeSession: (success: boolean) => void;
  setShowSessionResult: (show: boolean) => void;
  setNotifications: (enabled: boolean) => void;
  setUserName: (name: string) => void;
  completeOnboarding: () => void;
  resetStore: () => void;
  updateAchievementProgress: (achievementId: string, progress: number) => void;
  unlockAchievement: (achievementId: string) => void;
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
      showSessionResult: false,
      lastSessionSuccess: false,
      notifications: true,
      userName: 'Eco-Warrior',

      // Actions
      setActiveMission: (missionId: string) => {
        set({ activeMissionId: missionId });
      },

      completeSession: (success: boolean) => {
        const state = get();
        const now = Date.now();
        
        // Create session record
        const newSession: Session = {
          id: `session_${now}`,
          missionId: state.activeMissionId,
          startTime: now - (success ? 1200000 : 300000), // Mock start time
          endTime: now,
          targetDuration: 20, // Mock target
          actualDuration: success ? 20 : 5, // Mock duration
          status: 'completed',
          points: success ? 200 : 0, // Mock points
        };

        // Update stats
        const newStats = { ...state.stats };
        if (success) {
          newStats.totalPoints += newSession.points;
          newStats.totalMinutes += newSession.actualDuration || 0;
          newStats.totalSessions += 1;
          newStats.currentStreak += 1;
          newStats.longestStreak = Math.max(newStats.longestStreak, newStats.currentStreak);
          
          // Update mission-specific stats
          if (state.activeMissionId === 'reforestation') {
            newStats.treesPlanted += Math.floor((newSession.actualDuration || 0) / 2);
          } else if (state.activeMissionId === 'ocean') {
            newStats.oceanCleaned += Math.floor((newSession.actualDuration || 0) / 3);
          } else if (state.activeMissionId === 'recycling') {
            newStats.materialsRecycled += Math.floor((newSession.actualDuration || 0) / 2);
          }
        }

        set({
          sessions: [newSession, ...state.sessions],
          stats: newStats,
          lastSessionSuccess: success,
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
    }
  )
);