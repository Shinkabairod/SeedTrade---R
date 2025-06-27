import React from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Play, Target, Heart, Sparkles } from "lucide-react-native";
import { useSessionStore } from "@/store/useSessionStore";
import { missions } from "@/constants/missions";
import colors from "@/constants/colors";
import Button from "@/components/Button";

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
              colors={["transparent", "rgba(254, 254, 254, 0.8)", colors.background]}
              style={styles.gradient}
            />
            <View style={styles.contentContainer}>
              <View style={styles.logoContainer}>
                <View style={styles.logoIcon}>
                  <Sparkles size={32} color={colors.primary} />
                </View>
                <Text style={styles.appName}>SeedTrade</Text>
              </View>
              <Text style={styles.title}>Ton calme a de la valeur</Text>
              <Text style={styles.description}>
                Transforme le temps passé loin de ton téléphone en actions positives réelles pour la planète et la société.
              </Text>
              <View style={styles.featuresContainer}>
                <View style={styles.feature}>
                  <View style={styles.featureIcon}>
                    <Play size={20} color={colors.primary} />
                  </View>
                  <Text style={styles.featureText}>Sessions de méditation</Text>
                </View>
                <View style={styles.feature}>
                  <View style={styles.featureIcon}>
                    <Target size={20} color={colors.secondary} />
                  </View>
                  <Text style={styles.featureText}>Impact mesurable</Text>
                </View>
                <View style={styles.feature}>
                  <View style={styles.featureIcon}>
                    <Heart size={20} color={colors.accent} />
                  </View>
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
                      <Text style={styles.missionDescription} numberOfLines={2}>
                        {mission.description}
                      </Text>
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
    marginBottom: 40,
  },
  logoIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.wellness.lavender,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  appName: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.primary,
    letterSpacing: -1,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
    marginBottom: 16,
    letterSpacing: -0.5,
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
    gap: 16,
    padding: 20,
    backgroundColor: colors.card,
    borderRadius: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.wellness.cream,
    alignItems: "center",
    justifyContent: "center",
  },
  featureText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: "600",
    letterSpacing: -0.3,
  },
  stepsContainer: {
    width: "100%",
    gap: 32,
  },
  step: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 20,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumberText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  stepDescription: {
    fontSize: 16,
    color: colors.textLight,
    lineHeight: 24,
  },
  missionsContainer: {
    width: "100%",
    gap: 16,
    marginBottom: 24,
  },
  missionItem: {
    height: 120,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
    shadowColor: colors.shadowMedium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
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
    padding: 20,
  },
  missionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
    marginBottom: 4,
  },
  missionDescription: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    marginBottom: 8,
  },
  missionPoints: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "600",
  },
  infoBox: {
    backgroundColor: colors.wellness.cream,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.wellness.sand,
    width: "100%",
  },
  infoText: {
    fontSize: 14,
    color: colors.text,
    textAlign: "center",
    lineHeight: 22,
    fontWeight: "500",
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 32,
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
    width: 24,
  },
  button: {
    width: "100%",
  },
});