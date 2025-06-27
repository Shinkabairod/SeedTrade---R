import React from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Trophy, Target, Clock, Award } from "lucide-react-native";
import { useAchievements } from "@/hooks/useAchievements";
import { useSessionStore } from "@/store/useSessionStore";
import colors from "@/constants/colors";
import AchievementCard from "@/components/AchievementCard";

export default function AchievementsScreen() {
  const { achievements, getUnlockedCount, getProgressAchievements } = useAchievements();
  const { stats } = useSessionStore();
  
  const unlockedCount = getUnlockedCount();
  const progressAchievements = getProgressAchievements();
  
  const categoryAchievements = {
    session: achievements.filter(a => a.category === 'session'),
    impact: achievements.filter(a => a.category === 'impact'),
    streak: achievements.filter(a => a.category === 'streak'),
    time: achievements.filter(a => a.category === 'time'),
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Achievements</Text>
          <Text style={styles.subtitle}>Tes succès et récompenses</Text>
          <View style={styles.progressSummary}>
            <Text style={styles.progressText}>
              {unlockedCount}/{achievements.length} succès débloqués
            </Text>
          </View>
        </View>

        {/* Statistiques rapides */}
        <View style={styles.quickStatsContainer}>
          <View style={styles.quickStatCard}>
            <Trophy size={24} color={colors.primary} />
            <Text style={styles.quickStatValue}>{unlockedCount}</Text>
            <Text style={styles.quickStatLabel}>Débloqués</Text>
          </View>
          
          <View style={styles.quickStatCard}>
            <Target size={24} color={colors.success} />
            <Text style={styles.quickStatValue}>{progressAchievements.length}</Text>
            <Text style={styles.quickStatLabel}>En cours</Text>
          </View>
          
          <View style={styles.quickStatCard}>
            <Award size={24} color={colors.accent} />
            <Text style={styles.quickStatValue}>
              {Math.floor(stats.totalPoints / 500) + 1}
            </Text>
            <Text style={styles.quickStatLabel}>Niveau</Text>
          </View>
        </View>

        {/* Tous les achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tous les succès</Text>
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
              />
            ))}
          </View>
        </View>

        {/* Prochains objectifs */}
        {progressAchievements.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Prochains objectifs</Text>
            <View style={styles.objectivesContainer}>
              {progressAchievements.slice(0, 3).map(achievement => {
                const progress = achievement.progress && achievement.target 
                  ? (achievement.progress / achievement.target) * 100 
                  : 0;
                
                return (
                  <View key={achievement.id} style={styles.objectiveCard}>
                    <View style={styles.objectiveHeader}>
                      <Text style={styles.objectiveIcon}>{achievement.icon}</Text>
                      <View style={styles.objectiveInfo}>
                        <Text style={styles.objectiveTitle}>{achievement.title}</Text>
                        <Text style={styles.objectiveDescription}>
                          {achievement.description}
                        </Text>
                      </View>
                      <Text style={styles.objectiveProgress}>
                        {Math.round(progress)}%
                      </Text>
                    </View>
                    
                    <View style={styles.objectiveProgressBar}>
                      <View 
                        style={[
                          styles.objectiveProgressFill,
                          { width: `${progress}%` }
                        ]}
                      />
                    </View>
                    
                    <Text style={styles.objectiveProgressText}>
                      {achievement.progress}/{achievement.target}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* Achievements par catégorie */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Par catégorie</Text>
          
          {Object.entries(categoryAchievements).map(([category, categoryAchs]) => {
            if (categoryAchs.length === 0) return null;
            
            const categoryNames = {
              session: 'Sessions',
              impact: 'Impact',
              streak: 'Séries',
              time: 'Temps'
            };
            
            const categoryIcons = {
              session: Target,
              impact: Trophy,
              streak: Award,
              time: Clock
            };
            
            const CategoryIcon = categoryIcons[category as keyof typeof categoryIcons];
            const unlockedInCategory = categoryAchs.filter(a => a.unlocked).length;
            
            return (
              <View key={category} style={styles.categoryContainer}>
                <View style={styles.categoryHeader}>
                  <View style={styles.categoryTitleContainer}>
                    <CategoryIcon size={20} color={colors.primary} />
                    <Text style={styles.categoryTitle}>
                      {categoryNames[category as keyof typeof categoryNames]}
                    </Text>
                  </View>
                  <Text style={styles.categoryProgress}>
                    {unlockedInCategory}/{categoryAchs.length}
                  </Text>
                </View>
                
                <View style={styles.categoryAchievements}>
                  {categoryAchs.map((achievement) => (
                    <AchievementCard
                      key={achievement.id}
                      achievement={achievement}
                    />
                  ))}
                </View>
              </View>
            );
          })}
        </View>

        {/* Motivation */}
        <View style={styles.section}>
          <View style={styles.motivationCard}>
            <Text style={styles.motivationTitle}>Continue ton parcours ! 🚀</Text>
            <Text style={styles.motivationText}>
              Tu as déjà débloqué {unlockedCount} succès. 
              Chaque session te rapproche de nouveaux objectifs et d'un impact encore plus grand !
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
    marginBottom: 16,
  },
  progressSummary: {
    backgroundColor: colors.wellness.lavender,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  progressText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "600",
  },
  quickStatsContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 32,
  },
  quickStatCard: {
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
  quickStatValue: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginTop: 8,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  quickStatLabel: {
    fontSize: 11,
    color: colors.textLight,
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
  achievementsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  objectivesContainer: {
    gap: 12,
  },
  objectiveCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  objectiveHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  objectiveIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  objectiveInfo: {
    flex: 1,
  },
  objectiveTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 2,
    letterSpacing: -0.3,
  },
  objectiveDescription: {
    fontSize: 12,
    color: colors.textLight,
  },
  objectiveProgress: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
  },
  objectiveProgressBar: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    marginBottom: 8,
    overflow: "hidden",
  },
  objectiveProgressFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  objectiveProgressText: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: "center",
    fontWeight: "500",
  },
  categoryContainer: {
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  categoryTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    letterSpacing: -0.3,
  },
  categoryProgress: {
    fontSize: 14,
    color: colors.textLight,
    fontWeight: "500",
  },
  categoryAchievements: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
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
  },
});