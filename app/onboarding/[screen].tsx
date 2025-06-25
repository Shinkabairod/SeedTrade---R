import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Animated,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Leaf, Heart, Globe } from 'lucide-react-native';
import colors from '@/constants/colors';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    title: 'Bienvenue sur SeedTrade',
    subtitle: 'Transforme tes moments de calme en actions positives pour la planète',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560',
  },
  {
    id: 2,
    title: 'Comment ça marche ?',
    subtitle: 'Lance une session, reste concentré, génère un impact',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2560',
    steps: [
      { number: 1, text: 'Lance une session de calme' },
      { number: 2, text: 'Reste loin de ton téléphone' },
      { number: 3, text: 'Génère un impact positif' },
    ],
  },
  {
    id: 3,
    title: 'Choisis ta mission',
    subtitle: 'Sélectionne la cause qui te tient à cœur',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2560',
  },
];

const missions = [
  {
    id: 'tree',
    title: 'Plantation d\'arbres',
    description: 'Contribue à la reforestation mondiale',
    icon: Leaf,
    color: colors.missions.tree,
  },
  {
    id: 'water',
    title: 'Eau potable',
    description: 'Accès à l\'eau potable dans le monde',
    icon: Globe,
    color: colors.missions.water,
  },
  {
    id: 'education',
    title: 'Éducation',
    description: 'Soutien à l\'éducation des enfants',
    icon: Heart,
    color: colors.missions.education,
  },
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedMission, setSelectedMission] = useState(missions[0]);
  const slideAnim = new Animated.Value(0);

  const handleNext = () => {
    if (currentStep < onboardingData.length - 1) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setCurrentStep(currentStep + 1);
      });
    } else {
      // Terminer l'onboarding et aller à l'app principale
      router.replace('/(tabs)/home');
    }
  };

  const current = onboardingData[currentStep];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      
      {/* Image de fond avec overlay */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: current.image }}
          style={styles.backgroundImage}
          contentFit="cover"
        />
        <LinearGradient
          colors={['rgba(99, 102, 241, 0.7)', 'rgba(118, 75, 162, 0.8)']}
          style={styles.overlay}
        />
      </View>

      {/* Contenu principal */}
      <Animated.View 
        style={[
          styles.content,
          { transform: [{ translateY: slideAnim }] }
        ]}
      >
        <Text style={styles.title}>{current.title}</Text>
        <Text style={styles.subtitle}>{current.subtitle}</Text>

        {/* Étapes pour la page 2 */}
        {current.steps && (
          <View style={styles.stepsContainer}>
            {current.steps.map((step) => (
              <View key={step.number} style={styles.stepRow}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{step.number}</Text>
                </View>
                <Text style={styles.stepText}>{step.text}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Missions pour la page 3 */}
        {currentStep === 2 && (
          <View style={styles.missionsContainer}>
            {missions.map((mission) => {
              const IconComponent = mission.icon;
              return (
                <TouchableOpacity
                  key={mission.id}
                  style={[
                    styles.missionCard,
                    selectedMission.id === mission.id && styles.selectedMission,
                  ]}
                  onPress={() => setSelectedMission(mission)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.missionIcon, { backgroundColor: mission.color }]}>
                    <IconComponent size={24} color="white" />
                  </View>
                  <View style={styles.missionInfo}>
                    <Text style={styles.missionTitle}>{mission.title}</Text>
                    <Text style={styles.missionDescription}>{mission.description}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </Animated.View>

      {/* Footer avec pagination et bouton */}
      <View style={styles.footer}>
        <View style={styles.pagination}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                currentStep === index && styles.activeDot,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentStep === onboardingData.length - 1 ? 'Commencer' : 'Suivant'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  imageContainer: {
    height: height * 0.5,
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 26,
  },
  stepsContainer: {
    width: '100%',
    gap: 24,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  stepText: {
    color: 'white',
    fontSize: 16,
    flex: 1,
  },
  missionsContainer: {
    width: '100%',
    gap: 16,
  },
  missionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedMission: {
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  missionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  missionInfo: {
    flex: 1,
  },
  missionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  missionDescription: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  activeDot: {
    backgroundColor: 'white',
    width: 24,
  },
  nextButton: {
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  nextButtonText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '600',
  },
});