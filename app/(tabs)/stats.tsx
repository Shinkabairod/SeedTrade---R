import React from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Clock, Trophy, Target, Award, TrendingUp, TreePine, Droplets, Recycle } from "lucide-react-native";
import { useSessionStore } from "@/store/useSessionStore";
import colors from "@/constants/colors";

const { width } = Dimensions.get('window');

export default function StatsScreen() {
  const { stats } = useSessionStore();

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
  };

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

        {/* Cartes principales */}
        <View style={styles.mainStatsContainer}>
          <View style={[styles.mainStatCard, styles.timeCard]}>
            <Clock size={32} color="white" />
            <Text style={styles.mainStatValue}>{formatTime(stats.totalMinutes)}</Text>
            <Text style={styles.mainStatLabel}>Temps total</Text>
          </View>
          
          <View style={[styles.mainStatCard, styles.sessionsCard]}>
            <Trophy size={32} color="white" />
            <Text style={styles.mainStatValue}>{stats.totalSessions}</Text>
            <Text style={styles.mainStatLabel}>Sessions réussies</Text>
          </View>
        </View>

        {/* Graphique de progression */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progression cette semaine</Text>
          <View style={styles.chartContainer}>
            <View style={styles.chart}>
              {stats.weeklyData.map((value, index) => (
                <View key={index} style={styles.chartColumn}>
                  <View 
                    style={[
                      styles.chartBar,
                      { height: `${Math.max(value, 5)}%` }
                    ]}
                  />
                  <Text style={styles.chartLabel}>
                    {['L', 'M', 'M', 'J', 'V', 'S', 'D'][index]}
                  </Text>
                </View>
              ))}
            </View>
            <Text style={styles.chartDescription}>
              Minutes de méditation par jour
            </Text>
          </View>
        </View>

        {/* Stats détaillées */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Détails</Text>
          <View style={styles.detailStatsContainer}>
            <View style={styles.detailStatCard}>
              <View style={styles.detailStatIcon}>
                <Target size={20} color={colors.primary} />
              </View>
              <View style={styles.detailStatContent}>
                <Text style={styles.detailStatValue}>{stats.totalPoints}</Text>
                <Text style={styles.detailStatLabel}>Points totaux</Text>
              </View>
            </View>
            
            <View style={styles.detailStatCard}>
              <View style={styles.detailStatIcon}>
                <TrendingUp size={20} color={colors.success} />
              </View>
              <View style={styles.detailStatContent}>
                <Text style={styles.detailStatValue}>{stats.currentStreak}</Text>
                <Text style={styles.detailStatLabel}>Série actuelle</Text>
              </View>
            </View>
            
            <View style={styles.detailStatCard}>
              <View style={styles.detailStatIcon}>
                <Award size={20} color={colors.accent} />
              </View>
              <View style={styles.detailStatContent}>
                <Text style={styles.detailStatValue}>{stats.longestStreak}</Text>
                <Text style={styles.detailStatLabel}>Meilleure série</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Impact environnemental */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ton impact</Text>
          <View style={styles.impactContainer}>
            <View style={styles.impactCard}>
              <View style={styles.impactIcon}>
                <TreePine size={24} color={colors.success} />
              </View>
              <Text style={styles.impactValue}>{stats.treesPlanted}</Text>
              <Text style={styles.impactLabel}>Arbres plantés</Text>
            </View>
            
            <View style={styles.impactCard}>
              <View style={styles.impactIcon}>
                <Droplets size={24} color={colors.primary} />
              </View>
              <Text style={styles.impactValue}>{stats.oceanCleaned}kg</Text>
              <Text style={styles.impactLabel}>Océan nettoyé</Text>
            </View>
            
            <View style={styles.impactCard}>
              <View style={styles.impactIcon}>
                <Recycle size={24} color={colors.secondary} />
              </View>
              <Text style={styles.impactValue}>{stats.materialsRecycled}kg</Text>
              <Text style={styles.impactLabel}>Matériaux recyclés</Text>
            </View>
          </View>
        </View>

        {/* Motivation */}
        <View style={styles.section}>
          <View style={styles.motivationCard}>
            <Text style={styles.motivationTitle}>Continue comme ça ! 🌟</Text>
            <Text style={styles.motivationText}>
              Tu as déjà passé {formatTime(stats.totalMinutes)} en méditation. 
              Chaque minute contribue à un monde meilleur et à ton bien-être personnel.
            </Text>
            <View style={styles.motivationStats}>
              <Text style={styles.motivationStat}>
                Niveau {Math.floor(stats.totalPoints / 500) + 1}
              </Text>
              <Text style={styles.motivationProgress}>
                {stats.totalPoints % 500}/500 points pour le niveau suivant
              </Text>
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
    gap: 12,
    marginBottom: 32,
  },
  mainStatCard: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: colors.shadowMedium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  timeCard: {
    backgroundColor: colors.primary,
  },
  sessionsCard: {
    backgroundColor: colors.success,
  },
  mainStatValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "white",
    marginTop: 12,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  mainStatLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.9)",
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
  chartContainer: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  chart: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 120,
    marginBottom: 16,
  },
  chartColumn: {
    flex: 1,
    alignItems: "center",
    height: "100%",
    justifyContent: "flex-end",
  },
  chartBar: {
    width: "60%",
    backgroundColor: colors.primary,
    borderRadius: 4,
    marginBottom: 8,
    minHeight: 4,
  },
  chartLabel: {
    fontSize: 12,
    color: colors.textLight,
    fontWeight: "500",
  },
  chartDescription: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: "center",
    fontStyle: "italic",
  },
  detailStatsContainer: {
    gap: 12,
  },
  detailStatCard: {
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
  detailStatIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.wellness.cream,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  detailStatContent: {
    flex: 1,
  },
  detailStatValue: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 2,
    letterSpacing: -0.5,
  },
  detailStatLabel: {
    fontSize: 14,
    color: colors.textLight,
    fontWeight: "500",
  },
  impactContainer: {
    flexDirection: "row",
    gap: 12,
  },
  impactCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  impactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.wellness.cream,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  impactValue: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  impactLabel: {
    fontSize: 11,
    color: colors.textLight,
    textAlign: "center",
    fontWeight: "500",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  motivationCard: {
    backgroundColor: colors.wellness.cream,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.wellness.sand,
  },
  motivationTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 12,
    textAlign: "center",
    letterSpacing: -0.3,
  },
  motivationText: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 16,
  },
  motivationStats: {
    alignItems: "center",
  },
  motivationStat: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
    marginBottom: 4,
  },
  motivationProgress: {
    fontSize: 12,
    color: colors.textLight,
  },
});