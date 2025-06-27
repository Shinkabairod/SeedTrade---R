import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Animated, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Mission } from "@/constants/missions";
import colors from "@/constants/colors";

type SessionTimerProps = {
  duration: number; // in minutes
  mission: Mission;
  onComplete: () => void;
  onExit: () => void;
};

const { width, height } = Dimensions.get("window");

export default function SessionTimer({ duration, mission, onComplete, onExit }: SessionTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // Convert to seconds
  const [isActive, setIsActive] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Animation values
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          
          // Update progress animation
          const progress = (duration * 60 - newTime) / (duration * 60);
          Animated.timing(progressAnim, {
            toValue: progress,
            duration: 100,
            useNativeDriver: false,
          }).start();
          
          if (newTime <= 0) {
            onComplete();
            return 0;
          }
          
          return newTime;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft, duration, onComplete]);

  // Pulse animation for timer
  useEffect(() => {
    if (isActive) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [isActive]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getPhaseMessage = (): string => {
    const elapsed = duration * 60 - timeLeft;
    const progress = elapsed / (duration * 60);
    
    if (progress < 0.25) return "🌱 Respire profondément";
    if (progress < 0.5) return "🧘‍♂️ Tu es dans le flow";
    if (progress < 0.75) return "⚡ Concentration maximale";
    return "🏆 Tu es un champion !";
  };

  const elapsedMinutes = Math.floor((duration * 60 - timeLeft) / 60);
  const estimatedPoints = elapsedMinutes * mission.pointsPerMinute;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Background */}
      <LinearGradient
        colors={[mission.color + '40', mission.color + '80', mission.color]}
        style={styles.backgroundGradient}
      />
      
      {/* Main content */}
      <View style={styles.content}>
        {/* Mission info */}
        <View style={styles.missionInfo}>
          <Text style={styles.missionTitle}>{mission.title}</Text>
          <Text style={styles.phaseMessage}>{getPhaseMessage()}</Text>
        </View>
        
        {/* Timer circle */}
        <Animated.View 
          style={[
            styles.timerContainer,
            { transform: [{ scale: pulseAnim }] }
          ]}
        >
          <View style={styles.timerCircle}>
            {/* Progress ring */}
            <Animated.View style={styles.progressRing}>
              <Animated.View
                style={[
                  styles.progressFill,
                  {
                    transform: [{
                      rotate: progressAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                      })
                    }]
                  }
                ]}
              />
            </Animated.View>
            
            {/* Timer text */}
            <View style={styles.timerTextContainer}>
              <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
              <Text style={styles.timerLabel}>restantes</Text>
            </View>
          </View>
        </Animated.View>
        
        {/* Progress info */}
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>
            {elapsedMinutes} min écoulées
          </Text>
          <Text style={styles.pointsText}>
            ≈ {estimatedPoints} points gagnés
          </Text>
        </View>
        
        {/* Motivational quotes */}
        <View style={styles.motivationContainer}>
          <Text style={styles.motivationText}>
            "Chaque minute de calme contribue à un monde meilleur"
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  backgroundGradient: {
    position: 'absolute',
    width: width,
    height: height,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  missionInfo: {
    alignItems: 'center',
    marginBottom: 60,
  },
  missionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  phaseMessage: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },
  timerContainer: {
    marginBottom: 40,
  },
  timerCircle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  progressRing: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
  },
  progressFill: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: 'white',
    borderRightColor: 'white',
  },
  timerTextContainer: {
    alignItems: 'center',
  },
  timerText: {
    fontSize: 48,
    fontWeight: '300',
    color: 'white',
    marginBottom: 8,
  },
  timerLabel: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  progressInfo: {
    alignItems: 'center',
    marginBottom: 40,
  },
  progressText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 8,
    fontWeight: '500',
  },
  pointsText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
  },
  motivationContainer: {
    paddingHorizontal: 32,
  },
  motivationText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 24,
  },
});