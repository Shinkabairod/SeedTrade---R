import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import colors from "@/constants/colors";
import { Mission } from "@/constants/missions";

type MissionCardProps = {
  mission: Mission;
  isActive: boolean;
  onPress: () => void;
};

const { width } = Dimensions.get("window");

export default function MissionCard({ mission, isActive, onPress }: MissionCardProps) {
  const progress = mission.current / mission.target;
  
  return (
    <TouchableOpacity 
      style={[styles.container, isActive && styles.activeContainer]} 
      onPress={onPress}
      activeOpacity={0.95}
    >
      <Image
        source={{ uri: mission.image }}
        style={styles.image}
        contentFit="cover"
        transition={300}
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.3)", "rgba(0,0,0,0.7)"]}
        style={styles.gradient}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{mission.title}</Text>
          {isActive && <View style={styles.activeBadge} />}
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {mission.description}
        </Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${progress * 100}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {mission.current.toLocaleString()} / {mission.target.toLocaleString()} {mission.unit}
          </Text>
        </View>
        <View style={styles.footer}>
          <View style={[styles.pointsBadge, { backgroundColor: mission.color }]}>
            <Text style={styles.pointsText}>{mission.pointsPerMinute} pts/min</Text>
          </View>
          <Text style={styles.progressPercentage}>
            {Math.round(progress * 100)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 220,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: colors.card,
    shadowColor: colors.shadowMedium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 4,
  },
  activeContainer: {
    borderWidth: 2,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "75%",
  },
  content: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
    flex: 1,
    letterSpacing: -0.5,
  },
  activeBadge: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.success,
    borderWidth: 2,
    borderColor: "white",
    marginLeft: 8,
    marginTop: 2,
  },
  description: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 16,
    lineHeight: 20,
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 3,
    marginBottom: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "white",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pointsBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  pointsText: {
    fontSize: 12,
    color: "white",
    fontWeight: "700",
  },
  progressPercentage: {
    fontSize: 14,
    color: "white",
    fontWeight: "600",
  },
});