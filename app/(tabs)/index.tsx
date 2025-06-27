import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Play,
  Pause,
  RotateCcw,
  Target,
  Clock,
  Award,
  TreePine,
  Waves,
  Recycle,
  Leaf,
} from 'lucide-react-native';
import { useSessionStore } from '@/store/useSessionStore';

const colors = {
  primary: '#2E7D32',
  secondary: '#4CAF50',
  accent: '#81C784',
  background: '#F8FDF8',
  surface: '#FFFFFF',
  text: '#1B5E20',
  textLight: '#666666',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  stats: {
    streak: '#FF6B35',
    sessions: '#4285F4',
    points: '#9C27B0',
  },
};

const missions = [
  {
    id: 'reforestation',
    title: 'Reforestation',
    description: 'Chaque minute plantée = 1 arbre',
    icon: TreePine,
    color: colors.primary,
    pointsPerMinute: 10,
    unit: 'arbres plantés',
  },
  {
    id: 'ocean',
    title: 'Nettoyage océan',
    description: 'Chaque minute = 50g déchets retirés',
    icon: Waves,
    color: '#1976D2',
    pointsPerMinute: 8,
    unit: 'kg déchets retirés',
  },
  {
    id: 'recycling',
    title: 'Recyclage',
    description: 'Chaque minute = matériaux recyclés',
    icon: Recycle,
    color: '#388E3C',
    pointsPerMinute: 12,
    unit: 'kg matériaux recyclés',
  },
];

export default function HomeScreen() {
  const {
    stats,
    currentSession,
    activeMissionId,
    showSessionResult,
    startSession,
    completeSession,
    failSession,
    setActiveMission,
    setShowSessionResult,
  } = useSessionStore();

  const [sessionTime, setSessionTime] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(5);
  const fadeAnim = new Animated.Value(1);

  const activeMission = missions.find(m => m.id === activeMissionId) || missions[0];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (currentSession) {
      interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - currentSession.startTime) / 1000);
        setSessionTime(elapsed);
      }, 1000);
    } else {
      setSessionTime(0);
    }

    return () => clearInterval(interval);
  }, [currentSession]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartSession = () => {
    if (currentSession) {
      Alert.alert(
        'Session en cours',
        'Voulez-vous terminer la session actuelle ?',
        [
          { text: 'Continuer', style: 'cancel' },
          { text: 'Terminer', onPress: completeSession },
        ]
      );
      return;
    }

    startSession(activeMissionId, selectedDuration);
  };

  const handleCompleteSession = () => {
    Alert.alert(
      'Terminer la session',
      'Félicitations ! Voulez-vous terminer votre session ?',
      [
        { text: 'Continuer', style: 'cancel' },
        { text: 'Terminer', onPress: completeSession },
      ]
    );
  };

  const handleFailSession = () => {
    Alert.alert(
      'Abandonner la session',
      'Êtes-vous sûr de vouloir abandonner cette session ?',
      [
        { text: 'Continuer', style: 'cancel' },
        { text: 'Abandonner', style: 'destructive', onPress: failSession },
      ]
    );
  };

  const renderSessionResult = () => {
    if (!showSessionResult) return null;

    return (
      <View style={styles.modalOverlay}>
        <View style={styles.resultModal}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowSessionResult(false)}
          >
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
          
          <View style={styles.resultIcon}>
            <Award size={48} color={colors.success} />
          </View>
          
          <Text style={styles.resultTitle}>Session terminée !</Text>
          <Text style={styles.resultText}>
            Vous avez contribué à {activeMission.title}
          </Text>
          
          <TouchableOpacity
            style={styles.resultButton}
            onPress={() => setShowSessionResult(false)}
          >
            <Text style={styles.resultButtonText}>Continuer</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>SeedTrade</Text>
          <Text style={styles.subtitle}>
            Transforme ton temps en impact positif
          </Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Target size={20} color={colors.stats.sessions} />
            <Text style={styles.statValue}>{stats.totalSessions}</Text>
            <Text style={styles.statLabel}>Sessions</Text>
          </View>
          
          <View style={styles.statCard}>
            <Clock size={20} color={colors.stats.streak} />
            <Text style={styles.statValue}>{stats.totalMinutes}</Text>
            <Text style={styles.statLabel}>Minutes</Text>
          </View>
          
          <View style={styles.statCard}>
            <Award size={20} color={colors.stats.points} />
            <Text style={styles.statValue}>{stats.totalPoints}</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
        </View>

        {/* Mission Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choisir une mission</Text>
          <View style={styles.missionsContainer}>
            {missions.map((mission) => (
              <TouchableOpacity
                key={mission.id}
                style={[
                  styles.missionCard,
                  activeMissionId === mission.id && styles.missionCardActive,
                ]}
                onPress={() => setActiveMission(mission.id)}
              >
                <View style={[styles.missionIcon, { backgroundColor: mission.color }]}>
                  <mission.icon size={24} color="white" />
                </View>
                <Text style={styles.missionTitle}>{mission.title}</Text>
                <Text style={styles.missionDescription}>{mission.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Session Timer */}
        <View style={styles.timerSection}>
          <View style={styles.timerContainer}>
            <View style={[styles.timerCircle, currentSession && styles.timerCircleActive]}>
              <Text style={styles.timerText}>{formatTime(sessionTime)}</Text>
              {currentSession && (
                <Text style={styles.timerTarget}>
                  / {selectedDuration}:00
                </Text>
              )}
            </View>
          </View>

          {!currentSession ? (
            <>
              {/* Duration Selection */}
              <View style={styles.durationContainer}>
                <Text style={styles.sectionTitle}>Durée (minutes)</Text>
                <View style={styles.durationButtons}>
                  {[5, 10, 15, 30].map((duration) => (
                    <TouchableOpacity
                      key={duration}
                      style={[
                        styles.durationButton,
                        selectedDuration === duration && styles.durationButtonActive,
                      ]}
                      onPress={() => setSelectedDuration(duration)}
                    >
                      <Text
                        style={[
                          styles.durationButtonText,
                          selectedDuration === duration && styles.durationButtonTextActive,
                        ]}
                      >
                        {duration}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Start Button */}
              <TouchableOpacity style={styles.startButton} onPress={handleStartSession}>
                <Play size={24} color="white" />
                <Text style={styles.startButtonText}>Commencer</Text>
              </TouchableOpacity>
            </>
          ) : (
            /* Session Controls */
            <View style={styles.sessionControls}>
              <TouchableOpacity style={styles.completeButton} onPress={handleCompleteSession}>
                <Pause size={24} color="white" />
                <Text style={styles.controlButtonText}>Terminer</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.failButton} onPress={handleFailSession}>
                <RotateCcw size={24} color="white" />
                <Text style={styles.controlButtonText}>Abandonner</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Impact Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Votre impact</Text>
          <View style={styles.impactContainer}>
            <View style={styles.impactCard}>
              <TreePine size={24} color={colors.primary} />
              <Text style={styles.impactValue}>{stats.treesPlanted}</Text>
              <Text style={styles.impactLabel}>Arbres plantés</Text>
            </View>
            
            <View style={styles.impactCard}>
              <Waves size={24} color="#1976D2" />
              <Text style={styles.impactValue}>{stats.oceanCleaned}</Text>
              <Text style={styles.impactLabel}>kg océan nettoyé</Text>
            </View>
            
            <View style={styles.impactCard}>
              <Recycle size={24} color="#388E3C" />
              <Text style={styles.impactValue}>{stats.materialsRecycled}</Text>
              <Text style={styles.impactLabel}>kg recyclés</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {renderSessionResult()}
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
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  missionsContainer: {
    gap: 12,
  },
  missionCard: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  missionCardActive: {
    borderWidth: 2,
    borderColor: colors.accent,
  },
  missionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  missionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  missionDescription: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 4,
    flex: 1,
  },
  timerSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  timerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  timerCircleActive: {
    borderColor: colors.primary,
  },
  timerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
  },
  timerTarget: {
    fontSize: 16,
    color: colors.textLight,
  },
  durationContainer: {
    marginBottom: 24,
  },
  durationButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  durationButton: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  durationButtonActive: {
    backgroundColor: colors.accent,
    borderColor: colors.primary,
  },
  durationButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  durationButtonTextActive: {
    color: 'white',
  },
  startButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 12,
    gap: 8,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  sessionControls: {
    flexDirection: 'row',
    gap: 12,
  },
  completeButton: {
    flex: 1,
    backgroundColor: colors.success,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  failButton: {
    flex: 1,
    backgroundColor: colors.error,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  controlButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  impactContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  impactCard: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  impactValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 8,
  },
  impactLabel: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 4,
    textAlign: 'center',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultModal: {
    backgroundColor: colors.surface,
    margin: 20,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: colors.textLight,
  },
  resultIcon: {
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  resultText: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 24,
  },
  resultButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  resultButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});