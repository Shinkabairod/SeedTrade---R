import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Image } from "expo-image";
import { ChevronRight, Award, User, Settings } from "lucide-react-native";
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
        <Text style={styles.headerTitle}>SeedTrade</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => router.push("/profile")}
          >
            <User size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => router.push("/settings")}
          >
            <Settings size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView 
        ref={scrollRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Ton calme a de la valeur</Text>
          <Text style={styles.heroSubtitle}>
            Chaque minute loin de ton téléphone contribue à un monde meilleur
          </Text>
          
          <View style={styles.sessionCard}>
            <Text style={styles.sessionCardTitle}>Lancer une session</Text>
            
            <DurationPicker
              durations={DURATIONS}
              selectedDuration={selectedDuration}
              onSelectDuration={setSelectedDuration}
            />
            
            <Button
              title="Commencer"
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
          <Text style={styles.sectionTitle}>Autres missions</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {missions
              .filter(m => m.id !== activeMissionId)
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
            <Award size={32} color={colors.primary} />
            <Text style={styles.motivationTitle}>Continue ton impact !</Text>
            <Text style={styles.motivationText}>
              Tu as déjà contribué à {stats.totalSessions} sessions. 
              Chaque moment compte pour créer un monde meilleur.
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
    paddingVertical: 16,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text,
  },
  headerIcons: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: colors.card,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  heroSection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  sessionCard: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
  },
  sessionCardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 20,
    textAlign: "center",
  },
  startButton: {
    marginTop: 16,
  },
  statsSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 20,
  },
  missionSection: {
    paddingBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  changeMissionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  changeMissionText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "500",
  },
  horizontalScroll: {
    paddingLeft: 24,
    gap: 16,
  },
  horizontalMissionCard: {
    width: 280,
  },
  motivationSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  motivationCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  motivationTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  motivationText: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: "center",
    lineHeight: 20,
  },
});