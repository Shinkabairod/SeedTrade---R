import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, Dimensions, Platform } from "react-native";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  Easing,
  interpolate,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import colors from "@/constants/colors";
import { Mission } from "@/constants/missions";

type SessionTimerProps = {
  duration: number; // in minutes
  onComplete: () => void;
  mission: Mission;
};

const { width, height } = Dimensions.get("window");
const CIRCLE_SIZE = Math.min(width, height) * 0.7;

export default function SessionTimer({ 
  duration, 
  onComplete,
  mission,
}: SessionTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isActive, setIsActive] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const progress = useSharedValue(0);
  
  useEffect(() => {
    // Start the timer
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setIsActive(false);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Animation
    progress.value = withTiming(1, {
      duration: duration * 60 * 1000,
      easing: Easing.linear,
    });
    
    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  
  const animatedWaterStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        progress.value,
        [0, 1],
        [CIRCLE_SIZE * 0.1, CIRCLE_SIZE * 0.9],
      ),
    };
  });
  
  // For web compatibility
  const WaterContainer = Platform.OS === "web" ? View : Animated.View;
  
  return (
    <View style={styles.container}>
      <View style={styles.missionInfo}>
        <Image
          source={{ uri: mission.image }}
          style={styles.missionImage}
          contentFit="cover"
        />
        <Text style={styles.missionTitle}>{mission.title}</Text>
      </View>
      
      <View style={styles.circleContainer}>
        <View style={[styles.circle, { width: CIRCLE_SIZE, height: CIRCLE_SIZE }]}>
          <WaterContainer style={[styles.water, animatedWaterStyle]}>
            <LinearGradient
              colors={[colors.secondary, colors.primary]}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
          </WaterContainer>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatTime(timeLeft)}</Text>
            <Text style={styles.label}>Restant</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.messageContainer}>
        <Text style={styles.message}>
          Reste loin de ton téléphone.{"\n"}
          Chaque minute compte !
        </Text>
        
        <View style={styles.impactContainer}>
          <Text style={styles.impactLabel}>Impact estimé :</Text>
          <Text style={styles.impactValue}>
            {(duration * mission.pointsPerMinute).toFixed(1)} points
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    padding: 20,
  },
  missionInfo: {
    alignItems: "center",
    marginBottom: 30,
  },
  missionImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "white",
  },
  missionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  circleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  circle: {
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 4,
    borderColor: "rgba(255, 255, 255, 0.3)",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  water: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    overflow: "hidden",
  },
  gradient: {
    width: "100%",
    height: "100%",
  },
  timeContainer: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  timeText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
  },
  label: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 8,
  },
  messageContainer: {
    alignItems: "center",
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
    lineHeight: 28,
    marginBottom: 24,
  },
  impactContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  impactLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 4,
  },
  impactValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});