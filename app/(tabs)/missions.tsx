import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronRight, Info, CheckCircle } from "lucide-react-native";
import { useSessionStore } from "@/store/useSessionStore";
import { missions } from "@/constants/missions";
import MissionCard from "@/components/MissionCard";
import colors from "@/constants/colors";

export default function MissionsScreen() {
  const { activeMissionId, setActiveMission } = useSessionStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Toutes', count: missions.length },
    { id: 'environment', label: 'Environnement', count: missions.filter(m => m.category === 'environment').length },
    { id: 'social', label: 'Social', count: missions.filter(m => m.category === 'social').length },
    { id: 'education', label: 'Éducation', count: missions.filter(m => m.category === 'education').length },
  ];

  const filteredMissions = selectedCategory === 'all' 
    ? missions 
    : missions.filter(m => m.category === selectedCategory);

  const handleSelectMission = (missionId: string) => {
    const mission = missions.find(m => m.id === missionId);
    if (!mission) return;

    if (activeMissionId !== missionId) {
      Alert.alert(
        'Changer de mission ?',
        `Veux-tu vraiment changer pour "${mission.title}" ?

Tu gagneras ${mission.pointsPerMinute} points par minute avec cette mission.`,
        [
          { text: 'Annuler', style: 'cancel' },
          { 
            text: 'Changer', 
            style: 'default',
            onPress: () => {
              setActiveMission(missionId);
              Alert.alert(
                'Mission activée ! 🎯',
                `Tu contribues maintenant à "${mission.title}"`,
                [{ text: 'Super !', style: 'default' }]
              );
            }
          }
        ]
      );
    }
  };

  const showMissionInfo = (mission: typeof missions[0]) => {
    const progress = (mission.current / mission.target) * 100;
    
    Alert.alert(
      mission.title,
      `${mission.description}

📊 Progression: ${mission.current.toLocaleString()} / ${mission.target.toLocaleString()} ${mission.unit} (${progress.toFixed(1)}%)

💰 ${mission.pointsPerMinute} points par minute

🏷️ Catégorie: ${mission.category}`,
      [{ text: 'OK', style: 'default' }]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Choisis ta Mission</Text>
        <Text style={styles.headerSubtitle}>
          Sélectionne la cause qui te tient à cœur
        </Text>
      </View>

      {/* Categories filter */}
      <View style={styles.categoriesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && styles.selectedCategory,
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.selectedCategoryText,
                ]}
              >
                {category.label}
              </Text>
              <View style={[
                styles.categoryBadge,
                selectedCategory === category.id && styles.selectedCategoryBadge,
              ]}>
                <Text style={[
                  styles.categoryCount,
                  selectedCategory === category.id && styles.selectedCategoryCount,
                ]}>
                  {category.count}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Active mission highlight */}
        <View style={styles.activeMissionSection}>
          <Text style={styles.sectionTitle}>Ta mission active</Text>
          {(() => {
            const activeMission = missions.find(m => m.id === activeMissionId);
            return activeMission ? (
              <View style={styles.activeMissionContainer}>
                <MissionCard
                  mission={activeMission}
                  isActive={true}
                  onPress={() => {}}
                />
                <TouchableOpacity 
                  style={styles.infoButton}
                  onPress={() => showMissionInfo(activeMission)}
                >
                  <Info size={20} color={colors.primary} />
                  <Text style={styles.infoButtonText}>Plus d'infos</Text>
                </TouchableOpacity>
              </View>
            ) : null;
          })()}
        </View>

        {/* All missions */}
        <View style={styles.allMissionsSection}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'all' ? 'Toutes les missions' : `Missions ${categories.find(c => c.id === selectedCategory)?.label.toLowerCase()}`}
          </Text>
          <Text style={styles.sectionSubtitle}>
            Touche une mission pour la sélectionner
          </Text>
          
          <View style={styles.missionsGrid}>
            {filteredMissions.map((mission) => (
              <View key={mission.id} style={styles.missionContainer}>
                <MissionCard
                  mission={mission}
                  isActive={activeMissionId === mission.id}
                  onPress={() => handleSelectMission(mission.id)}
                />
                <View style={styles.missionFooter}>
                  <TouchableOpacity 
                    style={styles.missionInfoButton}
                    onPress={() => showMissionInfo(mission)}
                  >
                    <Info size={16} color={colors.textLight} />
                  </TouchableOpacity>
                  <View style={styles.missionMeta}>
                    <Text style={styles.missionCategory}>
                      {mission.category}
                    </Text>
                    <Text style={styles.missionProgress}>
                      {((mission.current / mission.target) * 100).toFixed(1)}% complété
                    </Text>
                  </View>
                  {activeMissionId === mission.id && (
                    <View style={styles.activeIndicator}>
                      <CheckCircle size={16} color={colors.success} />
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Impact summary */}
        <View style={styles.impactSection}>
          <Text style={styles.sectionTitle}>Impact global</Text>
          <View style={styles.impactContainer}>
            <View style={styles.impactStats}>
              {missions.slice(0, 3).map((mission) => (
                <View key={mission.id} style={styles.impactStat}>
                  <Text style={styles.impactValue}>
                    {mission.current.toLocaleString()}
                  </Text>
                  <Text style={styles.impactLabel}>
                    {mission.unit}
                  </Text>
                </View>
              ))}
            </View>
            <Text style={styles.impactMessage}>
              Grâce à tous les contributeurs SeedTrade, nous créons un impact réel ! 🌍
            </Text>
          </View>
        </View>

        {/* Call to action */}
        <View style={styles.ctaSection}>
          <View style={styles.ctaContainer}>
            <Text style={styles.ctaTitle}>Prêt à contribuer ?</Text>
            <Text style={styles.ctaText}>
              Lance ta première session et commence à avoir un impact positif dès maintenant !
            </Text>
            <TouchableOpacity 
              style={styles.ctaButton}
              onPress={() => {
                // Navigate to home to start session
                // This would be handled by the tab navigation
              }}
            >
              <Text style={styles.ctaButtonText}>Commencer une session</Text>
              <ChevronRight size={20} color="white" />
            </TouchableOpacity>
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
  header: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textLight,
  },
  categoriesContainer: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  categoriesScroll: {
    paddingHorizontal: 24,
    gap: 12,
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  selectedCategory: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text,
  },
  selectedCategoryText: {
    color: "white",
  },
  categoryBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: colors.border,
  },
  selectedCategoryBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  categoryCount: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textLight,
  },
  selectedCategoryCount: {
    color: "white",
  },
  scrollContent: {
    paddingBottom: 120,
  },
  activeMissionSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  activeMissionContainer: {
    gap: 12,
  },
  infoButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.primary,
  },
  allMissionsSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 20,
  },
  missionsGrid: {
    gap: 20,
  },
  missionContainer: {
    gap: 8,
  },
  missionFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  missionInfoButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.card,
  },
  missionMeta: {
    flex: 1,
  },
  missionCategory: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.primary,
    textTransform: "capitalize",
    marginBottom: 2,
  },
  missionProgress: {
    fontSize: 11,
    color: colors.textLight,
  },
  activeIndicator: {
    padding: 4,
  },
  impactSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  impactContainer: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  impactStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  impactStat: {
    alignItems: "center",
  },
  impactValue: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  impactLabel: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: "center",
  },
  impactMessage: {
    fontSize: 14,
    color: colors.text,
    textAlign: "center",
    lineHeight: 20,
  },
  ctaSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  ctaContainer: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  ctaText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});