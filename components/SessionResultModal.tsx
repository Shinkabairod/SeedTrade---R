import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CheckCircle, XCircle, Award, Zap } from 'lucide-react-native';
import colors from '@/constants/colors';
import { Mission } from '@/constants/missions';
import Button from './Button';

const { width } = Dimensions.get('window');

interface SessionResultModalProps {
  visible: boolean;
  onClose: () => void;
  success: boolean;
  sessionTime: number; // in seconds
  mission: Mission;
  earnedPoints: number;
  impactAmount: number;
}

export default function SessionResultModal({
  visible,
  onClose,
  success,
  sessionTime,
  mission,
  earnedPoints,
  impactAmount,
}: SessionResultModalProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LinearGradient
            colors={success ? [colors.success, colors.primary] : [colors.error, colors.warning]}
            style={styles.header}
          >
            <View style={styles.iconContainer}>
              {success ? (
                <CheckCircle size={48} color="white" />
              ) : (
                <XCircle size={48} color="white" />
              )}
            </View>
            <Text style={styles.title}>
              {success ? 'Bravo !' : 'Session interrompue'}
            </Text>
            <Text style={styles.subtitle}>
              {success 
                ? 'Tu as terminé ta session avec succès'
                : 'Ce n\'est pas grave, tu peux réessayer'
              }
            </Text>
          </LinearGradient>

          <View style={styles.content}>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{formatTime(sessionTime)}</Text>
                <Text style={styles.statLabel}>Temps passé</Text>
              </View>
              
              {success && (
                <>
                  <View style={styles.statItem}>
                    <View style={styles.statValueContainer}>
                      <Zap size={20} color={colors.stats.points} />
                      <Text style={styles.statValue}>{earnedPoints}</Text>
                    </View>
                    <Text style={styles.statLabel}>Points gagnés</Text>
                  </View>
                  
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{impactAmount}</Text>
                    <Text style={styles.statLabel}>{mission.unit}</Text>
                  </View>
                </>
              )}
            </View>

            {success && (
              <View style={styles.impactContainer}>
                <Award size={24} color={colors.primary} />
                <Text style={styles.impactText}>
                  Tu as contribué à {mission.impact.title.toLowerCase()}
                </Text>
              </View>
            )}

            <Button
              title="Continuer"
              onPress={onClose}
              size="large"
              style={styles.button}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  container: {
    width: width - 48,
    maxWidth: 400,
    backgroundColor: colors.card,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 8,
  },
  header: {
    padding: 32,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 24,
  },
  content: {
    padding: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  impactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.wellness.cream,
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  impactText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
    textAlign: 'center',
  },
  button: {
    width: '100%',
  },
});