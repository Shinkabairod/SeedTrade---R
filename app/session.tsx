import React, { useState, useEffect } from "react";
import { StyleSheet, View, BackHandler, Platform } from "react-native";
import { router } from "expo-router";
import { useSessionStore } from "@/store/useSessionStore";
import { missions } from "@/constants/missions";
import SessionTimer from "@/components/SessionTimer";
import SessionResult from "@/components/SessionResult";
import colors from "@/constants/colors";

export default function SessionScreen() {
  const { currentSession, completeSession, failSession } = useSessionStore();
  const [showResult, setShowResult] = useState(false);
  const [sessionSuccess, setSessionSuccess] = useState(false);
  
  // If no current session, go back to home
  useEffect(() => {
    if (!currentSession) {
      router.replace("/");
    }
  }, [currentSession]);
  
  // Handle Android back button
  useEffect(() => {
    if (Platform.OS === "android") {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          if (!showResult) {
            handleSessionExit();
            return true;
          }
          return false;
        }
      );
      
      return () => backHandler.remove();
    }
  }, [showResult]);
  
  if (!currentSession) {
    return null;
  }
  
  const mission = missions.find(m => m.id === currentSession.missionId)!;
  
  const handleSessionComplete = () => {
    completeSession();
    setSessionSuccess(true);
    setShowResult(true);
  };
  
  const handleSessionExit = () => {
    failSession();
    setSessionSuccess(false);
    setShowResult(true);
  };
  
  const handleCloseResult = () => {
    router.replace("/");
  };
  
  return (
    <View style={styles.container}>
      {showResult ? (
        <SessionResult
          duration={currentSession.duration}
          mission={mission}
          onClose={handleCloseResult}
          success={sessionSuccess}
        />
      ) : (
        <SessionTimer
          duration={currentSession.duration}
          onComplete={handleSessionComplete}
          onExit={handleSessionExit}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});