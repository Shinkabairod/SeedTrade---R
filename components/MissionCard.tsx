import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckCircle } from 'lucide-react-native';
import { Mission } from '@/constants/missions';
import colors from '@/constants/colors';

interface MissionCardProps {
  mission: Mission;
  isActive: boolean;
  onSelect: () => void;
}

export default function MissionCard({ mission, isActive, onSelect }: MissionCardProps) {
  return (
    <TouchableOpacity 
      style={[styles.container, isActive && styles.activeContainer]}
      onPress={onSelect}
    >
      <View style={styles.header}>
        <Text style={styles.icon}>{mission.icon}</Text>
        {isActive && <CheckCircle size={20} color={colors.success} />}
      </View>
      
      <Text style={styles.title}>{mission.title}</Text>
      <Text style={styles.description}>{mission.description}</Text>
      
      <View style={styles.footer}>
        <Text style={styles.impact}>{mission.estimatedImpact}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.border,
  },
  activeContainer: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    fontSize: 32,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 12,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: 12,
  },
  impact: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
});