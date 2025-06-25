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
import colors from "@/constants/colors";

type SessionTimerProps = {
  duration: number; // in minutes
  onComplete: () => void;
  onExit?: () => void;
};

const { width, height } = Dimensions.get("window");
const CIRCLE_SIZE = Math.min(width, height) * 0.7;

export default function SessionTimer({ 
  duration, 
  onComplete,
  onExit,
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
      if (isActive && onExit) {
        onExit();
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
            <Text style={styles.label}>Remaining</Text>
          </View>
        </View>
      </View>
      <View style={styles.messageContainer}>
        <Text style={styles.message}>
          Stay away from your phone.{"\n"}
          Every minute counts!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  circleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  circle: {
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 4,
    borderColor: colors.border,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
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
    color: colors.text,
  },
  label: {
    fontSize: 16,
    color: colors.textLight,
    marginTop: 8,
  },
  messageContainer: {
    marginTop: 20,
    paddingHorizontal: 40,
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    color: colors.text,
    lineHeight: 28,
  },
});