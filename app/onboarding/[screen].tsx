import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowRight } from "lucide-react-native";
import { useSessionStore } from "@/store/useSessionStore";
import { missions } from "@/constants/missions";
import colors from "@/constants/colors";
import Button from "@/components/Button";
import MissionCard from "@/components/MissionCard";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen() {
  const { screen } = useLocalSearchParams();
  const screenNumber = parseInt(screen as string, 10);
  const { setActiveMission, completeOnboarding } = useSessionStore();

  const handleNext = () => {
    if (screenNumber < 3) {
      router.replace(`/onboarding/${screenNumber + 1}`);
    } else {
      completeOnboarding();
      router.replace("/home");
    }
  };

  const handleSelectMission = (missionId: string) => {
    setActiveMission(missionId);
  };

  const renderScreen = () => {
    switch (screenNumber) {
      case 1:
        return (
          <View style={styles.screenContainer}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1516410529446-2c777cb7366d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" }}
              style={styles.welcomeImage}
            />
            <LinearGradient
              colors={["transparent", "rgba(247, 250, 252, 0.8)", colors.background]}
              style={styles.gradient}
            />
            <View style={styles.contentContainer}>
              <Text style={styles.title}>Ton calme a de la valeur</Text>
              <Text style={styles.description}>
                Transforme le temps passé loin de ton téléphone en actions positives réelles pour la planète et la société.
              </Text>
            </View>
          </View>
        );
      case 2:
        return (
          <View style={styles.screenContainer}>
            <Text style={styles.title}>Choisis ta mission</Text>
            <Text style={styles.description}>
              Sélectionne la cause qui te tient à cœur. Tu pourras la changer plus tard.
            </Text>
            <View style={styles.missionsContainer}>
              {missions.map((mission) => (
                <MissionCard
                  key={mission.id}
                  mission={mission}
                  isActive={false}
                  onPress={() => handleSelectMission(mission.id)}
                />
              ))}
            </View>
          </View>
        );
      case 3:
        return (
          <View style={styles.screenContainer}>
            <Text style={styles.title}>Comment ça marche</Text>
            <View style={styles.tutorialContainer}>
              <View style={styles.tutorialStep}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>1</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Lance une session</Text>
                  <Text style={styles.stepDescription}>
                    Choisis une durée (5, 10, 20 minutes...) et pose ton téléphone.
                  </Text>
                </View>
              </View>
              
              <View style={styles.tutorialStep}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>2</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Reste concentré</Text>
                  <Text style={styles.stepDescription}>
                    Ne touche pas ton téléphone pendant la durée choisie.
                  </Text>
                </View>
              </View>
              
              <View style={styles.tutorialStep}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>3</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Génère un impact</Text>
                  <Text style={styles.stepDescription}>
                    Ton temps se transforme en points qui financent des actions concrètes.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      {renderScreen()}
      <View style={styles.footer}>
        <View style={styles.paginationContainer}>
          {[1, 2, 3].map((num) => (
            <View
              key={num}
              style={[
                styles.paginationDot,
                screenNumber === num && styles.activeDot,
              ]}
            />
          ))}
        </View>
        <Button
          title={screenNumber === 3 ? "Commencer" : "Suivant"}
          onPress={handleNext}
          size="large"
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  screenContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  welcomeImage: {
    position: "absolute",
    width: width,
    height: height * 0.6,
    top: 0,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: height * 0.7,
  },
  contentContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: height * 0.3,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
  },
  missionsContainer: {
    width: "100%",
    gap: 16,
  },
  tutorialContainer: {
    width: "100%",
    marginTop: 20,
  },
  tutorialStep: {
    flexDirection: "row",
    marginBottom: 24,
    alignItems: "flex-start",
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  stepNumberText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 16,
    color: colors.textLight,
    lineHeight: 22,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.inactive,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: colors.primary,
    width: 20,
  },
  button: {
    width: "100%",
  },
});