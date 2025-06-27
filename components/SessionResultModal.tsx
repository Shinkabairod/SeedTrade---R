import React, { useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Modal, 
  Animated, 
  Share,
  Alert 
} from 'react-native';
import { CheckCircle, Clock, Share2, RotateCcw } from 'lucide-react-native';
import colors from '@/constants/colors';
import { Mission } from '@/constants/missions';

type SessionResultModalProps = {
  visible: boolean;
  onClose: () => void;
  success: boolean;
  sessionTime: number;
  mission: Mission;
  earnedPoints: number;
  impactAmount: number;
};

export default function SessionResultModal({
  visible,
  onClose,
  success,
  sessionTime,
  mission,
  earnedPoints,
  impactAmount
}: SessionResultModalProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.8);
    }
  }, [visible]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleShare = async () => {
    try {
      const message = success 
        ? `🎯 Je viens de terminer une session de ${formatTime(sessionTime)} avec SeedTrade !

✅ ${earnedPoints} points gagnés
🌱 ${impactAmount} ${mission.unit}

Chaque minute compte pour un monde meilleur ! #SeedTrade`
        : `🧘‍♂️ J'ai pris ${formatTime(sessionTime)} pour me concentrer avec SeedTrade.

Chaque moment de calme compte ! #SeedTrade #Mindfulness`;
        
      await Share.share({ message });
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de partager pour le moment.');
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View 
        style={[styles.overlay, { opacity: fadeAnim }]}
      >
        <Animated.View 
          style={[
            styles.container,
            {
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          {/* Icon */}
          <View style={[
            styles.iconContainer,
            { backgroundColor: success ? colors.success : colors.warning }
          ]}>
            {success ? (
              <CheckCircle size={48} color="white" />
            ) : (
              <Clock size={48} color="white" />
            )}
          </View>

          {/* Title */}
          <Text style={styles.title}>
            {success ? 'Félicitations ! 🎉' : 'Session terminée 👍'}
          </Text>

          {/* Description */}
          <Text style={styles.description}>
            {success 
              ? `Tu as gagné ${earnedPoints} points et contribué à ${impactAmount} ${mission.unit} !`
              : 'Chaque effort compte ! Continue comme ça.'
            }
          </Text>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{formatTime(sessionTime)}</Text>
              <Text style={styles.statLabel}>Temps</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{earnedPoints}</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{impactAmount}</Text>
              <Text style={styles.statLabel}>{mission.unit}</Text>
            </View>
          </View>

          {/* Mission info */}
          <View style={styles.missionContainer}>
            <Text style={styles.missionTitle}>{mission.title}</Text>
            <Text style={styles.missionDescription}>
              {success 
                ? `Tu as contribué à ${impactAmount} ${mission.unit} !`
                : 'Chaque minute compte pour un monde meilleur.'
              }
            </Text>
          </View>

          {/* Actions */}
          <View style={styles.actionsContainer}>
            {success && (
              <TouchableOpacity 
                style={[styles.actionButton, styles.shareButton]}
                onPress={handleShare}
              >
                <Share2 size={18} color="white" />
                <Text style={styles.shareButtonText}>Partager</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={[
                styles.actionButton, 
                styles.continueButton,
                !success && styles.fullWidthButton
              ]}
              onPress={onClose}
            >
              <Text style={styles.continueButtonText}>Continuer</Text>
            </TouchableOpacity>
          </View>

          {/* Motivation */}
          {success && (
            <View style={styles.motivationContainer}>
              <Text style={styles.motivationText}>
                🔥 Reviens demain pour maintenir ta série !
              </Text>
            </View>
          )}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 32,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 12,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,
    fontWeight: '500',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  missionContainer: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.background,
    borderRadius: 16,
    width: '100%',
    marginBottom: 24,
  },
  missionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  missionDescription: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
  },
  fullWidthButton: {
    flex: 1,
  },
  shareButton: {
    backgroundColor: colors.secondary,
  },
  shareButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: colors.primary,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  motivationContainer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    width: '100%',
  },
  motivationText: {
    fontSize: 14,
    color: colors.accent,
    textAlign: 'center',
    fontWeight: '500',
  },
});