import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Clock, Target, Award, TrendingUp } from "lucide-react-native";
import { UserStats } from "@/store/useSessionStore";
import colors from "@/constants/colors";

type StatsCardProps = {
  stats: UserStats;
};

export default function StatsCard({ stats }: StatsCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <View style={[styles.statIcon, { backgroundColor: colors.stats.time }]}>
            <Clock size={18} color="white" />
          </View>
          <Text style={styles.statValue}>{stats.totalMinutes}</Text>
          <Text style={styles.statLabel}>Minutes</Text>
        </View>
        
        <View style={styles.statItem}>
          <View style={[styles.statIcon, { backgroundColor: colors.stats.sessions }]}>
            <Target size={18} color="white" />
          </View>
          <Text style={styles.statValue}>{stats.totalSessions}</Text>
          <Text style={styles.statLabel}>Sessions</Text>
        </View>
        
        <View style={styles.statItem}>
          <View style={[styles.statIcon, { backgroundColor: colors.stats.points }]}>
            <Award size={18} color="white" />
          </View>
          <Text style={styles.statValue}>{stats.totalPoints}</Text>
          <Text style={styles.statLabel}>Points</Text>
        </View>
        
        <View style={styles.statItem}>
          <View style={[styles.statIcon, { backgroundColor: colors.stats.streak }]}>
            <TrendingUp size={18} color="white" />
          </View>
          <Text style={styles.statValue}>{stats.currentStreak}</Text>
          <Text style={styles.statLabel}>Série</Text>
        </View>
      </View>
      
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Ton impact</Text>
        <Text style={styles.summaryText}>
          Tu as complété <Text style={styles.highlight}>{stats.totalSessions} sessions</Text> pour un total de{" "}
          <Text style={styles.highlight}>{Math.floor(stats.totalMinutes / 60)}h{stats.totalMinutes % 60}min</Text> de calme.
        </Text>
        
        {stats.currentStreak > 0 && (
          <View style={styles.streakContainer}>
            <Text style={styles.streakText}>
              🔥 Série actuelle : {stats.currentStreak} jour{stats.currentStreak > 1 ? 's' : ''} consécutif{stats.currentStreak > 1 ? 's' : ''} !
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    shadowColor: colors.shadowMedium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 4,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    minWidth: "45%",
    alignItems: "center",
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
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
    fontSize: 12,
    color: colors.textLight,
    textAlign: "center",
    fontWeight: "500",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  summaryContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 20,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  summaryText: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 22,
    textAlign: "center",
  },
  highlight: {
    fontWeight: "600",
    color: colors.primary,
  },
  streakContainer: {
    marginTop: 16,
    backgroundColor: colors.wellness.lavender,
    borderRadius: 12,
    padding: 12,
  },
  streakText: {
    fontSize: 13,
    color: colors.primary,
    textAlign: "center",
    fontWeight: "500",
  },
});