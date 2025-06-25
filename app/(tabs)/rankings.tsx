import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Image } from "expo-image";
import { Award, Trophy, Medal } from "lucide-react-native";
import colors from "@/constants/colors";

interface RankingUser {
  id: number;
  name: string;
  points: number;
  avatar: string;
  sessions: number;
  streak: number;
}

export default function RankingsScreen() {
  const rankings: RankingUser[] = [
    { 
      id: 1, 
      name: "Sarah M.", 
      points: 450, 
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150",
      sessions: 45,
      streak: 12
    },
    { 
      id: 2, 
      name: "Thomas L.", 
      points: 380, 
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150",
      sessions: 38,
      streak: 8
    },
    { 
      id: 3, 
      name: "Julie R.", 
      points: 320, 
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=150",
      sessions: 32,
      streak: 15
    },
    { 
      id: 4, 
      name: "Alex D.", 
      points: 285, 
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150",
      sessions: 29,
      streak: 6
    },
    { 
      id: 5, 
      name: "Emma K.", 
      points: 265, 
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150",
      sessions: 27,
      streak: 9
    },
    { 
      id: 6, 
      name: "Marc P.", 
      points: 240, 
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150",
      sessions: 24,
      streak: 4
    },
    { 
      id: 7, 
      name: "Lisa W.", 
      points: 220, 
      avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?q=80&w=150",
      sessions: 22,
      streak: 7
    },
    { 
      id: 8, 
      name: "David H.", 
      points: 195, 
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150",
      sessions: 20,
      streak: 3
    },
  ];

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy size={20} color="#FFD700" />;
      case 2:
        return <Medal size={20} color="#C0C0C0" />;
      case 3:
        return <Award size={20} color="#CD7F32" />;
      default:
        return null;
    }
  };

  const getRankColor = (position: number): string => {
    switch (position) {
      case 1:
        return "#FFD700";
      case 2:
        return "#C0C0C0";
      case 3:
        return "#CD7F32";
      default:
        return colors.primary;
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Classement hebdomadaire</Text>
        <Text style={styles.subtitle}>Les meilleurs contributeurs de la semaine</Text>
      </View>

      {/* Podium */}
      <View style={styles.podium}>
        {/* 2ème place */}
        <View style={[styles.podiumItem, styles.secondPlace]}>
          <Image 
            source={{ uri: rankings[1].avatar }}
            style={styles.podiumAvatar}
            contentFit="cover"
          />
          <View style={[styles.podiumBadge, { backgroundColor: "#C0C0C0" }]}>
            <Text style={styles.podiumBadgeText}>2</Text>
          </View>
          <Text style={styles.podiumName}>{rankings[1].name}</Text>
          <Text style={styles.podiumPoints}>{rankings[1].points} pts</Text>
        </View>

        {/* 1ère place */}
        <View style={[styles.podiumItem, styles.firstPlace]}>
          <View style={styles.crown}>
            <Trophy size={24} color="#FFD700" />
          </View>
          <Image 
            source={{ uri: rankings[0].avatar }}
            style={[styles.podiumAvatar, styles.winnerAvatar]}
            contentFit="cover"
          />
          <View style={[styles.podiumBadge, { backgroundColor: "#FFD700" }]}>
            <Text style={styles.podiumBadgeText}>1</Text>
          </View>
          <Text style={styles.podiumName}>{rankings[0].name}</Text>
          <Text style={styles.podiumPoints}>{rankings[0].points} pts</Text>
        </View>

        {/* 3ème place */}
        <View style={[styles.podiumItem, styles.thirdPlace]}>
          <Image 
            source={{ uri: rankings[2].avatar }}
            style={styles.podiumAvatar}
            contentFit="cover"
          />
          <View style={[styles.podiumBadge, { backgroundColor: "#CD7F32" }]}>
            <Text style={styles.podiumBadgeText}>3</Text>
          </View>
          <Text style={styles.podiumName}>{rankings[2].name}</Text>
          <Text style={styles.podiumPoints}>{rankings[2].points} pts</Text>
        </View>
      </View>

      {/* Classement complet */}
      <View style={styles.rankingsContainer}>
        <Text style={styles.rankingsTitle}>Classement complet</Text>
        {rankings.map((user, index) => (
          <View key={user.id} style={styles.rankingItem}>
            <View style={[
              styles.rankPosition, 
              index < 3 && styles.topThree,
              { backgroundColor: getRankColor(index + 1) }
            ]}>
              {index < 3 ? getRankIcon(index + 1) : (
                <Text style={styles.rankNumber}>{index + 1}</Text>
              )}
            </View>
            
            <Image 
              source={{ uri: user.avatar }}
              style={styles.userAvatar}
              contentFit="cover"
            />
            
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userStats}>
                {user.sessions} sessions • Série de {user.streak}
              </Text>
            </View>
            
            <View style={styles.userPoints}>
              <Text style={styles.pointsValue}>{user.points}</Text>
              <Text style={styles.pointsLabel}>points</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Statistiques globales */}
      <View style={styles.globalStats}>
        <Text style={styles.statsTitle}>Statistiques globales</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>2,847</Text>
            <Text style={styles.statLabel}>Participants</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>45,672</Text>
            <Text style={styles.statLabel}>Sessions totales</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>1,823</Text>
            <Text style={styles.statLabel}>Heures de calme</Text>
          </View>
        </View>
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
    paddingBottom: 120,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: "center",
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
    textAlign: "center",
  },
  podium: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 24,
    marginBottom: 32,
    height: 200,
  },
  podiumItem: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.card,
    marginHorizontal: 4,
    borderRadius: 16,
    paddingTop: 16,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  firstPlace: {
    height: 180,
    marginTop: -20,
  },
  secondPlace: {
    height: 160,
  },
  thirdPlace: {
    height: 140,
  },
  crown: {
    position: "absolute",
    top: -12,
  },
  podiumAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 12,
  },
  winnerAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: "#FFD700",
  },
  podiumBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  podiumBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  podiumName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  podiumPoints: {
    fontSize: 12,
    color: colors.textLight,
  },
  rankingsContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  rankingsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 16,
  },
  rankingItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  rankPosition: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  topThree: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  rankNumber: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  userStats: {
    fontSize: 12,
    color: colors.textLight,
  },
  userPoints: {
    alignItems: "flex-end",
  },
  pointsValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
  pointsLabel: {
    fontSize: 12,
    color: colors.textLight,
  },
  globalStats: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: "center",
  },
});