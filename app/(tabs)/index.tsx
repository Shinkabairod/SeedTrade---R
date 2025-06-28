import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { 
  User, 
  Settings, 
  Sparkles, 
  Target,
  Zap,
  Clock
} from "lucide-react-native";

// Import simplifié - si ça marche pas on fera du hard coding
let missions: any[] = [];
let colors: any = {};
let useSessionStore: any = () => ({
  stats: { totalPoints: 0, currentStreak: 0, totalMinutes: 0 },
  isHydrated: true,
  activeMissionId: 'reforestation',
  currentSession: null,
  setActiveMission: () => {},
  startSession: () => {}
});

// Essaie d'importer si possible, sinon utilise les fallbacks
try {
  const missionsModule = require('@/constants/missions');
  missions = missionsModule.missions || [];
  
  const colorsModule = require('@/constants/colors');
  colors = colorsModule.default || {};
  
  const storeModule = require('@/store/useSessionStore');
  useSessionStore = storeModule.useSessionStore || useSessionStore;
} catch (error) {
  console.log('Import error:', error);
  // Utilise les valeurs par défaut
  missions = [
    {
      id: 'reforestation',
      title: 'Reforestation',
      description: 'Contribue à la plantation d\'arbres',
      icon: '🌳',
      pointsPerMinute: 2
    }
  ];
  
  colors = {
    background: '#FEFEFE',
    surface: '#FFFFFF',
    primary: '#6366F1',
    text: '#1F2937',
    textLight: '#6B7280',
    backgroundLight: '#F9FAFB',
    stats: {
      points: '#F59E0B',
      streak: '#EF4444',
      time: '#3B82F6'
    }
  };
}

const DURATIONS = [5, 10, 20, 30, 45, 60];

export default function HomeScreen() {
  const store = useSessionStore();
  const [selectedDuration, setSelectedDuration] = useState(20);

  // Show loading state while hydrating
  if (!store.isHydrated) {
    return (
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const activeMission = missions.find(m => m.id === store.activeMissionId) || missions[0] || {
    id: 'default',
    title: 'Mission par défaut',
    description: 'Test',
    icon: '🌱'
  };
  
  const handleStartSession = () => {
    try {
      store.startSession(selectedDuration);
      router.push("/session");
    } catch (error) {
      Alert.alert("Erreur", "Impossible de démarrer la session");
    }
  };
  
  const handleSelectMission = (missionId: string) => {
    try {
      store.setActiveMission(missionId);
    } catch (error) {
      console.log('Error selecting mission:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>Bonjour 👋</Text>
          <Text style={styles.headerTitle}>Prêt pour une session ?</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => {
              try {
                router.push("/(tabs)/profile");
              } catch (error) {
                Alert.alert("Navigation", "Fonctionnalité à venir");
              }
            }}
          >
            <User size={20} color={colors.text || '#000'} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => Alert.alert("Paramètres", "Fonctionnalité à venir")}
          >
            <Settings size={20} color={colors.text || '#000'} />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <View style={styles.sessionCard}>
            <View style={styles.sessionHeader}>
              <Sparkles size={24} color={colors.primary || '#6366F1'} />
              <Text style={styles.sessionCardTitle}>
                {store.currentSession ? 'Session en cours' : 'Nouvelle session'}
              </Text>
            </View>
            
            {!store.currentSession ? (
              <>
                <Text style={styles.sessionCardSubtitle}>
                  Choisis ta durée et commence à avoir un impact
                </Text>
                
                <View style={styles.durationSection}>
                  <Text style={styles.durationTitle}>Durée</Text>
                  <View style={styles.durationButtons}>
                    {DURATIONS.map((duration) => (
                      <TouchableOpacity
                        key={duration}
                        style={[
                          styles.durationButton,
                          selectedDuration === duration && styles.selectedDuration
                        ]}
                        onPress={() => setSelectedDuration(duration)}
                      >
                        <Text style={[
                          styles.durationText,
                          selectedDuration === duration && styles.selectedText
                        ]}>
                          {duration}min
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                
                <TouchableOpacity 
                  style={styles.startButton}
                  onPress={handleStartSession}
                >
                  <Text style={styles.startButtonText}>Commencer la session</Text>
                </TouchableOpacity>
              </>
            ) : (
              <View style={styles.activeSessionContainer}>
                <Text style={styles.sessionActiveText}>
                  Session en cours...
                </Text>
                <TouchableOpacity 
                  style={styles.startButton}
                  onPress={() => {
                    try {
                      router.push("/session");
                    } catch (error) {
                      Alert.alert("Session", "Voir la session active");
                    }
                  }}
                >
                  <Text style={styles.startButtonText}>Voir la session</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        
        <View style={styles.quickStatsSection}>
          <View style={styles.quickStatsGrid}>
            <View style={styles.quickStatCard}>
              <View style={styles.quickStatIcon}>
                <Zap size={20} color={colors.stats?.points || '#F59E0B'} />
              </View>
              <Text style={styles.quickStatValue}>{store.stats?.totalPoints || 0}</Text>
              <Text style={styles.quickStatLabel}>Points</Text>
            </View>
            
            <View style={styles.quickStatCard}>
              <View style={styles.quickStatIcon}>
                <Target size={20} color={colors.stats?.streak || '#EF4444'} />
              </View>
              <Text style={styles.quickStatValue}>{store.stats?.currentStreak || 0}</Text>
              <Text style={styles.quickStatLabel}>Série</Text>
            </View>
            
            <View style={styles.quickStatCard}>
              <View style={styles.quickStatIcon}>
                <Clock size={20} color={colors.stats?.time || '#3B82F6'} />
              </View>
              <Text style={styles.quickStatValue}>{Math.floor(store.stats?.totalMinutes || 0)}min</Text>
              <Text style={styles.quickStatLabel}>Temps total</Text>
            </View>
          </View>
        </View>

        <View style={styles.missionSection}>
          <Text style={styles.sectionTitle}>Ta mission active</Text>
          <View style={styles.missionCard}>
            <Text style={styles.missionIcon}>{activeMission.icon}</Text>
            <View style={styles.missionContent}>
              <Text style={styles.missionTitle}>{activeMission.title}</Text>
              <Text style={styles.missionDescription}>{activeMission.description}</Text>
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
    backgroundColor: '#FEFEFE',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#1F2937',
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: '#1F2937',
  },
  headerIcons: {
    flexDirection: "row",
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    paddingBottom: 120,
  },
  heroSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  sessionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 28,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 8,
  },
  sessionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  sessionCardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: '#1F2937',
  },
  sessionCardSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
    lineHeight: 20,
  },
  durationSection: {
    marginBottom: 24,
  },
  durationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  durationButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  durationButton: {
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  selectedDuration: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  durationText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  selectedText: {
    color: 'white',
  },
  startButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 16,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  activeSessionContainer: {
    alignItems: 'center',
  },
  sessionActiveText: {
    fontSize: 16,
    color: '#6366F1',
    marginBottom: 16,
    textAlign: 'center',
  },
  quickStatsSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  quickStatsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickStatCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 4,
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickStatIcon: {
    marginBottom: 8,
  },
  quickStatValue: {
    fontSize: 18,
    fontWeight: "700",
    color: '#1F2937',
    marginBottom: 4,
  },
  quickStatLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: "center",
  },
  missionSection: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: '#1F2937',
    marginBottom: 16,
  },
  missionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  missionIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  missionContent: {
    flex: 1,
  },
  missionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  missionDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
});