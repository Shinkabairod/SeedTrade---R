import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Session, SessionStatus, UserStats } from "@/types";
import { missions } from "@/constants/missions";

interface SessionState {
  currentSession: Session | null;
  sessions: Session[];
  stats: UserStats;
  activeMissionId: string;
  startSession: (duration: number) => void;
  completeSession: () => void;
  failSession: () => void;
  setActiveMission: (missionId: string) => void;
}

const initialStats: UserStats = {
  totalSessions: 0,
  completedSessions: 0,
  totalMinutes: 0,
  totalPoints: 0,
  currentStreak: 0,
  longestStreak: 0,
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      currentSession: null,
      sessions: [],
      stats: initialStats,
      activeMissionId: missions[0].id,

      startSession: (duration: number) => {
        const session: Session = {
          id: Date.now().toString(),
          missionId: get().activeMissionId,
          duration,
          startTime: Date.now(),
          endTime: null,
          status: "active",
          points: 0,
        };

        set({ 
          currentSession: session,
          stats: {
            ...get().stats,
            totalSessions: get().stats.totalSessions + 1,
          }
        });
      },

      completeSession: () => {
        const { currentSession, sessions, stats } = get();
        
        if (!currentSession) return;
        
        const mission = missions.find(m => m.id === currentSession.missionId);
        if (!mission) return;
        
        const points = currentSession.duration * mission.pointsPerMinute;
        
        const completedSession: Session = {
          ...currentSession,
          endTime: Date.now(),
          status: "completed",
          points,
        };
        
        const newStreak = stats.currentStreak + 1;
        
        set({
          currentSession: null,
          sessions: [completedSession, ...sessions],
          stats: {
            ...stats,
            completedSessions: stats.completedSessions + 1,
            totalMinutes: stats.totalMinutes + currentSession.duration,
            totalPoints: stats.totalPoints + points,
            currentStreak: newStreak,
            longestStreak: Math.max(stats.longestStreak, newStreak),
          }
        });
      },

      failSession: () => {
        const { currentSession, sessions, stats } = get();
        
        if (!currentSession) return;
        
        const failedSession: Session = {
          ...currentSession,
          endTime: Date.now(),
          status: "failed",
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
    }),
    {
      name: "seedtrade-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);