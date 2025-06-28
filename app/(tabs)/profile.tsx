import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, Share, Platform } from "react-native";
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
      
      if (Platform.OS === 'web') {
        // Web fallback
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(message);
          Alert.alert('Copié !', 'Message copié dans le presse-papier');
        }
      } else {
        await Share.share({ message });
      }
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

  if (showSettings) {
    return (
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setShowSettings(false)}
          >
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Paramètres</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.settingsSectionTitle}>Préférences</Text>
          <View style={styles.settingsGroup}>
            <TouchableOpacity 
              style={styles.settingItem} 
              onPress={() => setNotifications(!notifications)}
            >
              <View style={styles.settingIconContainer}>
                <Bell size={20} color={colors.primary} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Notifications</Text>
                <Text style={styles.settingDescription}>
                  {notifications ? 'Activées' : 'Désactivées'}
                </Text>
              </View>
              <ChevronRight size={20} color={colors.textLight} />
            </TouchableOpacity>
          </View>

          <Text style={styles.settingsSectionTitle}>Communauté</Text>
          <View style={styles.settingsGroup}>
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
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profil</Text>
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={() => setShowSettings(true)}
          >
            <Settings size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <User size={32} color={colors.primary} />
          </View>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userTitle}>Eco-Warrior</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Clock size={20} color={colors.stats.time} />
            </View>
            <Text style={styles.statValue}>{Math.floor(stats.totalMinutes)}min</Text>
            <Text style={styles.statLabel}>Temps total</Text>
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
            <TouchableOpacity style={styles.quickAction} onPress={shareApp}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#FEE2E2' }]}>
                <Heart size={20} color="#EF4444" />
              </View>
              <Text style={styles.quickActionTitle}>Partager SeedTrade</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickAction} 
              onPress={() => Alert.alert('À propos de SeedTrade', 'SeedTrade v1.0.0\n\nTransforme ton temps de calme en impact positif pour la planète.\n\nDéveloppé avec ❤️ pour un monde meilleur.')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: '#DBEAFE' }]}>
                <Globe size={20} color="#3B82F6" />
              </View>
              <Text style={styles.quickActionTitle}>À propos</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickAction} 
              onPress={() => Alert.alert('⭐ Merci de nous soutenir !', 'Ton avis compte beaucoup pour nous aider à améliorer SeedTrade.')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: '#FEF3C7' }]}>
                <Star size={20} color="#F59E0B" />
              </View>
              <Text style={styles.quickActionTitle}>Noter l'app</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tes contributions</Text>
          {missionContributions.map(({ mission, contribution }) => (
            <View key={mission.id} style={styles.contributionCard}>
              <Text style={styles.contributionIcon}>{mission.icon}</Text>
              <View style={styles.contributionContent}>
                <Text style={styles.contributionTitle}>{mission.title}</Text>
                <Text style={styles.contributionValue}>
                  {contribution} {mission.impactUnit}
                </Text>
              </View>
            </View>
          ))}
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
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  settingsButton: {
    padding: 8,
  },
  backButton: {
    padding: 8,
  },
  placeholder: {
    width: 40,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  userTitle: {
    fontSize: 16,
    color: colors.textLight,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  statCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  statIconContainer: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textLight,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  quickActionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text,
    textAlign: 'center',
  },
  contributionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  contributionIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  contributionContent: {
    flex: 1,
  },
  contributionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  contributionValue: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  settingsSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginTop: 24,
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  settingsGroup: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginHorizontal: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: colors.textLight,
  },
  dangerIcon: {
    backgroundColor: colors.error + '20',
  },
  dangerText: {
    color: colors.error,
  },
});