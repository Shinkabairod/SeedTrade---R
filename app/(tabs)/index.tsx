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
  Clock,
  Target,
  Zap
} from "lucide-react-native";
import { useSessionStore } from "@/store/useSessionStore";
import { missions } from "@/constants/missions";
import colors from "@/constants/colors";
import MissionCard from "@/components/MissionCard";
import Button from "@/components/Button";
import DurationPicker from "@/components/DurationPicker";

const DURATIONS = [5, 10, 20, 30, 45, 60];

export default function HomeScreen() {
  const { 
    stats, 
    activeMissionId, 
    setActiveMission, 
    startSession,
    currentSession
  } = useSessionStore();
  
  const [selectedDuration, setSelectedDuration] = useState(20);

  const activeMission = missions.find(m => m.id === activeMissionId)!;
  
  const handleStartSession = () => {
    startSession(selectedDuration);
    router.push("/session");
  };
  
  const handleSelectMission = (missionId: string) => {
    setActiveMission(missionId);
  };

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
                {currentSession ? 'Session en cours' : 'Nouvelle session'}
              </Text>
            </View>
            
            {!currentSession ? (
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
                <Text style={styles.sessionActiveText}>
                  Session en cours...
                </Text>
                <Button
                  title="Voir la session"
                  onPress={() => router.push("/session")}
                  size="large"
                  style={styles.startButton}
                />
              </View>
            )}
          </View>
        </View>
        
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
      </ScrollView>
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
  sessionActiveText: {
    fontSize: 16,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 16,
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