import { useState, useRef, useCallback } from 'react';

export interface TimerState {
  time: number; // seconds elapsed
  isActive: boolean;
  isPaused: boolean;
  targetDuration: number; // target duration in minutes
}

export interface TimerActions {
  start: (durationMinutes: number) => void;
  pause: () => void;
  resume: () => void;
  complete: () => void;
  reset: () => void;
  getProgress: () => number; // percentage 0-100
}

export function useTimer(onComplete?: () => void): TimerState & TimerActions {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [targetDuration, setTargetDuration] = useState(0);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback((durationMinutes: number) => {
    setTargetDuration(durationMinutes);
    setTime(0);
    setIsActive(true);
    setIsPaused(false);
    
    intervalRef.current = setInterval(() => {
      setTime(prevTime => {
        const newTime = prevTime + 1;
        
        // Check if target duration is reached
        if (newTime >= durationMinutes * 60) {
          setIsActive(false);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          if (onComplete) {
            onComplete();
          }
          return durationMinutes * 60;
        }
        
        return newTime;
      });
    }, 1000);
  }, [onComplete]);

  const pause = useCallback(() => {
    if (isActive) {
      if (isPaused) {
        // Resume
        setIsPaused(false);
        intervalRef.current = setInterval(() => {
          setTime(prevTime => {
            const newTime = prevTime + 1;
            
            if (newTime >= targetDuration * 60) {
              setIsActive(false);
              if (intervalRef.current) {
                clearInterval(intervalRef.current);
              }
              if (onComplete) {
                onComplete();
              }
              return targetDuration * 60;
            }
            
            return newTime;
          });
        }, 1000);
      } else {
        // Pause
        setIsPaused(true);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
    }
  }, [isActive, isPaused, targetDuration, onComplete]);

  const resume = useCallback(() => {
    if (isPaused) {
      setIsPaused(false);
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime + 1;
          
          if (newTime >= targetDuration * 60) {
            setIsActive(false);
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            if (onComplete) {
              onComplete();
            }
            return targetDuration * 60;
          }
          
          return newTime;
        });
      }, 1000);
    }
  }, [isPaused, targetDuration, onComplete]);

  const complete = useCallback(() => {
    setIsActive(false);
    setIsPaused(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const reset = useCallback(() => {
    setTime(0);
    setIsActive(false);
    setIsPaused(false);
    setTargetDuration(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const getProgress = useCallback(() => {
    if (targetDuration === 0) return 0;
    return Math.min((time / (targetDuration * 60)) * 100, 100);
  }, [time, targetDuration]);

  return {
    time,
    isActive,
    isPaused,
    targetDuration,
    start,
    pause,
    resume,
    complete,
    reset,
    getProgress,
  };
}