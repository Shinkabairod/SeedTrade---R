import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Image } from "expo-image";
import { ChevronRight, Award, User, Settings, Sparkles } from "lucide-react-native";
import { useSessionStore } from "@/store/useSessionStore";
import { missions } from "@/constants/missions";
import colors from "@/constants/colors";
import MissionCard from "@/components/MissionCard";
import StatsCard from "@/components/StatsCard";
import Button from "@/components/Button";
import DurationPicker from "@/components/DurationPicker";

const DURATIONS = [5, 10, 20, 30, 45, 60];

export default function HomeScreen() {
  const { stats, activeMissionId, setActiveMission, startSession } = useSessionStore();
  const [selectedDuration, setSelectedDuration] = useState(20);
  const scrollRef = useRef<ScrollView>(null);
  
  const handleStartSession = () => {
    startSession(selectedDuration);
    router.push("/session");
  };
  
  const handleSelectMission = (missionId: string) => {
    setActiveMission(missionId);
  };

  const activeMission = missions.find(m => m.id === activeMissionId)!;
  
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
            onPress={() => router.push("/profile")}
          >
            <User size={20} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => router.push("/settings")}
          >
            <Settings size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView 
        ref={scrollRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <View style={styles.sessionCard}>
            <View style={styles.sessionHeader}>
              <Sparkles size={24} color={colors.primary} />
              <Text style={styles.sessionCardTitle}>Nouvelle session</Text>
            </View>
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
          </View>
        </View>
        
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Ton impact</Text>
          <StatsCard stats={stats} />
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
        
        <View style={styles.motivationSection}>
          <View style={styles.motivationCard}>
            <Award size={28} color={colors.primary} />
            <Text style={styles.motivationTitle}>Continue ton parcours !</Text>
            <Text style={styles.motivationText}>
              Tu as déjà contribué à {stats.totalSessions} sessions. 
              Chaque moment de calme compte pour créer un monde meilleur.
            </Text>
          </View>
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
  statsSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 16,
    letterSpacing: -0.3,
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
  motivationSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  motivationCard: {
    backgroundColor: colors.wellness.cream,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.wellness.sand,
  },
  motivationTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginTop: 12,
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  motivationText: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: "center",
    lineHeight: 22,
  },
});