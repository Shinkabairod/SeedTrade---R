import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Clock } from "lucide-react-native";
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
      <View style={styles.header}>
        <Clock size={20} color={colors.primary} />
        <Text style={styles.title}>Durée de ta session</Text>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {durations.map((duration) => (
          <TouchableOpacity
            key={duration}
            style={[
              styles.durationButton,
              selectedDuration === duration && styles.selectedButton,
            ]}
            onPress={() => onSelectDuration(duration)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.durationText,
                selectedDuration === duration && styles.selectedText,
              ]}
            >
              {duration}
            </Text>
            <Text
              style={[
                styles.unitText,
                selectedDuration === duration && styles.selectedUnit,
              ]}
            >
              min
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          💡 Plus tu restes concentré, plus tu accumules de points !
        </Text>
        <Text style={styles.pointsInfo}>
          {selectedDuration} min = ~{selectedDuration * 2} points
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  scrollContent: {
    paddingVertical: 8,
    gap: 12,
  },
  durationButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  durationText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
  selectedText: {
    color: "white",
  },
  unitText: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
  },
  selectedUnit: {
    color: "rgba(255, 255, 255, 0.9)",
  },
  infoContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoText: {
    fontSize: 14,
    color: colors.text,
    textAlign: "center",
    marginBottom: 4,
  },
  pointsInfo: {
    fontSize: 12,
    color: colors.primary,
    textAlign: "center",
    fontWeight: "600",
  },
});