import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import colors from "@/constants/colors";

type DurationPickerProps = {
  durations: number[];
  selectedDuration: number;
  onSelectDuration: (duration: number) => void;
};

export default function DurationPicker({
  durations,
  selectedDuration,
  onSelectDuration,
}: DurationPickerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Session Duration</Text>
      <View style={styles.optionsContainer}>
        {durations.map((duration) => (
          <TouchableOpacity
            key={duration}
            style={[
              styles.option,
              selectedDuration === duration && styles.selectedOption,
            ]}
            onPress={() => onSelectDuration(duration)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.optionText,
                selectedDuration === duration && styles.selectedOptionText,
              ]}
            >
              {duration} min
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 12,
    textAlign: "center",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 12,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 80,
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: "500",
  },
  selectedOptionText: {
    color: "white",
  },
});