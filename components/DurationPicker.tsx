import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import colors from '@/constants/colors';

interface DurationPickerProps {
  durations: number[];
  selectedDuration: number;
  onSelectDuration: (duration: number) => void;
}

export default function DurationPicker({
  durations,
  selectedDuration,
  onSelectDuration,
}: DurationPickerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Durée de la session</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {durations.map((duration) => (
          <TouchableOpacity
            key={duration}
            style={[
              styles.durationButton,
              selectedDuration === duration && styles.selectedButton,
            ]}
            onPress={() => onSelectDuration(duration)}
          >
            <Text
              style={[
                styles.durationText,
                selectedDuration === duration && styles.selectedText,
              ]}
            >
              {duration}min
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  scrollContainer: {
    paddingHorizontal: 4,
    gap: 8,
  },
  durationButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: colors.wellness.cream,
    borderWidth: 2,
    borderColor: 'transparent',
    minWidth: 60,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  durationText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  selectedText: {
    color: 'white',
  },
});