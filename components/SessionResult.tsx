import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Animated, Share } from "react-native";
import { CheckCircle, X, Share2, RotateCcw } from "lucide-react-native";
import { Mission } from "@/constants/missions";
import colors from "@/constants/colors";

type SessionResultProps = {
  duration: number;
  mission: Mission;
  onClose: () => void;
  success: boolean;
};

export default function SessionResult({ duration, mission, onClose, success }: SessionResultProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const points = success ? duration * mission.pointsPerMinute : 0;
  const impact = success ? Math.floor(points / mission.pointsPerMinute) : 0;

  const handleShare = async () => {
    try {
      const message = success 
        ? `🎯 Je viens de terminer une session de ${duration} minutes avec SeedTrade !\n\n✅ ${points} points gagnés\n🌱 ${impact} ${mission.unit}\n\nChaque minute compte pour un monde meilleur ! #SeedTrade`
        : `🧘‍♂️ J'ai pris ${duration} minutes pour me concentrer avec SeedTrade.\n\nChaque moment de calme compte ! #SeedTrade #Mindfulness`;
        
      await Share.share({ message });
    } catch (error) {
      console.log('Erreur de partage:', error);
    }
  };

  return (
    <Animated.View 
      style={[
        styles.overlay,
        { opacity: fadeAnim }
      ]}
    >
      <Animated.View 
        style={[
          styles.container,
          {
            transform: [
              { scale: scaleAnim },
              { translateY: slideAnim }
            ]
          }
        ]}
      >
        {/* Close button */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <X size={24} color={colors.textLight} />
        </TouchableOpacity>

        {/* Success/Failure Icon */}
        <View style={[
          styles.iconContainer,
          { backgroundColor: success ? colors.success : colors.warning }
        ]}>
          {success ? (
            <CheckCircle size={48} color="white" />
          ) : (
            <RotateCcw size={48} color="white" />
          )}
        </View>

        {/* Title */}
        <Text style={styles.title}>
          {success ? 'Félicitations ! 🎉' : 'Session interrompue 😔'}
        </Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          {success 
            ? `Tu as terminé ta session de ${duration} minutes !`
            : `Tu as médité pendant ${duration} minutes, c'est déjà super !`
          }
        </Text>

        {/* Results */}
        <View style={styles.resultsContainer}>
          <View style={styles.resultRow}>
            <View style={styles.resultItem}>
              <Text style={styles.resultValue}>{points}</Text>
              <Text style={styles.resultLabel}>Points</Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.resultValue}>{impact}</Text>
              <Text style={styles.resultLabel}>{mission.unit}</Text>
            </View>
          </View>

          <View style={styles.missionInfo}>
            <Text style={styles.missionTitle}>{mission.title}</Text>
            <Text style={styles.missionImpact}>
              {success 
                ? `Tu as contribué à ${impact} ${mission.unit} !`
                : 'Chaque minute compte pour un monde meilleur.'
              }
            </Text>
          </View>
        </View>

        {/* Motivational message */}
        <View style={styles.motivationContainer}>
          <Text style={styles.motivationText}>
            {success 
              ? "Bravo ! Ton calme a une valeur réelle pour la planète. Continue comme ça ! 🌱"
              : "C'est déjà un excellent début ! La prochaine fois sera encore mieux. 💪"
            }
          </Text>
        </View>

        {/* Action buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.shareButton]}
            onPress={handleShare}
          >
            <Share2 size={20} color="white" />
            <Text style={styles.shareButtonText}>Partager</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.continueButton]}
            onPress={onClose}
          >
            <Text style={styles.continueButtonText}>Continuer</Text>
          </TouchableOpacity>
        </View>

        {/* Streak info */}
        {success && (
          <View style={styles.streakContainer}>
            <Text style={styles.streakText}>
              🔥 Reviens demain pour maintenir ta série !
            </Text>
          </View>
        )}
      </Animated.View>
    </Animated.View>
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
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.background,
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
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  resultsContainer: {
    width: '100%',
    marginBottom: 24,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  resultItem: {
    alignItems: 'center',
  },
  resultValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  resultLabel: {
    fontSize: 14,
    color: colors.textLight,
    fontWeight: '500',
  },
  missionInfo: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.background,
    borderRadius: 16,
  },
  missionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  missionImpact: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
  },
  motivationContainer: {
    marginBottom: 32,
  },
  motivationText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 24,
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
  streakContainer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    width: '100%',
  },
  streakText: {
    fontSize: 14,
    color: colors.accent,
    textAlign: 'center',
    fontWeight: '500',
  },
});