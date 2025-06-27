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
        <Clock size={18} color={colors.primary} />
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
          Plus tu restes concentré, plus tu accumules de points !
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
    marginVertical: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    letterSpacing: -0.3,
  },
  scrollContent: {
    paddingVertical: 4,
    gap: 12,
  },
  durationButton: {
    width: 68,
    height: 68,
    borderRadius: 20,
    backgroundColor: colors.wellness.cream,
    borderWidth: 2,
    borderColor: colors.wellness.sand,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  durationText: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    letterSpacing: -0.5,
  },
  selectedText: {
    color: "white",
  },
  unitText: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
    fontWeight: "500",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  selectedUnit: {
    color: "rgba(255, 255, 255, 0.8)",
  },
  infoContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: colors.wellness.lavender,
    borderRadius: 16,
  },
  infoText: {
    fontSize: 14,
    color: colors.text,
    textAlign: "center",
    marginBottom: 4,
    fontWeight: "500",
  },
  pointsInfo: {
    fontSize: 12,
    color: colors.primary,
    textAlign: "center",
    fontWeight: "600",
  },
});