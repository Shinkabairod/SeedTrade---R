import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { CheckCircle, XCircle } from 'lucide-react-native';
import Button from './Button';
import colors from '@/constants/colors';

interface SessionResultProps {
  visible: boolean;
  success: boolean;
  points: number;
  duration: number;
  missionTitle: string;
  onClose: () => void;
  onNewSession: () => void;
}

export default function SessionResult({
  visible,
  success,
  points,
  duration,
  missionTitle,
  onClose,
  onNewSession
}: SessionResultProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            {success ? (
              <CheckCircle size={60} color={colors.success} />
            ) : (
              <XCircle size={60} color={colors.error} />
            )}
          </View>
          
          <Text style={styles.title}>
            {success ? 'Bravo !' : 'Pas grave !'}
          </Text>
          
          <Text style={styles.subtitle}>
            {success 
              ? 'Tu as terminé ta session avec succès' 
              : 'Tu peux réessayer quand tu veux'
            }
          </Text>
          
          {success && (
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{duration}min</Text>
                <Text style={styles.statLabel}>Temps de calme</Text>
              </View>
              
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{points}</Text>
                <Text style={styles.statLabel}>Points gagnés</Text>
              </View>
            </View>
          )}
          
          <Text style={styles.missionText}>
            Mission : {missionTitle}
          </Text>
          
          <View style={styles.buttons}>
            <Button
              title="Nouvelle session"
              onPress={onNewSession}
              style={styles.button}
            />
            
            <Button
              title="Fermer"
              onPress={onClose}
              variant="outline"
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    maxWidth: 320,
    width: '100%',
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,
  },
  missionText: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 24,
    textAlign: 'center',
  },
  buttons: {
    width: '100%',
    gap: 12,
  },
  button: {
    width: '100%',
  },
});