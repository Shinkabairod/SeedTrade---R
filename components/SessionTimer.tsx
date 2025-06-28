import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Pause, Play, Square } from 'lucide-react-native';
import colors from '@/constants/colors';

interface SessionTimerProps {
  duration: number; // en minutes
  onComplete: () => void;
  onCancel: () => void;
}

export default function SessionTimer({ duration, onComplete, onCancel }: SessionTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // en secondes
  const [isActive, setIsActive] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      onComplete();
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, timeLeft, onComplete]);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <View style={styles.progressRing}>
          <View style={[styles.progressFill, { height: `${progress}%` }]} />
        </View>
        
        <View style={styles.timeDisplay}>
          <Text style={styles.timeText}>{formatTime(timeLeft)}</Text>
          <Text style={styles.durationText}>/ {duration} min</Text>
        </View>
      </View>
      
      <View style={styles.controls}>
        <TouchableOpacity 
          style={[styles.controlButton, styles.secondaryButton]}
          onPress={togglePause}
        >
          {isPaused ? (
            <Play size={24} color={colors.primary} />
          ) : (
            <Pause size={24} color={colors.primary} />
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.controlButton, styles.dangerButton]}
          onPress={onCancel}
        >
          <Square size={24} color={colors.error} />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.statusText}>
        {isPaused ? 'Session en pause' : 'Session en cours...'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  timerContainer: {
    position: 'relative',
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  progressRing: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 125,
    borderWidth: 8,
    borderColor: colors.borderLight,
    overflow: 'hidden',
  },
  progressFill: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.primary,
  },
  timeDisplay: {
    alignItems: 'center',
  },
  timeText: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  durationText: {
    fontSize: 18,
    color: colors.textLight,
  },
  controls: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 30,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: colors.primary + '20',
  },
  dangerButton: {
    backgroundColor: colors.error + '20',
  },
  statusText: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
  },
});