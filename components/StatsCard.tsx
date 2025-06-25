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
          <View style={[styles.statIcon, { backgroundColor: colors.primary }]}>
            <Clock size={20} color="white" />
          </View>
          <Text style={styles.statValue}>{stats.totalMinutes}</Text>
          <Text style={styles.statLabel}>Minutes</Text>
        </View>
        
        <View style={styles.statItem}>
          <View style={[styles.statIcon, { backgroundColor: colors.secondary }]}>
            <Target size={20} color="white" />
          </View>
          <Text style={styles.statValue}>{stats.totalSessions}</Text>
          <Text style={styles.statLabel}>Sessions</Text>
        </View>
        
        <View style={styles.statItem}>
          <View style={[styles.statIcon, { backgroundColor: colors.accent }]}>
            <Award size={20} color="white" />
          </View>
          <Text style={styles.statValue}>{stats.totalPoints}</Text>
          <Text style={styles.statLabel}>Points</Text>
        </View>
        
        <View style={styles.statItem}>
          <View style={[styles.statIcon, { backgroundColor: colors.success }]}>
            <TrendingUp size={20} color="white" />
          </View>
          <Text style={styles.statValue}>{stats.currentStreak}</Text>
          <Text style={styles.statLabel}>Série</Text>
        </View>
      </View>
      
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          🎯 Tu as completé <Text style={styles.highlight}>{stats.totalSessions} sessions</Text> pour un total de{" "}
          <Text style={styles.highlight}>{Math.floor(stats.totalMinutes / 60)}h{stats.totalMinutes % 60}min</Text> de calme !
        </Text>
        
        {stats.currentStreak > 0 && (
          <Text style={styles.streakText}>
            🔥 Série actuelle : {stats.currentStreak} jour{stats.currentStreak > 1 ? 's' : ''} consécutif{stats.currentStreak > 1 ? 's' : ''} !
          </Text>
        )}
        
        {stats.longestStreak > stats.currentStreak && (
          <Text style={styles.recordText}>
            🏆 Record personnel : {stats.longestStreak} jours
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    minWidth: "45%",
    alignItems: "center",
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: "center",
  },
  summaryContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 16,
    gap: 8,
  },
  summaryText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    textAlign: "center",
  },
  highlight: {
    fontWeight: "600",
    color: colors.primary,
  },
  streakText: {
    fontSize: 13,
    color: colors.success,
    textAlign: "center",
    fontWeight: "500",
  },
  recordText: {
    fontSize: 12,
    color: colors.accent,
    textAlign: "center",
    fontWeight: "500",
  },
});