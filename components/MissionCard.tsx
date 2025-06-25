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
const cardWidth = width * 0.85;

export default function MissionCard({ mission, isActive, onPress }: MissionCardProps) {
  const progress = mission.current / mission.target;
  
  return (
    <TouchableOpacity 
      style={[styles.container, isActive && styles.activeContainer]} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image
        source={{ uri: mission.image }}
        style={styles.image}
        contentFit="cover"
        transition={300}
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.7)"]}
        style={styles.gradient}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{mission.title}</Text>
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
        <View style={styles.categoryContainer}>
          <View style={[styles.categoryBadge, { backgroundColor: mission.color }]}>
            <Text style={styles.categoryText}>{mission.pointsPerMinute} pts/min</Text>
          </View>
        </View>
      </View>
      {isActive && <View style={styles.activeBadge} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: colors.card,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  activeContainer: {
    borderWidth: 2,
    borderColor: colors.primary,
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
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
    height: "70%",
  },
  content: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 12,
    lineHeight: 18,
  },
  progressContainer: {
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 2,
    marginBottom: 6,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "white",
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "500",
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    color: "white",
    fontWeight: "600",
  },
  activeBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.success,
    borderWidth: 2,
    borderColor: "white",
  },
});