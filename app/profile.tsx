import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Calendar, Clock, Award, Target } from "lucide-react-native";
import { useSessionStore } from "@/store/useSessionStore";
import { missions } from "@/constants/missions";
import colors from "@/constants/colors";

export default function ProfileScreen() {
  const { stats, sessions } = useSessionStore();
  
  // Calculate mission contributions
  const missionContributions = missions.map(mission => {
    const missionSessions = sessions.filter(
      session => session.missionId === mission.id && session.status === "completed"
    );
    
    const totalPoints = missionSessions.reduce((sum, session) => sum + session.points, 0);
    const contribution = Math.floor(totalPoints);
    
    return {
      mission,
      sessions: missionSessions.length,
      contribution,
    };
  });
  
  // Get recent sessions
  const recentSessions = sessions
    .slice(0, 5)
    .map(session => {
      const mission = missions.find(m => m.id === session.missionId);
      return {
        ...session,
        missionTitle: mission?.title || "Mission inconnue",
      };
    });
  
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>T</Text>
          </View>
          <Text style={styles.profileName}>Ton Impact</Text>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Clock size={24} color={colors.primary} />
            </View>
            <Text style={styles.statValue}>{stats.totalMinutes}</Text>
            <Text style={styles.statLabel}>Minutes de calme</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Calendar size={24} color={colors.primary} />
            </View>
            <Text style={styles.statValue}>{stats.currentStreak}</Text>
            <Text style={styles.statLabel}>Jours consécutifs</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Target size={24} color={colors.primary} />
            </View>
            <Text style={styles.statValue}>{stats.completedSessions}</Text>
            <Text style={styles.statLabel}>Sessions réussies</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Award size={24} color={colors.primary} />
            </View>
            <Text style={styles.statValue}>{stats.totalPoints.toFixed(1)}</Text>
            <Text style={styles.statLabel}>Points gagnés</Text>
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Tes contributions</Text>
        
        <View style={styles.contributionsContainer}>
          {missionContributions.map(({ mission, sessions, contribution }) => (
            <View key={mission.id} style={styles.contributionCard}>
              <Image
                source={{ uri: mission.image }}
                style={styles.contributionImage}
                contentFit="cover"
              />
              <View style={styles.contributionContent}>
                <Text style={styles.contributionTitle}>{mission.title}</Text>
                <Text style={styles.contributionValue}>
                  {contribution} {contribution === 1 ? mission.unit.slice(0, -1) : mission.unit}
                </Text>
                <Text style={styles.contributionSessions}>
                  {sessions} sessions
                </Text>
              </View>
            </View>
          ))}
        </View>
        
        <Text style={styles.sectionTitle}>Historique récent</Text>
        
        <View style={styles.historyContainer}>
          {recentSessions.length > 0 ? (
            recentSessions.map((session) => (
              <View key={session.id} style={styles.historyItem}>
                <View style={[
                  styles.historyStatus,
                  session.status === "completed" ? styles.historyStatusCompleted : styles.historyStatusFailed
                ]}>
                  <Text style={styles.historyStatusText}>
                    {session.status === "completed" ? "✓" : "✕"}
                  </Text>
                </View>
                <View style={styles.historyContent}>
                  <Text style={styles.historyTitle}>{session.missionTitle}</Text>
                  <Text style={styles.historyDetails}>
                    {session.duration} min • {new Date(session.startTime).toLocaleDateString()}
                  </Text>
                </View>
                {session.status === "completed" && (
                  <Text style={styles.historyPoints}>
                    +{session.points.toFixed(1)}
                  </Text>
                )}
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>
              Aucune session pour le moment. Lance ta première session !
            </Text>
          )}
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
  profileHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  statCard: {
    width: "48%",
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 16,
  },
  contributionsContainer: {
    marginBottom: 32,
  },
  contributionCard: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  contributionImage: {
    width: 80,
    height: 80,
  },
  contributionContent: {
    flex: 1,
    padding: 12,
  },
  contributionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  contributionValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 4,
  },
  contributionSessions: {
    fontSize: 14,
    color: colors.textLight,
  },
  historyContainer: {
    marginBottom: 20,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  historyStatus: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  historyStatusCompleted: {
    backgroundColor: colors.success,
  },
  historyStatusFailed: {
    backgroundColor: colors.error,
  },
  historyStatusText: {
    color: "white",
    fontWeight: "bold",
  },
  historyContent: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 4,
  },
  historyDetails: {
    fontSize: 14,
    color: colors.textLight,
  },
  historyPoints: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textLight,
    fontStyle: "italic",
    textAlign: "center",
    padding: 20,
  },
});