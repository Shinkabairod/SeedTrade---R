import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';
import { router } from 'expo-router';
import { 
  Settings, 
  Play, 
  Star, 
  Target, 
  TrendingUp, 
  Timer,
  Leaf,
  ChevronRight 
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import colors from '@/constants/colors';

const DURATIONS = [5, 15, 30, 60];

export default function HomeScreen() {
  const [selectedDuration, setSelectedDuration] = useState(15);
  const fadeAnim = new Animated.Value(0);

  // Animation d'entrée
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  // Stats utilisateur (à connecter avec votre store)
  const userStats = {
    totalPoints: 1247,
    sessionsCompleted: 23,
    streak: 5,
    totalMinutes: 342,
  };

  const activeMission = {
    title: 'Plantation d\'arbres',
    description: 'Contribue à la reforestation mondiale',
    color: colors.missions.tree,
    pointsPerMinute: 2,
    impact: 'arbres plantés',
  };

  const handleStartSession = () => {
    router.push('/session');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      {/* Header moderne */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SeedTrade</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => router.push('/settings')}
          >
            <Settings size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Section Hero avec animation */}
        <Animated.View 
          style={[
            styles.heroSection,
            { opacity: fadeAnim }
          ]}
        >
          <Text style={styles.heroTitle}>Ton calme a de la valeur</Text>
          <Text style={styles.heroSubtitle}>
            Chaque minute loin de ton téléphone contribue à un monde meilleur
          </Text>

          {/* Carte de session moderne */}
          <View style={styles.sessionCard}>
            <LinearGradient
              colors={[colors.primary, colors.primaryLight]}
              style={styles.sessionCardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.sessionCardTitle}>Lancer une session</Text>
              
              {/* Sélecteur de durée */}
              <View style={styles.durationPicker}>
                {DURATIONS.map((duration) => (
                  <TouchableOpacity
                    key={duration}
                    style={[
                      styles.durationOption,
                      selectedDuration === duration && styles.selectedDuration,
                    ]}
                    onPress={() => setSelectedDuration(duration)}
                  >
                    <Text style={[
                      styles.durationText,
                      selectedDuration === duration && styles.selectedDurationText,
                    ]}>
                      {duration}min
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity 
                style={styles.startButton} 
                onPress={handleStartSession}
                activeOpacity={0.8}
              >
                <Play size={24} color={colors.primary} fill={colors.primary} />
                <Text style={styles.startButtonText}>Commencer</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </Animated.View>

        {/* Section statistiques */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ton impact</Text>
          <View style={styles.statsGrid}>
            <View style={[styles.statCard, { backgroundColor: colors.stats.points + '15' }]}>
              <View style={[styles.statIcon, { backgroundColor: colors.stats.points }]}>
                <Star size={20} color="white" />
              </View>
              <Text style={styles.statValue}>{userStats.totalPoints}</Text>
              <Text style={styles.statLabel}>Points totaux</Text>
            </View>

            <View style={[styles.statCard, { backgroundColor: colors.stats.sessions + '15' }]}>
              <View style={[styles.statIcon, { backgroundColor: colors.stats.sessions }]}>
                <Target size={20} color="white" />
              </View>
              <Text style={styles.statValue}>{userStats.sessionsCompleted}</Text>
              <Text style={styles.statLabel}>Sessions</Text>
            </View>

            <View style={[styles.statCard, { backgroundColor: colors.stats.streak + '15' }]}>
              <View style={[styles.statIcon, { backgroundColor: colors.stats.streak }]}>
                <TrendingUp size={20} color="white" />
              </View>
              <Text style={styles.statValue}>{userStats.streak}</Text>
              <Text style={styles.statLabel}>Série</Text>
            </View>

            <View style={[styles.statCard, { backgroundColor: colors.stats.time + '15' }]}>
              <View style={[styles.statIcon, { backgroundColor: colors.stats.time }]}>
                <Timer size={20} color="white" />
              </View>
              <Text style={styles.statValue}>{userStats.totalMinutes}</Text>
              <Text style={styles.statLabel}>Minutes</Text>
            </View>
          </View>
        </View>

        {/* Mission active */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mission active</Text>
          <TouchableOpacity 
            style={styles.activeMissionCard}
            onPress={() => router.push('/(tabs)/missions')}
            activeOpacity={0.8}
          >
            <View style={[styles.missionIcon, { backgroundColor: activeMission.color }]}>
              <Leaf size={28} color="white" />
            </View>
            <View style={styles.missionDetails}>
              <Text style={styles.activeMissionTitle}>{activeMission.title}</Text>
              <Text style={styles.activeMissionDescription}>{activeMission.description}</Text>
              <Text style={styles.missionPoints}>
                {activeMission.pointsPerMinute} pts/min • {Math.floor(userStats.totalPoints / activeMission.pointsPerMinute)} {activeMission.impact}
              </Text>
            </View>
            <ChevronRight size={20} color={colors.primary} />
          </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: colors.background,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120, // Espace pour la navigation
  },
  heroSection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  sessionCard: {
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
  sessionCardGradient: {
    padding: 24,
  },
  sessionCardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  durationPicker: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  durationOption: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: