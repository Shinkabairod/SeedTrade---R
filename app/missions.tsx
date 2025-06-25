import React from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-context";
import { router } from "expo-router";
import { Image } from "expo-image";
import { useSessionStore } from "@/store/useSessionStore";
import { missions } from "@/constants/missions";
import colors from "@/constants/colors";
import MissionCard from "@/components/MissionCard";

export default function MissionsScreen() {
  const { activeMissionId, setActiveMission } = useSessionStore();
  
  const handleSelectMission = (missionId: string) => {
    setActiveMission(missionId);
    router.back();
  };
  
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Missions actives</Text>
        <Text style={styles.subtitle}>
          Choisis la mission que tu souhaites soutenir avec ton temps de calme
        </Text>
        
        <View style={styles.missionsContainer}>
          {missions.map((mission) => (
            <View key={mission.id} style={styles.missionWrapper}>
              <MissionCard
                mission={mission}
                isActive={mission.id === activeMissionId}
                onPress={() => handleSelectMission(mission.id)}
              />
              
              <View style={styles.missionDetails}>
                <View style={styles.partnerContainer}>
                  <Text style={styles.partnerLabel}>Partenaire:</Text>
                  <View style={styles.partnerLogo}>
                    <Text style={styles.partnerName}>
                      {mission.id === "trees" ? "EcoForest" : 
                       mission.id === "water" ? "WaterAid" : "EduForAll"}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.impactContainer}>
                  <Text style={styles.impactLabel}>Impact:</Text>
                  <Text style={styles.impactValue}>
                    1 {mission.unit.slice(0, -1)} = {Math.round(1/mission.pointsPerMinute)} minutes
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        
        <View style={styles.comingSoonContainer}>
          <Text style={styles.comingSoonTitle}>Prochainement</Text>
          
          <View style={styles.comingSoonCard}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" }}
              style={styles.comingSoonImage}
              contentFit="cover"
            />
            <View style={styles.comingSoonContent}>
              <Text style={styles.comingSoonMission}>Protection des océans</Text>
              <Text style={styles.comingSoonDescription}>
                Contribue au nettoyage des océans et à la protection de la vie marine.
              </Text>
              <View style={styles.comingSoonBadge}>
                <Text style={styles.comingSoonBadgeText}>Bientôt disponible</Text>
              </View>
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
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 24,
    lineHeight: 22,
  },
  missionsContainer: {
    gap: 24,
  },
  missionWrapper: {
    gap: 12,
  },
  missionDetails: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  partnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  partnerLabel: {
    fontSize: 14,
    color: colors.textLight,
    marginRight: 8,
  },
  partnerLogo: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: colors.background,
    borderRadius: 12,
  },
  partnerName: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text,
  },
  impactContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  impactLabel: {
    fontSize: 14,
    color: colors.textLight,
    marginRight: 8,
  },
  impactValue: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text,
  },
  comingSoonContainer: {
    marginTop: 40,
  },
  comingSoonTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 16,
  },
  comingSoonCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  comingSoonImage: {
    width: "100%",
    height: 150,
  },
  comingSoonContent: {
    padding: 16,
  },
  comingSoonMission: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },
  comingSoonDescription: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 12,
    lineHeight: 20,
  },
  comingSoonBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.secondary,
    borderRadius: 12,
  },
  comingSoonBadgeText: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.text,
  },
});