import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Play, Info, Award } from 'lucide-react-native';
import { missions, Mission } from '@/constants/missions';
import { useSessionStore } from '@/store/useSessionStore';
import colors from '@/constants/colors';

export default function MissionsScreen() {
  const { activeMissionId, setActiveMission, stats, sessions } = useSessionStore();
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [showMissionDetail, setShowMissionDetail] = useState(false);

  const getMissionStats = (missionId: string) => {
    const missionSessions = sessions.filter(
      session => session.missionId === missionId && session.status === 'completed'
    );
    
    const totalSessions = missionSessions.length;
    const totalMinutes = missionSessions.reduce((sum, session) => sum + (session.actualDuration || 0), 0);
    const totalPoints = missionSessions.reduce((sum, session) => sum + session.points, 0);
    
    return {
      totalSessions,
      totalMinutes,
      totalPoints,
      impact: Math.floor(totalPoints / (missions.find(m => m.id === missionId)?.pointsPerMinute || 1)),
    };
  };

  const handleMissionPress = (mission: Mission) => {
    setSelectedMission(mission);
    setShowMissionDetail(true);
  };

  const handleSelectMission = (mission: Mission) => {
    setActiveMission(mission.id);
    setShowMissionDetail(false);
    Alert.alert(
      'Mission sélectionnée',
      `${mission.title} est maintenant votre mission active !`
    );
  };

  const renderMissionDetail = () => {
    if (!selectedMission) return null;

    const missionStats = getMissionStats(selectedMission.id);
    const isActive = activeMissionId === selectedMission.id;

    return (
      <Modal
        visible={showMissionDetail}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowMissionDetail(false)}
            >
              <X size={24} color={colors.textLight} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Détails de la mission</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={[styles.missionIcon, { backgroundColor: selectedMission.color }]}>
              <selectedMission.icon size={48} color="white" />
            </View>

            <Text style={styles.missionTitle}>{selectedMission.title}</Text>
            <Text style={styles.missionDescription}>
              {selectedMission.detailedDescription}
            </Text>

            <View style={styles.impactSection}>
              <Text style={styles.sectionTitle}>Votre impact</Text>
              <Text style={styles.impactDescription}>
                {selectedMission.impactDescription}
              </Text>
              
              <View style={styles.impactMetric}>
                <Text style={styles.impactValue}>
                  {selectedMission.pointsPerMinute} points
                </Text>
                <Text style={styles.impactLabel}>par minute</Text>
              </View>
            </View>

            <View style={styles.statsSection}>
              <Text style={styles.sectionTitle}>Vos statistiques</Text>
              
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Sessions complétées</Text>
                <Text style={styles.statValue}>{missionStats.totalSessions}</Text>
              </View>
              
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Temps total</Text>
                <Text style={styles.statValue}>{missionStats.totalMinutes} min</Text>
              </View>
              
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Points gagnés</Text>
                <Text style={styles.statValue}>{missionStats.totalPoints}</Text>
              </View>
              
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>{selectedMission.unit}</Text>
                <Text style={[styles.statValue, { color: selectedMission.color }]}>
                  {missionStats.impact}
                </Text>
              </View>
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            {!isActive ? (
              <TouchableOpacity
                style={[styles.selectButton, { backgroundColor: selectedMission.color }]}
                onPress={() => handleSelectMission(selectedMission)}
              >
                <Play size={20} color="white" />
                <Text style={styles.selectButtonText}>Sélectionner cette mission</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.activeIndicator}>
                <Award size={20} color={colors.success} />
                <Text style={styles.activeText}>Mission active</Text>
              </View>
            )}
          </View>
        </SafeAreaView>
      </Modal>
    );
  };

  const renderMissionCard = (mission: Mission) => {
    const missionStats = getMissionStats(mission.id);
    const isActive = activeMissionId === mission.id;

    return (
      <TouchableOpacity
        key={mission.id}
        style={[styles.missionCard, isActive && styles.activeMissionCard]}
        onPress={() => handleMissionPress(mission)}
      >
        <View style={styles.missionCardHeader}>
          <View style={[styles.missionCardIcon, { backgroundColor: mission.color }]}>
            <mission.icon size={28} color="white" />
          </View>
          
          <View style={styles.missionCardContent}>
            <Text style={styles.missionCardTitle}>{mission.title}</Text>
            <Text style={styles.missionCardDescription}>{mission.description}</Text>
          </View>
          
          <TouchableOpacity style={styles.infoButton}>
            <Info size={20} color={colors.textLight} />
          </TouchableOpacity>
        </View>

        <View style={styles.missionStats}>
          <View style={styles.missionStatItem}>
            <Text style={styles.missionStatValue}>{missionStats.totalSessions}</Text>
            <Text style={styles.missionStatLabel}>Sessions</Text>
          </View>
          
          <View style={styles.missionStatItem}>
            <Text style={styles.missionStatValue}>{missionStats.totalMinutes}</Text>
            <Text style={styles.missionStatLabel}>Minutes</Text>
          </View>
          
          <View style={styles.missionStatItem}>
            <Text style={[styles.missionStatValue, { color: mission.color }]}>
              {missionStats.impact}
            </Text>
            <Text style={styles.missionStatLabel} numberOfLines={1}>
              {mission.unit}
            </Text>
          </View>
        </View>

        {isActive && (
          <View style={styles.activeIndicatorSmall}>
            <Award size={16} color={colors.success} />
            <Text style={styles.activeTextSmall}>Active</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const groupedMissions = {
    environment: missions.filter(m => m.category === 'environment'),
    social: missions.filter(m => m.category === 'social'),
    education: missions.filter(m => m.category === 'education'),
  };

  const categoryTitles = {
    environment: 'Environnement',
    social: 'Social',
    education: 'Éducation',
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Missions</Text>
        <Text style={styles.subtitle}>
          Choisissez votre impact pour un monde meilleur
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {Object.entries(groupedMissions).map(([category, categoryMissions]) => (
          <View key={category} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>
              {categoryTitles[category as keyof typeof categoryTitles]}
            </Text>
            
            {categoryMissions.map(renderMissionCard)}
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Votre temps de déconnexion est transformé en actions concrètes.
            Chaque minute compte ! 🌱
          </Text>
        </View>
      </ScrollView>

      {renderMissionDetail()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
  },
  content: {
    flex: 1,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    marginHorizontal: 20,
  },
  missionCard: {
    backgroundColor: colors.surface,
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activeMissionCard: {
    borderWidth: 2,
    borderColor: colors.success,
  },
  missionCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  missionCardIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  missionCardContent: {
    flex: 1,
  },
  missionCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  missionCardDescription: {
    fontSize: 14,
    color: colors.textLight,
  },
  infoButton: {
    padding: 4,
  },
  missionStats: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    padding: 12,
  },
  missionStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  missionStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  missionStatLabel: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
    textAlign: 'center',
  },
  activeIndicatorSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    gap: 4,
  },
  activeTextSmall: {
    fontSize: 12,
    color: colors.success,
    fontWeight: '600',
  },
  footer: {
    padding: 20,
    paddingTop: 0,
  },
  footerText: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  closeButton: {
    padding: 4,
  },
  modalTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  placeholder: {
    width: 32,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  missionIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  missionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  missionDescription: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  impactSection: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  impactDescription: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 20,
    marginBottom: 16,
  },
  impactMetric: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: 4,
  },
  impactValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  impactLabel: {
    fontSize: 14,
    color: colors.textLight,
  },
  statsSection: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textLight,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  modalFooter: {
    padding: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  selectButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  activeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: colors.successLight,
    borderRadius: 12,
    gap: 8,
  },
  activeText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.success,
  },
});