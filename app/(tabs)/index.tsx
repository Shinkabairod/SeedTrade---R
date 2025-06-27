import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { 
  ChevronRight, 
  Award, 
  User, 
  Settings, 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw,
  Clock,
  Target,
  Zap
} from "lucide-react-native";
import { useSessionStore } from "@/store/useSessionStore";
import { missions } from "@/constants/missions";
import { useTimer } from "@/hooks/useTimer";
import { useAchievements } from "@/hooks/useAchievements";
import colors from "@/constants/colors";
import MissionCard from "@/components/MissionCard";
import Button from "@/components/Button";
import DurationPicker from "@/components/DurationPicker";
import SessionResultModal from "@/components/SessionResultModal";

const DURATIONS = [5, 10, 20, 30, 45, 60];

export default function HomeScreen() {
  const { 
    stats, 
    activeMissionId, 
    setActiveMission, 
    completeSession,
    showSessionResult,
    lastSessionSuccess,
    setShowSessionResult
  } = useSessionStore();
  
  const { checkAchievements } = useAchievements();
  const [selectedDuration, setSelectedDuration] = useState(20);
  
  const timer = useTimer(() => {
    handleCompleteSession(true);
  });

  const activeMission = missions.find(m => m.id === activeMissionId)!;
  
  const handleStartSession = () => {
    timer.start(selectedDuration);
  };
  
  const handleCompleteSession = (success: boolean) => {
    const sessionTimeSeconds = timer.time;
    const sessionTimeMinutes = Math.floor(sessionTimeSeconds / 60);
    const earnedPoints = success ? sessionTimeMinutes * activeMission.pointsPerMinute : 0;
    
    timer.complete();
    completeSession(success);
    
    if (success) {
      checkAchievements(earnedPoints, sessionTimeSeconds, activeMissionId);
    }
  };
  
  const handleSelectMission = (missionId: string) => {
    setActiveMission(missionId);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getSessionPhase = (): string => {
    const progress = timer.getProgress();
    if (progress < 25) return "🌱 Respire profondément";
    if (progress < 50) return "🧘‍♂️ Tu es dans le flow";
    if (progress < 75) return "⚡ Concentration maximale";
    return "🏆 Tu es un champion !";
  };

  const earnedPoints = Math.floor(timer.time / 60) * activeMission.pointsPerMinute;
  const impactAmount = Math.floor(timer.time / 60);
  
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>Bonjour 👋</Text>
          <Text style={styles.headerTitle}>Prêt pour une session ?</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => router.push("/(tabs)/profile")}
          >
            <User size={20} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => Alert.alert("Paramètres", "Fonctionnalité à venir")}
          >
            <Settings size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <View style={styles.sessionCard}>
            <View style={styles.sessionHeader}>
              <Sparkles size={24} color={colors.primary} />
              <Text style={styles.sessionCardTitle}>
                {timer.isActive ? 'Session en cours' : 'Nouvelle session'}
              </Text>
            </View>
            
            {!timer.isActive ? (
              <>
                <Text style={styles.sessionCardSubtitle}>
                  Choisis ta durée et commence à avoir un impact
                </Text>
                
                <DurationPicker
                  durations={DURATIONS}
                  selectedDuration={selectedDuration}
                  onSelectDuration={setSelectedDuration}
                />
                
                <Button
                  title="Commencer la session"
                  onPress={handleStartSession}
                  size="large"
                  style={styles.startButton}
                />
              </>
            ) : (
              <View style={styles.activeSessionContainer}>
                <Text style={styles.phaseMessage}>{getSessionPhase()}</Text>
                
                <View style={styles.timerContainer}>
                  <Text style={styles.timerText}>{formatTime(timer.time)}</Text>
                  <Text style={styles.timerLabel}>
                    Objectif: {selectedDuration} minutes
                  </Text>
                  
                  <View style={styles.progressBarContainer}>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill,
                          { width: `${timer.getProgress()}%` }
                        ]}
                      />
                    </View>
                  </View>
                </View>
                
                <View style={styles.sessionStats}>
                  <Text style={styles.sessionStatsText}>
                    ≈ {earnedPoints} points • {impactAmount} {activeMission.unit}
                  </Text>
                </View>
                
                <View style={styles.sessionControls}>
                  <TouchableOpacity
                    style={[
                      styles.controlButton,
                      timer.isPaused ? styles.resumeButton : styles.pauseButton
                    ]}
                    onPress={timer.pause}
                  >
                    {timer.isPaused ? (
                      <Play size={20} color="white" />
                    ) : (
                      <Pause size={20} color="white" />
                    )}
                    <Text style={styles.controlButtonText}>
                      {timer.isPaused ? 'Reprendre' : 'Pause'}
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[styles.controlButton, styles.stopButton]}
                    onPress={() => {
                      Alert.alert(
                        'Terminer la session ?',
                        'Veux-tu vraiment arrêter ta session maintenant ?',
                        [
                          { text: 'Continuer', style: 'cancel' },
                          { 
                            text: 'Terminer', 
                            style: 'destructive',
                            onPress: () => handleCompleteSession(timer.time >= 300) // 5min minimum
                          }
                        ]
                      );
                    }}
                  >
                    <RotateCcw size={20} color="white" />
                    <Text style={styles.controlButtonText}>Terminer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
        
        {!timer.isActive && (
          <>
            <View style={styles.quickStatsSection}>
              <View style={styles.quickStatsGrid}>
                <TouchableOpacity 
                  style={styles.quickStatCard}
                  onPress={() => router.push("/(tabs)/stats")}
                >
                  <View style={styles.quickStatIcon}>
                    <Zap size={20} color={colors.stats.points} />
                  </View>
                  <Text style={styles.quickStatValue}>{stats.totalPoints}</Text>
                  <Text style={styles.quickStatLabel}>Points</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.quickStatCard}
                  onPress={() => router.push("/(tabs)/achievements")}
                >
                  <View style={styles.quickStatIcon}>
                    <Target size={20} color={colors.stats.streak} />
                  </View>
                  <Text style={styles.quickStatValue}>{stats.currentStreak}</Text>
                  <Text style={styles.quickStatLabel}>Série</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.quickStatCard}
                  onPress={() => router.push("/(tabs)/stats")}
                >
                  <View style={styles.quickStatIcon}>
                    <Clock size={20} color={colors.stats.time} />
                  </View>
                  <Text style={styles.quickStatValue}>{Math.floor(stats.totalMinutes / 60)}h</Text>
                  <Text style={styles.quickStatLabel}>Temps</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.quickStatCard}
                  onPress={() => router.push("/(tabs)/achievements")}
                >
                  <View style={styles.quickStatIcon}>
                    <Award size={20} color={colors.stats.sessions} />
                  </View>
                  <Text style={styles.quickStatValue}>{stats.totalSessions}</Text>
                  <Text style={styles.quickStatLabel}>Sessions</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.missionSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Mission active</Text>
                <TouchableOpacity 
                  style={styles.changeMissionButton}
                  onPress={() => router.push("/(tabs)/missions")}
                >
                  <Text style={styles.changeMissionText}>Changer</Text>
                  <ChevronRight size={16} color={colors.primary} />
                </TouchableOpacity>
              </View>
              
              <MissionCard
                mission={activeMission}
                isActive={true}
                onPress={() => {}}
              />
            </View>
            
            <View style={styles.missionSection}>
              <Text style={styles.sectionTitle}>Découvrir</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalScroll}
              >
                {missions
                  .filter(m => m.id !== activeMissionId)
                  .slice(0, 3)
                  .map((mission) => (
                    <View key={mission.id} style={styles.horizontalMissionCard}>
                      <MissionCard
                        mission={mission}
                        isActive={false}
                        onPress={() => handleSelectMission(mission.id)}
                      />
                    </View>
                  ))}
              </ScrollView>
            </View>
          </>
        )}
      </ScrollView>

      <SessionResultModal
        visible={showSessionResult}
        onClose={() => setShowSessionResult(false)}
        success={lastSessionSuccess}
        sessionTime={timer.time}
        mission={activeMission}
        earnedPoints={earnedPoints}
        impactAmount={impactAmount}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: colors.background,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 4,
    fontWeight: "500",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    letterSpacing: -0.5,
  },
  headerIcons: {
    flexDirection: "row",
    gap: 8,
  },
  iconButton: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: colors.card,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  heroSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  sessionCard: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 28,
    shadowColor: colors.shadowMedium,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 8,
  },
  sessionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  sessionCardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    letterSpacing: -0.3,
  },
  sessionCardSubtitle: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 24,
    lineHeight: 20,
  },
  startButton: {
    marginTop: 20,
  },
  activeSessionContainer: {
    alignItems: 'center',
  },
  phaseMessage: {
    fontSize: 16,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '600',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  timerText: {
    fontSize: 48,
    fontWeight: '300',
    color: colors.text,
    marginBottom: 8,
    letterSpacing: -2,
  },
  timerLabel: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 20,
  },
  progressBarContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  sessionStats: {
    marginBottom: 24,
  },
  sessionStatsText: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
  },
  sessionControls: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  controlButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
  },
  pauseButton: {
    backgroundColor: colors.warning,
  },
  resumeButton: {
    backgroundColor: colors.success,
  },
  stopButton: {
    backgroundColor: colors.error,
  },
  controlButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  quickStatsSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  quickStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickStatCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  quickStatIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.wellness.cream,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickStatValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  quickStatLabel: {
    fontSize: 11,
    color: colors.textLight,
    fontWeight: '500',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  missionSection: {
    paddingBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    letterSpacing: -0.3,
  },
  changeMissionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.wellness.lavender,
    borderRadius: 12,
  },
  changeMissionText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "600",
  },
  horizontalScroll: {
    paddingLeft: 24,
    gap: 16,
  },
  horizontalMissionCard: {
    width: 300,
  },
});