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
    const contribution = Math.floor(totalPoints / mission.pointsPerMinute);
    
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
          <Text style={styles.profileSubtitle}>
            Membre depuis {new Date().toLocaleDateString('fr-FR')}
          </Text>
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
              <Calendar size={24} color={colors.secondary} />
            </View>
            <Text style={styles.statValue}>{stats.currentStreak}</Text>
            <Text style={styles.statLabel}>Jours consécutifs</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Target size={24} color={colors.accent} />
            </View>
            <Text style={styles.statValue}>{stats.totalSessions}</Text>
            <Text style={styles.statLabel}>Sessions terminées</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Award size={24} color={colors.success} />
            </View>
            <Text style={styles.statValue}>{stats.totalPoints}</Text>
            <Text style={styles.statLabel}>Points gagnés</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tes contributions</Text>
          <View style={styles.contributionsContainer}>
            {missionContributions.map(({ mission, sessions: missionSessionCount, contribution }) => (
              <View key={mission.id} style={styles.contributionCard}>
                <Image 
                  source={{ uri: mission.image }}
                  style={styles.contributionImage}
                  contentFit="cover"
                />
                <View style={styles.contributionOverlay}>
                  <Text style={styles.contributionTitle}>{mission.title}</Text>
                  <Text style={styles.contributionValue}>
                    {contribution} {mission.unit}
                  </Text>
                  <Text style={styles.contributionSessions}>
                    {missionSessionCount} sessions
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        
        {recentSessions.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sessions récentes</Text>
            <View style={styles.sessionsContainer}>
              {recentSessions.map((session) => (
                <View key={session.id} style={styles.sessionCard}>
                  <View style={styles.sessionInfo}>
                    <Text style={styles.sessionTitle}>{session.missionTitle}</Text>
                    <Text style={styles.sessionDetails}>
                      {session.duration} min • {session.points} points
                    </Text>
                  </View>
                  <View style={[
                    styles.sessionStatus,
                    { backgroundColor: session.status === 'completed' ? colors.success : colors.error }
                  ]}>
                    <Text style={styles.sessionStatusText}>
                      {session.status === 'completed' ? '✓' : '✗'}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Niveau d'impact</Text>
          <View style={styles.levelCard}>
            <Text style={styles.levelTitle}>Contributeur Débutant</Text>
            <Text style={styles.levelDescription}>
              Continue tes sessions pour débloquer de nouveaux niveaux et badges !
            </Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { width: `${Math.min((stats.totalPoints / 100) * 100, 100)}%` }
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {stats.totalPoints} / 100 points pour le niveau suivant
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
  scrollContent: {
    paddingBottom: 120,
  },
  profileHeader: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: colors.card,
    marginBottom: 24,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
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
    marginBottom: 4,
  },
  profileSubtitle: {
    fontSize: 14,
    color: colors.textLight,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background,
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
    fontSize: 12,
    color: colors.textLight,
    textAlign: "center",
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 16,
  },
  contributionsContainer: {
    gap: 12,
  },
  contributionCard: {
    height: 120,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
  },
  contributionImage: {
    width: "100%",
    height: "100%",
  },
  contributionOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 16,
  },
  contributionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginBottom: 4,
  },
  contributionValue: {
    fontSize: 14,
    color: "white",
    marginBottom: 2,
  },
  contributionSessions: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
  },
  sessionsContainer: {
    gap: 8,
  },
  sessionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 4,
  },
  sessionDetails: {
    fontSize: 14,
    color: colors.textLight,
  },
  sessionStatus: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  sessionStatusText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  levelCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
  },
  levelDescription: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 16,
    lineHeight: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: "center",
  },
});