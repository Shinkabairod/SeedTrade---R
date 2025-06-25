import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList, Dimensions, TouchableOpacity } from "react-native";
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
              style={styles.seeAllButton}
              onPress={() => router.push("/missions")}
            >
              <Text style={styles.seeAllText}>Voir tout</Text>
              <ChevronRight size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
          
          <MissionCard
            mission={activeMission}
            isActive={true}
            onPress={() => {}}
          />
          
          <View style={styles.missionInfo}>
            <Text style={styles.missionInfoText}>
              1 {activeMission.unit.slice(0, -1)} = {Math.round(1/activeMission.pointsPerMinute)} minutes de calme
            </Text>
          </View>
        </View>
        
        <View style={styles.rankingSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Classement hebdomadaire</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>Voir tout</Text>
              <ChevronRight size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.rankingCard}>
            <View style={styles.rankItem}>
              <View style={styles.rankPosition}>
                <Award size={20} color={colors.primary} />
              </View>
              <View style={styles.rankUser}>
                <Image
                  source={{ uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80" }}
                  style={styles.userAvatar}
                />
                <Text style={styles.userName}>Thomas M.</Text>
              </View>
              <Text style={styles.rankPoints}>320 pts</Text>
            </View>
            
            <View style={styles.rankDivider} />
            
            <View style={styles.rankItem}>
              <View style={[styles.rankPosition, styles.yourRank]}>
                <Text style={styles.yourRankText}>12</Text>
              </View>
              <View style={styles.rankUser}>
                <View style={styles.yourAvatarContainer}>
                  <Text style={styles.yourAvatarText}>Toi</Text>
                </View>
                <Text style={styles.userName}>Toi</Text>
              </View>
              <Text style={styles.rankPoints}>{stats.totalPoints.toFixed(1)} pts</Text>
            </View>
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
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.text,
  },
  headerIcons: {
    flexDirection: "row",
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 24,
    lineHeight: 22,
  },
  sessionCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sessionCardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 16,
    textAlign: "center",
  },
  startButton: {
    marginTop: 8,
  },
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 16,
  },
  missionSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primary,
    marginRight: 4,
  },
  missionInfo: {
    marginTop: 12,
    alignItems: "center",
  },
  missionInfoText: {
    fontSize: 14,
    color: colors.textLight,
    fontStyle: "italic",
  },
  rankingSection: {
    paddingHorizontal: 20,
  },
  rankingCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  rankItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  rankPosition: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  yourRank: {
    backgroundColor: colors.primary,
  },
  yourRankText: {
    color: "white",
    fontWeight: "bold",
  },
  rankUser: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  yourAvatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  yourAvatarText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  userName: {
    fontSize: 16,
    color: colors.text,
  },
  rankPoints: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  rankDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
  },
});