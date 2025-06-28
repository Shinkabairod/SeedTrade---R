import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { 
  User, 
  Settings, 
  Sparkles, 
  Target,
  Zap,
  Clock
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
    currentSession,
    isHydrated
  } = useSessionStore();
  
  const [selectedDuration, setSelectedDuration] = useState(20);

  // Show loading state while hydrating
  if (!isHydrated) {
    return (
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const activeMission = missions.find(m => m.id === activeMissionId) || missions[0];
  
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
                  onSelect={setSelectedDuration}
                />
                
                <Button
                  title="Commencer la session"
                  onPress={handleStartSession}
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
              <Text style={styles.quickStatValue}>{Math.floor(stats.totalMinutes)}min</Text>
              <Text style={styles.quickStatLabel}>Temps total</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.missionSection}>
          <Text style={styles.sectionTitle}>Ta mission active</Text>
          <MissionCard
            mission={activeMission}
            isActive={true}
            onSelect={() => router.push("/(tabs)/missions")}
          />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: colors.text,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
  },
  headerIcons: {
    flexDirection: "row",
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundLight,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    paddingBottom: 120,
  },
  heroSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  sessionCard: {
    backgroundColor: colors.surface,
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
    marginBottom: 16,
    textAlign: 'center',
  },
  quickStatsSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  quickStatsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickStatCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 4,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickStatIcon: {
    marginBottom: 8,
  },
  quickStatValue: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 4,
  },
  quickStatLabel: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: "center",
  },
  missionSection: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 16,
  },
});