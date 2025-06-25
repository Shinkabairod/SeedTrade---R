import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { Mission } from "@/constants/missions";
import colors from "@/constants/colors";
import Button from "./Button";

type SessionResultProps = {
  duration: number;
  mission: Mission;
  onClose: () => void;
  success: boolean;
};

export default function SessionResult({ 
  duration, 
  mission, 
  onClose,
  success,
}: SessionResultProps) {
  const points = success ? duration * mission.pointsPerMinute : 0;
  const contribution = Math.floor(points);
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {success ? (
          <>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1531686264889-56fdcabd163f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" }}
              style={styles.image}
              contentFit="cover"
            />
            <Text style={styles.title}>Great job!</Text>
            <Text style={styles.description}>
              You stayed focused for {duration} minutes and contributed to a better world.
            </Text>
            
            <View style={styles.resultContainer}>
              <View style={styles.resultItem}>
                <Text style={styles.resultValue}>{points.toFixed(1)}</Text>
                <Text style={styles.resultLabel}>Points earned</Text>
              </View>
              
              <View style={styles.resultItem}>
                <Text style={styles.resultValue}>
                  {contribution} {contribution === 1 ? mission.unit.slice(0, -1) : mission.unit}
                </Text>
                <Text style={styles.resultLabel}>Contribution</Text>
              </View>
            </View>
            
            <Text style={styles.missionText}>
              Mission: {mission.title}
            </Text>
          </>
        ) : (
          <>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" }}
              style={styles.image}
              contentFit="cover"
            />
            <Text style={styles.title}>Session interrupted</Text>
            <Text style={styles.description}>
              You left the session before it was completed. No points were earned this time.
            </Text>
            <Text style={styles.encouragement}>
              Don't worry! You can try again whenever you're ready.
            </Text>
          </>
        )}
        
        <Button 
          title="Close" 
          onPress={onClose} 
          style={styles.button}
          size="large"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  content: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  resultContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 24,
  },
  resultItem: {
    alignItems: "center",
  },
  resultValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 4,
  },
  resultLabel: {
    fontSize: 14,
    color: colors.textLight,
  },
  missionText: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 24,
  },
  encouragement: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: "center",
    marginBottom: 24,
    fontStyle: "italic",
  },
  button: {
    width: "100%",
  },
});