import { useState, useEffect, useRef } from 'react';

export interface TimerState {
  time: number;
  isActive: boolean;
  isPaused: boolean;
  targetDuration: number;
}

export const useTimer = (onComplete?: () => void) => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [targetDuration, setTargetDuration] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime + 1;
          
          // Auto-complete when target reached
          if (newTime >= targetDuration * 60) {
            setIsActive(false);
            setIsPaused(false);
            onComplete?.();
            return targetDuration * 60;
          }
          
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, isPaused, targetDuration, onComplete]);

  const start = (duration: number) => {
    setTargetDuration(duration);
    setTime(0);
    setIsActive(true);
    setIsPaused(false);
  };

  const pause = () => {
    setIsPaused(!isPaused);
  };

  const stop = () => {
    setIsActive(false);
    setIsPaused(false);
    setTime(0);
  };

  const complete = () => {
    setIsActive(false);
    setIsPaused(false);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = (): number => {
    if (targetDuration === 0) return 0;
    return Math.min((time / (targetDuration * 60)) * 100, 100);
  };

  return {
    time,
    isActive,
    isPaused,
    targetDuration,
    start,
    pause,
    stop,
    complete,
    formatTime,
    getProgress,
    state: {
      time,
      isActive,
      isPaused,
      targetDuration
    } as TimerState
  };
};