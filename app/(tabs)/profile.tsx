import React from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Calendar, Clock, Award, Target, Settings, Share2 } from "lucide-react-native";
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
          <Text style={styles.profileName}>Ton Profil</Text>
          <Text style={styles.profileSubtitle}>
            Membre depuis {new Date().toLocaleDateString('fr-FR')}
          </Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Settings size={18} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Share2 size={18} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Clock size={20} color={colors.stats.time} />
            </View>
            <Text style={styles.statValue}>{stats.totalMinutes}</Text>
            <Text style={styles.statLabel}>Minutes</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Calendar size={20} color={colors.stats.streak} />
            </View>
            <Text style={styles.statValue}>{stats.currentStreak}</Text>
            <Text style={styles.statLabel}>Série</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Target size={20} color={colors.stats.sessions} />
            </View>
            <Text style={styles.statValue}>{stats.totalSessions}</Text>
            <Text style={styles.statLabel}>Sessions</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Award size={20} color={colors.stats.points} />
            </View>
            <Text style={styles.statValue}>{stats.totalPoints}</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tes contributions</Text>
          <View style={styles.contributionsContainer}>
            {missionContributions.slice(0, 3).map(({ mission, sessions: missionSessionCount, contribution }) => (
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
    position: "relative",
  },
  avatarContainer: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: "700",
    color: "white",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  profileSubtitle: {
    fontSize: 14,
    color: colors.textLight,
    fontWeight: "500",
  },
  headerActions: {
    position: "absolute",
    top: 24,
    right: 24,
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: colors.wellness.lavender,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: colors.shadowMedium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.wellness.cream,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textLight,
    textAlign: "center",
    fontWeight: "500",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  contributionsContainer: {
    gap: 12,
  },
  contributionCard: {
    height: 140,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
    shadowColor: colors.shadowMedium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
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
    padding: 20,
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
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
    letterSpacing: -0.3,
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
    borderRadius: 20,
    padding: 24,
    shadowColor: colors.shadowMedium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  levelDescription: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 20,
    lineHeight: 22,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.wellness.sand,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 12,
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
    fontWeight: "500",
  },
});