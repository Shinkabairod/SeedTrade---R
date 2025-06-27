import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Clock, Trophy, Target, Award, TrendingUp } from "lucide-react-native";
import { useSessionStore } from "@/store/useSessionStore";
import colors from "@/constants/colors";

export default function StatsScreen() {
  const { stats } = useSessionStore();

  const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Tes Statistiques</Text>
          <Text style={styles.subtitle}>Suis tes progrès et ton impact</Text>
        </View>

        {/* Main Stats Cards */}
        <View style={styles.mainStatsContainer}>
          <View style={[styles.mainStatCard, { backgroundColor: colors.primary }]}>
            <Clock size={32} color="white" />
            <Text style={styles.mainStatValue}>{Math.floor(stats.totalMinutes / 60)}h</Text>
            <Text style={styles.mainStatLabel}>Temps total</Text>
          </View>
          
          <View style={[styles.mainStatCard, { backgroundColor: colors.success }]}>
            <Trophy size={32} color="white" />
            <Text style={styles.mainStatValue}>{stats.totalSessions}</Text>
            <Text style={styles.mainStatLabel}>Sessions réussies</Text>
          </View>
        </View>

        {/* Weekly Progress Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progression cette semaine</Text>
          <View style={styles.chartCard}>
            <View style={styles.chart}>
              {stats.weeklyData.map((height, index) => (
                <View key={index} style={styles.chartColumn}>
                  <View 
                    style={[
                      styles.chartBar,
                      { 
                        height: `${Math.max(height, 5)}%`,
                        backgroundColor: height > 0 ? colors.primary : colors.border
                      }
                    ]}
                  />
                  <Text style={styles.chartLabel}>
                    {weekDays[index]}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Detailed Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistiques détaillées</Text>
          <View style={styles.detailedStatsContainer}>
            <View style={styles.detailedStatCard}>
              <View style={styles.detailedStatIcon}>
                <Award size={20} color={colors.stats.points} />
              </View>
              <View style={styles.detailedStatContent}>
                <Text style={styles.detailedStatValue}>{stats.totalPoints}</Text>
                <Text style={styles.detailedStatLabel}>Points totaux</Text>
              </View>
            </View>

            <View style={styles.detailedStatCard}>
              <View style={styles.detailedStatIcon}>
                <Target size={20} color={colors.stats.streak} />
              </View>
              <View style={styles.detailedStatContent}>
                <Text style={styles.detailedStatValue}>{stats.currentStreak}</Text>
                <Text style={styles.detailedStatLabel}>Série actuelle</Text>
              </View>
            </View>

            <View style={styles.detailedStatCard}>
              <View style={styles.detailedStatIcon}>
                <TrendingUp size={20} color={colors.stats.sessions} />
              </View>
              <View style={styles.detailedStatContent}>
                <Text style={styles.detailedStatValue}>{stats.longestStreak}</Text>
                <Text style={styles.detailedStatLabel}>Meilleure série</Text>
              </View>
            </View>

            <View style={styles.detailedStatCard}>
              <View style={styles.detailedStatIcon}>
                <Clock size={20} color={colors.stats.time} />
              </View>
              <View style={styles.detailedStatContent}>
                <Text style={styles.detailedStatValue}>{stats.totalMinutes}</Text>
                <Text style={styles.detailedStatLabel}>Minutes totales</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Environmental Impact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ton impact environnemental</Text>
          <View style={styles.impactCard}>
            <View style={styles.impactGrid}>
              <View style={styles.impactItem}>
                <Text style={styles.impactEmoji}>🌳</Text>
                <Text style={styles.impactValue}>{stats.treesPlanted}</Text>
                <Text style={styles.impactLabel}>Arbres plantés</Text>
              </View>
              <View style={styles.impactItem}>
                <Text style={styles.impactEmoji}>🌊</Text>
                <Text style={styles.impactValue}>{stats.oceanCleaned}kg</Text>
                <Text style={styles.impactLabel}>Océan nettoyé</Text>
              </View>
              <View style={styles.impactItem}>
                <Text style={styles.impactEmoji}>♻️</Text>
                <Text style={styles.impactValue}>{stats.materialsRecycled}kg</Text>
                <Text style={styles.impactLabel}>Matériaux recyclés</Text>
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
    paddingBottom: 120,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: "center",
  },
  mainStatsContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 32,
  },
  mainStatCard: {
    flex: 1,
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    shadowColor: colors.shadowMedium,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 8,
  },
  mainStatValue: {
    fontSize: 32,
    fontWeight: "700",
    color: "white",
    marginTop: 12,
    marginBottom: 4,
    letterSpacing: -1,
  },
  mainStatLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "500",
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
  chartCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  chart: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 120,
  },
  chartColumn: {
    flex: 1,
    alignItems: "center",
    height: "100%",
    justifyContent: "flex-end",
  },
  chartBar: {
    width: "60%",
    borderRadius: 4,
    marginBottom: 8,
  },
  chartLabel: {
    fontSize: 12,
    color: colors.textLight,
    fontWeight: "500",
  },
  detailedStatsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  detailedStatCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  detailedStatIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.wellness.cream,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  detailedStatContent: {
    flex: 1,
  },
  detailedStatValue: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 2,
    letterSpacing: -0.5,
  },
  detailedStatLabel: {
    fontSize: 12,
    color: colors.textLight,
    fontWeight: "500",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  impactCard: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 24,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  impactGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  impactItem: {
    alignItems: "center",
  },
  impactEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  impactValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  impactLabel: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    fontWeight: "500",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
});