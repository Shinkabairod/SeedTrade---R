export type SessionStatus = "idle" | "active" | "completed" | "failed";

export type Session = {
  id: string;
  missionId: string;
  duration: number; // in minutes
  startTime: number; // timestamp
  endTime: number | null; // timestamp
  status: SessionStatus;
  points: number;
};

export type UserStats = {
  totalSessions: number;
  completedSessions: number;
  totalMinutes: number;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
};