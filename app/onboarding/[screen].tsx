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