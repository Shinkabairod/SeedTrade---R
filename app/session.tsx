import React, { useState, useEffect } from "react";
import { StyleSheet, View, BackHandler, Platform, Text, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { X, AlertCircle, CheckCircle } from "lucide-react-native";
import { useSessionStore } from "@/store/useSessionStore";
import { missions } from "@/constants/missions";
import SessionTimer from "@/components/SessionTimer";
import SessionResult from "@/components/SessionResult";
import colors from "@/constants/colors";

export default function SessionScreen() {
  const { currentSession, completeSession, failSession } = useSessionStore();
  const [showResult, setShowResult] = useState(false);
  const [sessionSuccess, setSessionSuccess] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  
  // If no current session, go back to home
  useEffect(() => {
    if (!currentSession) {
      router.replace("/home");
    }
  }, [currentSession]);
  
  // Handle Android back button
  useEffect(() => {
    if (Platform.OS === "android") {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          if (!showResult && !showExitConfirm) {
            setShowExitConfirm(true);
            return true;
          } else if (showExitConfirm) {
            setShowExitConfirm(false);
            return true;
          }
          return false;
        }
      );
      
      return () => backHandler.remove();
    }
  }, [showResult, showExitConfirm]);
  
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
    router.replace("/home");
  };

  const handleExitPress = () => {
    setShowExitConfirm(true);
  };

  const handleCancelExit = () => {
    setShowExitConfirm(false);
  };

  const handleConfirmExit = () => {
    handleSessionExit();
  };
  
  return (
    <SafeAreaView style={styles.container}>
      {showResult ? (
        <SessionResult
          duration={currentSession.duration}
          mission={mission}
          onClose={handleCloseResult}
          success={sessionSuccess}
        />
      ) : (
        <>
          {!showExitConfirm && (
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={handleExitPress}
            >
              <X size={24} color="white" />
            </TouchableOpacity>
          )}
          
          {showExitConfirm ? (
            <View style={styles.exitConfirmContainer}>
              <View style={styles.exitConfirmCard}>
                <AlertCircle size={48} color={colors.warning} />
                <Text style={styles.exitConfirmTitle}>Quitter la session ?</Text>
                <Text style={styles.exitConfirmMessage}>
                  Si tu quittes maintenant, ta progression sera perdue et tu ne gagneras aucun point.
                </Text>
                <View style={styles.exitConfirmButtons}>
                  <TouchableOpacity 
                    style={[styles.exitButton, styles.cancelButton]}
                    onPress={handleCancelExit}
                  >
                    <Text style={styles.cancelButtonText}>Continuer</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.exitButton, styles.confirmButton]}
                    onPress={handleConfirmExit}
                  >
                    <Text style={styles.confirmButtonText}>Quitter</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <SessionTimer
              duration={currentSession.duration}
              mission={mission}
              onComplete={handleSessionComplete}
              onExit={handleExitPress}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  closeButton: {
    position: "absolute",
    top: 60,
    right: 24,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  exitConfirmContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  exitConfirmCard: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    width: "100%",
    maxWidth: 320,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  exitConfirmTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginTop: 16,
    marginBottom: 12,
    textAlign: "center",
  },
  exitConfirmMessage: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  exitConfirmButtons: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  exitButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: colors.primary,
  },
  confirmButton: {
    backgroundColor: colors.border,
  },
  cancelButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  confirmButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "600",
  },
});