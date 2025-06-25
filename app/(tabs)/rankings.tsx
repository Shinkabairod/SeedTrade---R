import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Image } from "expo-image";
import { Award } from "lucide-react-native";
import colors from "@/constants/colors";

export default function RankingsScreen() {
  const rankings = [
    { id: 1, name: "Sarah M.", points: 450, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330" },
    { id: 2, name: "Thomas L.", points: 380, avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde" },
    { id: 3, name: "Julie R.", points: 320, avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12" },
    // Add more mock rankings...
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Classement hebdomadaire</Text>
        <Text style={styles.subtitle}>Les meilleurs contributeurs de la semaine</Text>
      </View>

      <View style={styles.rankingsContainer}>
        {rankings.map((user, index) => (
          <View key={user.id} style={styles.rankingItem}>
            <View style={[styles.rankPosition, index < 3 && styles.topThree]}>
              {index < 3 ? (
                <Award size={20} color="white" />
              ) : (
                <Text style={styles.rankNumber}>{index + 1}</Text>
              )}
            </View>
            
            <Image
              source={{ uri: user.avatar }}
              style={styles.avatar}
              contentFit="cover"
            />
            
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userPoints}>{user.points} points</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
  },
  rankingsContainer: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  rankingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rankPosition: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.inactive,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  topThree: {
    backgroundColor: colors.primary,
  },
  rankNumber: {
    color: colors.text,
    fontWeight: "600",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 2,
  },
  userPoints: {
    fontSize: 14,
    color: colors.textLight,
  },
});