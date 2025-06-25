import React, { useState, useEffect } from "react";
import { StyleSheet, View, BackHandler, Platform, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { X } from "lucide-react-native";
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
                <Text style={styles.exitConfirmTitle}>Quitter la session ?</Text>
                <Text style={styles.exitConfirmText}>
                  Si tu quittes maintenant, tu ne gagneras pas de points pour cette session.
                </Text>
                <View style={styles.exitConfirmButtons}>
                  <TouchableOpacity 
                    style={[styles.exitConfirmButton, styles.cancelButton]}
                    onPress={handleCancelExit}
                  >
                    <Text style={styles.cancelButtonText}>Continuer</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.exitConfirmButton, styles.confirmButton]}
                    onPress={handleSessionExit}
                  >
                    <Text style={styles.confirmButtonText}>Quitter</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <SessionTimer
              duration={currentSession.duration}
              onComplete={handleSessionComplete}
              mission={mission}
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
    top: 16,
    right: 16,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  exitConfirmContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  exitConfirmCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  exitConfirmTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 16,
    textAlign: "center",
  },
  exitConfirmText: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  exitConfirmButtons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    gap: 12,
  },
  exitConfirmButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  confirmButton: {
    backgroundColor: colors.error,
  },
  cancelButtonText: {
    color: colors.text,
    fontWeight: "600",
    fontSize: 16,
  },
  confirmButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});