import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useSessionStore } from "@/store/useSessionStore";
import { missions } from "@/constants/missions";
import colors from "@/constants/colors";
import MissionCard from "@/components/MissionCard";
import StatsCard from "@/components/StatsCard";
import Button from "@/components/Button";
import DurationPicker from "@/components/DurationPicker";

const DURATIONS = [5, 10, 20, 30, 45, 60];

export default function HomeScreen() {
  const { stats, activeMissionId, setActiveMission, startSession } = useSessionStore();
  const [selectedDuration, setSelectedDuration] = useState(20);
  const scrollRef = useRef<ScrollView>(null);
  
  const handleStartSession = () => {
    startSession(selectedDuration);
    router.push("/session");
  };
  
  const handleSelectMission = (missionId: string) => {
    setActiveMission(missionId);
  };
  
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView 
        ref={scrollRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.subtitle}>Your Impact</Text>
        </View>
        
        <StatsCard stats={stats} />
        
        <Text style={styles.sectionTitle}>Active Missions</Text>
        
        <FlatList
          data={missions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MissionCard
              mission={item}
              isActive={item.id === activeMissionId}
              onPress={() => handleSelectMission(item.id)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.missionsList}
          snapToInterval={Dimensions.get("window").width * 0.85 + 20}
          decelerationRate="fast"
          snapToAlignment="center"
        />
        
        <View style={styles.startSessionContainer}>
          <Text style={styles.sectionTitle}>Start a Focus Session</Text>
          <Text style={styles.sessionDescription}>
            Stay away from your phone and contribute to {missions.find(m => m.id === activeMissionId)?.title.toLowerCase()}.
          </Text>
          
          <DurationPicker
            durations={DURATIONS}
            selectedDuration={selectedDuration}
            onSelectDuration={setSelectedDuration}
          />
          
          <Button
            title="Start Session"
            onPress={handleStartSession}
            size="large"
            style={styles.startButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: colors.textLight,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 16,
  },
  missionsList: {
    paddingLeft: 10,
    paddingRight: 30,
    paddingVertical: 10,
  },
  startSessionContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sessionDescription: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 24,
    lineHeight: 24,
  },
  startButton: {
    marginTop: 16,
  },
});