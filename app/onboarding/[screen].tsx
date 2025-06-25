import React, { useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowRight, Play, Target, Heart } from "lucide-react-native";
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
      router.replace("/(tabs)/home");
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
              contentFit="cover"
            />
            <LinearGradient
              colors={["transparent", "rgba(247, 250, 252, 0.8)", colors.background]}
              style={styles.gradient}
            />
            <View style={styles.contentContainer}>
              <View style={styles.logoContainer}>
                <Text style={styles.logoText}>🌱</Text>
                <Text style={styles.appName}>SeedTrade</Text>
              </View>
              <Text style={styles.title}>Ton calme a de la valeur</Text>
              <Text style={styles.description}>
                Transforme le temps passé loin de ton téléphone en actions positives réelles pour la planète et la société.
              </Text>
              <View style={styles.featuresContainer}>
                <View style={styles.feature}>
                  <Play size={24} color={colors.primary} />
                  <Text style={styles.featureText}>Sessions de méditation</Text>
                </View>
                <View style={styles.feature}>
                  <Target size={24} color={colors.secondary} />
                  <Text style={styles.featureText}>Impact mesurable</Text>
                </View>
                <View style={styles.feature}>
                  <Heart size={24} color={colors.accent} />
                  <Text style={styles.featureText}>Contribution sociale</Text>
                </View>
              </View>
            </View>
          </View>
        );
        
      case 2:
        return (
          <View style={styles.screenContainer}>
            <View style={styles.contentContainer}>
              <Text style={styles.title}>Comment ça marche ?</Text>
              <Text style={styles.description}>
                C'est simple ! Suis ces 3 étapes pour commencer à avoir un impact positif.
              </Text>
              
              <View style={styles.stepsContainer}>
import React, { useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowRight, Play, Target, Heart } from "lucide-react-native";
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
      router.replace("/(tabs)/home");
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
              contentFit="cover"
            />
            <LinearGradient
              colors={["transparent", "rgba(247, 250, 252, 0.8)", colors.background]}
              style={styles.gradient}
            />
            <View style={styles.contentContainer}>
              <View style={styles.logoContainer}>
                <Text style={styles.logoText}>🌱</Text>
                <Text style={styles.appName}>SeedTrade</Text>
              </View>
              <Text style={styles.title}>Ton calme a de la valeur</Text>
              <Text style={styles.description}>
                Transforme le temps passé loin de ton téléphone en actions positives réelles pour la planète et la société.
              </Text>
              <View style={styles.featuresContainer}>
                <View style={styles.feature}>
                  <Play size={24} color={colors.primary} />
                  <Text style={styles.featureText}>Sessions de méditation</Text>
                </View>
                <View style={styles.feature}>
                  <Target size={24} color={colors.secondary} />
                  <Text style={styles.featureText}>Impact mesurable</Text>
                </View>
                <View style={styles.feature}>
                  <Heart size={24} color={colors.accent} />
                  <Text style={styles.featureText}>Contribution sociale</Text>
                </View>
              </View>
            </View>
          </View>
        );
        
      case 2:
        return (
          <View style={styles.screenContainer}>
            <View style={styles.contentContainer}>
              <Text style={styles.title}>Comment ça marche ?</Text>
              <Text style={styles.description}>
                C'est simple ! Suis ces 3 étapes pour commencer à avoir un impact positif.
              </Text>
              
              <View style={styles.stepsContainer}>
                <View style={styles.step}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>1</Text>
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={styles.stepTitle}>Lance une session</Text>
                    <Text style={styles.stepDescription}>
                      Choisis la durée de ta session de méditation (5 à 60 minutes)
                    </Text>
                  </View>
                </View>
                
                <View style={styles.step}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>2</Text>
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={styles.stepTitle}>Reste concentré</Text>
                    <Text style={styles.stepDescription}>
                      Pose ton téléphone et profite de ce moment de calme
                    </Text>
                  </View>
                </View>
                
                <View style={styles.step}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>3</Text>
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={styles.stepTitle}>Génère un impact</Text>
                    <Text style={styles.stepDescription}>
                      Tes points se transforment en actions concrètes pour la planète
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        );
        
      case 3:
        return (
          <View style={styles.screenContainer}>
            <View style={styles.contentContainer}>
              <Text style={styles.title}>Choisis ta mission</Text>
              <Text style={styles.description}>
                Sélectionne la cause qui te tient à cœur. Tu pourras la changer plus tard.
              </Text>
              
              <View style={styles.missionsContainer}>
                {missions.slice(0, 3).map((mission) => (
                  <TouchableOpacity
                    key={mission.id}
                    style={styles.missionItem}
                    onPress={() => handleSelectMission(mission.id)}
                  >
                    <Image 
                      source={{ uri: mission.image }}
                      style={styles.missionImage}
                      contentFit="cover"
                    />
                    <LinearGradient
                      colors={["transparent", "rgba(0,0,0,0.7)"]}
                      style={styles.missionOverlay}
                    />
                    <View style={styles.missionContent}>
                      <Text style={styles.missionTitle}>{mission.title}</Text>
                      <Text style={styles.missionDescription}>{mission.description}</Text>
                      <Text style={styles.missionPoints}>
                        {mission.pointsPerMinute} points/min
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
              
              <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                  💡 Chaque mission contribue à des projets réels. Plus tu médites, plus tu aides !
                </Text>
              </View>
            </View>
          </View>
        );
        
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
  logoContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoText: {
    fontSize: 48,
    marginBottom: 8,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.primary,
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
  featuresContainer: {
    width: "100%",
    gap: 16,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
  },
  featureText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: "500",
  },
  stepsContainer: {
    width: "100%",
    gap: 24,
  },
  step: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
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
  missionsContainer: {
    width: "100%",
    gap: 16,
    marginBottom: 24,
  },
  missionItem: {
    height: 120,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
  },
  missionImage: {
    width: "100%",
    height: "100%",
  },
  missionOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
  },
  missionContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  missionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  missionDescription: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    marginBottom: 8,
    numberOfLines: 2,
  },
  missionPoints: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "500",
  },
  infoBox: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    width: "100%",
  },
  infoText: {
    fontSize: 14,
    color: colors.text,
    textAlign: "center",
    lineHeight: 20,
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
});<View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>1</Text>
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={styles.stepTitle}>Lance une session</Text>
                    <Text style={styles.stepDescription}>
                      Choisis la durée de ta session de méditation (5 à 60 minutes)
                    </Text>
                  </View>
                </View>
                
                <View style={styles.step}>