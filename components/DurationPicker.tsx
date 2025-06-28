import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import colors from '@/constants/colors';

interface DurationPickerProps {
  durations: number[];
  selectedDuration: number;
  onSelect: (duration: number) => void;
}

export default function DurationPicker({ durations, selectedDuration, onSelect }: DurationPickerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Durée de ta session</Text>
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
              selectedDuration === duration && styles.selectedDuration
            ]}
            onPress={() => onSelect(duration)}
          >
            <Text style={[
              styles.durationText,
              selectedDuration === duration && styles.selectedText
            ]}>
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
    marginVertical: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  durationButton: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 6,
    borderWidth: 2,
    borderColor: colors.border,
  },
  selectedDuration: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  durationText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  selectedText: {
    color: 'white',
  },
});