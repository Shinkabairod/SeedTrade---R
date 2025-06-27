import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, Share } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { 
  Calendar, 
  Clock, 
  Award, 
  Target, 
  Settings, 
  Share2, 
  User,
  Heart,
  Globe,
  Star,
  Bell,
  HelpCircle,
  ChevronRight,
  ArrowLeft
} from "lucide-react-native";
import { useSessionStore } from "@/store/useSessionStore";
import { missions } from "@/constants/missions";
import colors from "@/constants/colors";

export default function ProfileScreen() {
  const { 
    stats, 
    sessions, 
    notifications, 
    userName, 
    setNotifications, 
    setUserName,
    resetStore 
  } = useSessionStore();
  
  const [showSettings, setShowSettings] = useState(false);
  
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

  const shareApp = async () => {
    try {
      const message = `🌱 Je viens de découvrir SeedTrade ! Cette app transforme le temps passé loin du téléphone en actions positives pour la planète. Rejoins-moi ! #SeedTrade`;
      
      await Share.share({ message });
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de partager pour le moment.');
    }
  };

  const resetProgress = () => {
    Alert.alert(
      '⚠️ Réinitialiser les données',
      'Êtes-vous sûr de vouloir réinitialiser toutes vos données ? Cette action est irréversible.',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Réinitialiser', 
          style: 'destructive',
          onPress: () => {
            resetStore();
            Alert.alert('Données réinitialisées', 'Toutes vos données ont été supprimées.');
          }
        }
      ]
    );
  };

  const handleEditName = () => {
    Alert.prompt(
      'Modifier le nom',
      'Entrez votre nouveau nom :',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Confirmer', 
          onPress: (newName) => {
            if (newName && newName.trim()) {
              setUserName(newName.trim());
            }
          }
        }
      ],
      'plain-text',
      userName
    );
  };

  if (showSettings) {
    return (
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <View style={styles.settingsHeader}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setShowSettings(false)}
          >
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.settingsTitle}>Paramètres</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.settingsContent}>
          <Text style={styles.settingsSectionTitle}>Préférences</Text>
          <View style={styles.settingsGroup}>
            <View style={styles.settingItem}>
              <View style={styles.settingIconContainer}>
                <Bell size={20} color={colors.primary} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Notifications</Text>
                <Text style={styles.settingDescription}>
                  Rappels de sessions et encouragements
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.toggle,
                  notifications ? styles.toggleActive : styles.toggleInactive
                ]}
                onPress={() => setNotifications(!notifications)}
              >
                <View style={[
                  styles.toggleThumb,
                  notifications ? styles.toggleThumbActive : styles.toggleThumbInactive
                ]} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.settingItem} onPress={handleEditName}>
              <View style={styles.settingIconContainer}>
                <User size={20} color={colors.primary} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Nom d'utilisateur</Text>
                <Text style={styles.settingDescription}>{userName}</Text>
              </View>
              <ChevronRight size={20} color={colors.textLight} />
            </TouchableOpacity>
          </View>

          <Text style={styles.settingsSectionTitle}>Support</Text>
          <View style={styles.settingsGroup}>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingIconContainer}>
                <HelpCircle size={20} color={colors.secondary} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Aide & FAQ</Text>
                <Text style={styles.settingDescription}>
                  Questions fréquentes et support
                </Text>
              </View>
              <ChevronRight size={20} color={colors.textLight} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem} onPress={shareApp}>
              <View style={styles.settingIconContainer}>
                <Share2 size={20} color={colors.secondary} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Partager l'app</Text>
                <Text style={styles.settingDescription}>
                  Invite tes amis à rejoindre SeedTrade
                </Text>
              </View>
              <ChevronRight size={20} color={colors.textLight} />
            </TouchableOpacity>
          </View>

          <Text style={styles.settingsSectionTitle}>Zone de danger</Text>
          <View style={styles.settingsGroup}>
            <TouchableOpacity style={styles.settingItem} onPress={resetProgress}>
              <View style={[styles.settingIconContainer, styles.dangerIcon]}>
                <Settings size={20} color={colors.error} />
              </View>
              <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, styles.dangerText]}>
                  Réinitialiser les données
                </Text>
                <Text style={styles.settingDescription}>
                  Supprime toutes tes sessions et statistiques
                </Text>
              </View>
              <ChevronRight size={20} color={colors.error} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <TouchableOpacity 
            style={styles.avatarContainer}
            onPress={handleEditName}
          >
            <Text style={styles.avatarText}>{userName.charAt(0).toUpperCase()}</Text>
          </TouchableOpacity>
          <Text style={styles.profileName}>{userName}</Text>
          <Text style={styles.profileSubtitle}>
            Niveau {Math.floor(stats.totalPoints / 500) + 1} • {stats.totalPoints} points
          </Text>
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => setShowSettings(true)}
            >
              <Settings size={18} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={shareApp}
            >
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
          <Text style={styles.sectionTitle}>Actions rapides</Text>
          <View style={styles.quickActionsContainer}>
            {[
              { icon: Heart, title: 'Partager SeedTrade', color: 'bg-red-100', action: shareApp },
              { icon: Globe, title: 'À propos', color: 'bg-blue-100', action: () => Alert.alert('À propos de SeedTrade', 'SeedTrade v1.0.0\n\nTransforme ton temps de calme en impact positif pour la planète.\n\nDéveloppé avec ❤️ pour un monde meilleur.') },
              { icon: Star, title: 'Noter l\'app', color: 'bg-yellow-100', action: () => Alert.alert('⭐ Merci de nous soutenir !', 'Ton avis compte beaucoup pour nous aider à améliorer SeedTrade.') },
            ].map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <TouchableOpacity 
                  key={index}
                  style={styles.quickActionCard}
                  onPress={item.action}
                >
                  <View style={styles.quickActionIcon}>
                    <ItemIcon size={20} color={colors.text} />
                  </View>
                  <Text style={styles.quickActionTitle}>{item.title}</Text>
                  <ChevronRight size={16} color={colors.textLight} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ton impact total</Text>
          <View style={styles.impactSummaryCard}>
            <View style={styles.impactGrid}>
              <View style={styles.impactItem}>
                <Text style={styles.impactValue}>{stats.treesPlanted}</Text>
                <Text style={styles.impactLabel}>🌳 Arbres plantés</Text>
              </View>
              <View style={styles.impactItem}>
                <Text style={styles.impactValue}>{stats.oceanCleaned}kg</Text>
                <Text style={styles.impactLabel}>🌊 Océan nettoyé</Text>
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
  quickActionsContainer: {
    gap: 12,
  },
  quickActionCard: {
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
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.wellness.cream,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  quickActionTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    letterSpacing: -0.3,
  },
  impactSummaryCard: {
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
    gap: 24,
  },
  impactItem: {
    flex: 1,
    alignItems: "center",
  },
  impactValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "white",
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  impactLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    fontWeight: "500",
  },
  // Settings styles
  settingsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: colors.card,
  },
  settingsTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },
  settingsContent: {
    flex: 1,
    padding: 20,
  },
  settingsSectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 12,
    marginTop: 20,
    letterSpacing: -0.3,
  },
  settingsGroup: {
    backgroundColor: colors.card,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  dangerIcon: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 4,
  },
  dangerText: {
    color: colors.error,
  },
  settingDescription: {
    fontSize: 14,
    color: colors.textLight,
  },
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    padding: 2,
    justifyContent: "center",
  },
  toggleActive: {
    backgroundColor: colors.primary,
  },
  toggleInactive: {
    backgroundColor: colors.border,
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "white",
  },
  toggleThumbActive: {
    alignSelf: "flex-end",
  },
  toggleThumbInactive: {
    alignSelf: "flex-start",
  },
});