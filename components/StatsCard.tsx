import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "@/constants/colors";
import { UserStats } from "@/types";

type StatsCardProps = {
  stats: UserStats;
};

export default function StatsCard({ stats }: StatsCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <StatItem 
          value={stats.totalMinutes} 
          label="Minutes" 
          suffix="min"
        />
        <StatItem 
          value={stats.totalPoints} 
          label="Points" 
          precision={1}
        />
      </View>
      <View style={styles.row}>
        <StatItem 
          value={stats.completedSessions} 
          label="Sessions" 
        />
        <StatItem 
          value={stats.currentStreak} 
          label="Streak" 
          suffix="days"
        />
      </View>
    </View>
  );
}

type StatItemProps = {
  value: number;
  label: string;
  suffix?: string;
  precision?: number;
};

function StatItem({ value, label, suffix = "", precision = 0 }: StatItemProps) {
  const formattedValue = value.toFixed(precision);
  
  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>
        {formattedValue}
        {suffix && <Text style={styles.suffix}> {suffix}</Text>}
      </Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 4,
  },
  suffix: {
    fontSize: 14,
    fontWeight: "normal",
    color: colors.textLight,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textLight,
  },
});