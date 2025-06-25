// Types
interface Milestone {
  minutes: number;
  message: string;
  points: number;
}

interface SessionState {
  isActive: boolean;
  isPaused: boolean;
  timeLeft: number;
  originalDuration: number;
  elapsedTime: number;
  currentQuote: number;
  showMotivation: boolean;
  achievedMilestones: number[];
  sessionEnded: boolean;
  phonePickups: number;
}

export default function SessionScreen() {
  // État de la session
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes par défaut
  const [originalDuration, setOriginalDuration] = useState(15 * 60);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  // État de l'interface
  const [currentQuote, setCurrentQuote] = useState(0);
  const [showMotivation, setShowMotivation] = useState(false);
  const [achievedMilestones, setAchievedMilestones] = useState<number[]>([]);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [phonePickups, setPhonePickups] = useState(0);
  
  // Animation values
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const motivationAnim = useRef(new Animated.Value(0)).current;
  
  // Refs
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const quoteIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const appStateRef = useRef(AppState.currentState);

  // Mission active
  const activeMission = {
    title: 'Plantation d\'arbres',
    description: 'Contribue à la reforestation mondiale',
    color: colors.missions.tree,
    pointsPerMinute: 2.5,
    impact: 'arbres plantés',
  };

  useEffect(() => {
    // Animation d'entrée
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Détection de changement d'état de l'app
    const handleAppStateChange = (nextAppState: string) => {
      if (appStateRef.current.match(/inactive|background/) && nextAppState === 'active') {
        // L'utilisateur revient dans l'app pendant une session
        if (isActive && !isPaused) {
          setPhonePickups(prev => prev + 1);
          Vibration.vibrate([0, 500, 200, 500]);
          
          Alert.alert(
            "Oups ! 📱",
            "Tu as utilisé ton téléphone pendant la session. Continue ton effort pour maximiser ton impact !",
            [
              { text: "Continuer", style: "default" },
              { text: "Terminer", style: "destructive", onPress: handleEndSession }
            ]
          );
        }
      }
      appStateRef.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription?.remove();
  }, [isActive, isPaused]);

  // Timer principal
  useEffect(() => {
    if (isActive && !isPaused && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          setElapsedTime(originalDuration - newTime);
          
          // Vérifier les milestones
          const elapsedMinutes = Math.floor((originalDuration - newTime) / 60);
          const milestone = sessionMilestones.find(m => 
            m.minutes === elapsedMinutes && 
            !achievedMilestones.includes(m.minutes)
          );
          
          if (milestone) {
            setAchievedMilestones(prev => [...prev, milestone.minutes]);
            showMilestoneAchieved(milestone);
          }
          
          if (newTime <= 0) {
            handleSessionComplete();
            return 0;
          }
          
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, isPaused, timeLeft, originalDuration, achievedMilestones]);

  // Rotation des citations motivationnelles
  useEffect(() => {
    if (isActive && !isPaused) {
      quoteIntervalRef.current = setInterval(() => {
        setCurrentQuote(prev => (prev + 1) % motivationalQuotes.length);
        showMotivationalQuote();
      }, 30000); // Nouvelle citation toutes les 30 secondes
    } else {
      if (quoteIntervalRef.current) {
        clearInterval(quoteIntervalRef.current);
      }
    }

    return () => {
      if (quoteIntervalRef.current) {
        clearInterval(quoteIntervalRef.current);
      }
    };
  }, [isActive, isPaused]);

  // Animation du pouls pour le timer
  useEffect(() => {
    if (isActive && !isPaused) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [isActive, isPaused]);

  // Mise à jour de la barre de progression
  useEffect(() => {
    const progress = elapsedTime / originalDuration;
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [elapsedTime, originalDuration]);

  const showMotivationalQuote = () => {
    setShowMotivation(true);
    Animated.sequence([
      Animated.timing(motivationAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(3000),
      Animated.timing(motivationAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => setShowMotivation(false));
  };

  const showMilestoneAchieved = (milestone: Milestone) => {
    Vibration.vibrate(200);
    Alert.alert(
      "Milestone atteint ! 🎉",
      `${milestone.message}\n+${milestone.points} points bonus !`,
      [{ text: "Continuer ! 💪", style: "default" }]
    );
  };

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    Vibration.vibrate(100);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
    Vibration.vibrate(100);
  };

  const handleReset = () => {
    Alert.alert(
      "Recommencer ?",
      "Es-tu sûr de vouloir recommencer la session ? Ton progression sera perdue.",
      [
        { text: "Annuler", style: "cancel" },
        { 
          text: "Recommencer", 
          style: "destructive",
          onPress: () => {
            setIsActive(false);
            setIsPaused(false);
            setTimeLeft(originalDuration);
            setElapsedTime(0);
            setAchievedMilestones([]);
            setPhonePickups(0);
            setSessionEnded(false);
            Vibration.vibrate(100);
          }
        }
      ]
    );
  };

  const handleEndSession = () => {
    const elapsedMinutes = Math.floor(elapsedTime / 60);
    const basePoints = elapsedMinutes * activeMission.pointsPerMinute;
    const milestoneBonus = achievedMilestones.reduce((acc, minutes) => {
      const milestone = sessionMilestones.find(m => m.minutes === minutes);
      return acc + (milestone?.points || 0);
    }, 0);
    const phonePickupPenalty = phonePickups * 5; // -5 points par utilisation du téléphone
    const totalPoints = Math.max(0, basePoints + milestoneBonus - phonePickupPenalty);

    setIsActive(false);
    setSessionEnded(true);
    
    setTimeout(() => {
      Alert.alert(
        "Session terminée ! 🎯",
        `Temps écoulé: ${Math.floor(elapsedMinutes)} minutes
Points gagnés: ${totalPoints}
Bonus milestones: +${milestoneBonus}
${phonePickups > 0 ? `Pénalité téléphone: -${phonePickupPenalty}` : ''}
Impact: ${import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  Vibration,
  Alert,
  AppState,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { 
  Play, 
  Pause, 
  Square, 
  RotateCcw,
  Leaf,
  Heart,
  Smartphone,
  CheckCircle,
  X,
  TrendingUp,
  Award
} from 'lucide-react-native';
import colors from '@/constants/colors';

const motivationalQuotes = [
  "Ton calme nourrit la planète 🌱",
  "Chaque seconde compte pour un monde meilleur 🌍",
  "Tu es en train de faire la différence ✨",
  "Respire... la nature te remercie 🍃",
  "Ton silence aide des milliers de personnes 💚",
  "Ensemble, nous changeons le monde 🤝",
  "Ta sérénité a un impact réel 🌟",
  "Continue, tu es formidable ! 💪",
];

const sessionMilestones = [
  { minutes: 5, message: "Premier cap franchi ! 🎯", points: 10 },
  { minutes: 10, message: "Tu es dans le flow ! 🌊", points: 25 },
  { minutes: 15, message: "Concentration maximale ! ⚡", points: 40 },
  { minutes: 20, message: "Tu es un champion ! 🏆", points: 60 },
  { minutes: 30, message: "Maître de la méditation ! 🧘‍♂️", points: 100 },
  { minutes: 45, message: "Niveau légendaire ! 🔥", points: 150 },
  { minutes: 60, message: "Tu es extraordinaire ! 🌟", points: 200 },
];

export default function SessionScreen() {
  // État de la session
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes par défaut
  const [originalDuration, setOriginalDuration] = useState(15 * 60);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  // État de l'interface
  const [currentQuote, setCurrentQuote] = useState(0);
  const [showMotivation, setShowMotivation] = useState(false);
  const [achievedMilestones, setAchievedMilestones] = useState([]);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [phonePickups, setPhonePickups] = useState(0);
  
  // Animation values
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const motivationAnim = useRef(new Animated.Value(0)).current;
  
  // Refs
  const intervalRef = useRef(null);
  const quoteIntervalRef = useRef(null);
  const appStateRef = useRef(AppState.currentState);

  // Mission active
  const activeMission = {
    title: 'Plantation d\'arbres',
    description: 'Contribue à la reforestation mondiale',
    color: colors.missions.tree,
    pointsPerMinute: 2.5,
    impact: 'arbres plantés',
  };

  useEffect(() => {
    // Animation d'entrée
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Détection de changement d'état de l'app
    const handleAppStateChange = (nextAppState) => {
      if (appStateRef.current.match(/inactive|background/) && nextAppState === 'active') {
        // L'utilisateur revient dans l'app pendant une session
        if (isActive && !isPaused) {
          setPhonePickups(prev => prev + 1);
          Vibration.vibrate([0, 500, 200, 500]);
          
          Alert.alert(
            "Oups ! 📱",
            "Tu as utilisé ton téléphone pendant la session. Continue ton effort pour maximiser ton impact !",
            [
              { text: "Continuer", style: "default" },
              { text: "Terminer", style: "destructive", onPress: handleEndSession }
            ]
          );
        }
      }
      appStateRef.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription?.remove();
  }, [isActive, isPaused]);

  // Timer principal
  useEffect(() => {
    if (isActive && !isPaused && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          setElapsedTime(originalDuration - newTime);
          
          // Vérifier les milestones
          const elapsedMinutes = Math.floor((originalDuration - newTime) / 60);
          const milestone = sessionMilestones.find(m => 
            m.minutes === elapsedMinutes && 
            !achievedMilestones.includes(m.minutes)
          );
          
          if (milestone) {
            setAchievedMilestones(prev => [...prev, milestone.minutes]);
            showMilestoneAchieved(milestone);
          }
          
          if (newTime <= 0) {
            handleSessionComplete();
            return 0;
          }
          
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, isPaused, timeLeft, originalDuration, achievedMilestones]);

  // Rotation des citations motivationnelles
  useEffect(() => {
    if (isActive && !isPaused) {
      quoteIntervalRef.current = setInterval(() => {
        setCurrentQuote(prev => (prev + 1) % motivationalQuotes.length);
        showMotivationalQuote();
      }, 30000); // Nouvelle citation toutes les 30 secondes
    } else {
      clearInterval(quoteIntervalRef.current);
    }

    return () => clearInterval(quoteIntervalRef.current);
  }, [isActive, isPaused]);

  // Animation du pouls pour le timer
  useEffect(() => {
    if (isActive && !isPaused) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [isActive, isPaused]);

  // Mise à jour de la barre de progression
  useEffect(() => {
    const progress = elapsedTime / originalDuration;
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [elapsedTime, originalDuration]);

  const showMotivationalQuote = () => {
    setShowMotivation(true);
    Animated.sequence([
      Animated.timing(motivationAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(3000),
      Animated.timing(motivationAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => setShowMotivation(false));
  };

  const showMilestoneAchieved = (milestone) => {
    Vibration.vibrate(200);
    Alert.alert(
      "Milestone atteint ! 🎉",
      `${milestone.message}\n+${milestone.points} points bonus !`,
      [{ text: "Continuer ! 💪", style: "default" }]
    );
  };

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    Vibration.vibrate(100);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
    Vibration.vibrate(100);
  };

  const handleReset = () => {
    Alert.alert(
      "Recommencer ?",
      "Es-tu sûr de vouloir recommencer la session ? Ton progression sera perdue.",
      [
        { text: "Annuler", style: "cancel" },
        { 
          text: "Recommencer", 
          style: "destructive",
          onPress: () => {
            setIsActive(false);
            setIsPaused(false);
            setTimeLeft(originalDuration);
            setElapsedTime(0);
            setAchievedMilestones([]);
            setPhonePickups(0);
            setSessionEnded(false);
            Vibration.vibrate(100);
          }
        }
      ]
    );
  };

  const handleEndSession = () => {
    const elapsedMinutes = Math.floor(elapsedTime / 60);
    const basePoints = elapsedMinutes * activeMission.pointsPerMinute;
    const milestoneBonus = achievedMilestones.reduce((acc, minutes) => {
      const milestone = sessionMilestones.find(m => m.minutes === minutes);
      return acc + (milestone?.points || 0);
    }, 0);
    const phonePickupPenalty = phonePickups * 5; // -5 points par utilisation du téléphone
    const totalPoints = Math.max(0, basePoints + milestoneBonus - phonePickupPenalty);

    setIsActive(false);
    setSessionEnded(true);
    
    setTimeout(() => {
      Alert.alert(
        "Session terminée ! 🎯",
        `Temps écoulé: ${Math.floor(elapsedMinutes)} minutes
Points gagnés: ${totalPoints}
Bonus milestones: +${milestoneBonus}
${phonePickups > 0 ? `Pénalité téléphone: -${phonePickupPenalty}` : ''}
  const handleEndSession = () => {
    const elapsedMinutes = Math.floor(elapsedTime / 60);
    const basePoints = elapsedMinutes * activeMission.pointsPerMinute;
    const milestoneBonus = achievedMilestones.reduce((acc, minutes) => {
      const milestone = sessionMilestones.find(m => m.minutes === minutes);
      return acc + (milestone?.points || 0);
    }, 0);
    const phonePickupPenalty = phonePickups * 5; // -5 points par utilisation du téléphone
    const totalPoints = Math.max(0, basePoints + milestoneBonus - phonePickupPenalty);

    setIsActive(false);
    setSessionEnded(true);
    
    setTimeout(() => {
      Alert.alert(
        "Session terminée ! 🎯",
        `Temps écoulé: ${Math.floor(elapsedMinutes)} minutes
Points gagnés: ${totalPoints}
Bonus milestones: +${milestoneBonus}
${phonePickups > 0 ? `Pénalité téléphone: -${phonePickupPenalty}` : ''}
Impact: ${Math.floor(totalPoints / activeMission.pointsPerMinute)} ${activeMission.impact}`,
        [
          { text: "Partager", onPress: handleShare },
          { text: "Continuer", onPress: () => router.back() }
        ]
      );
    }, 1000);
  };

  const handleSessionComplete = () => {
    setIsActive(false);
    setSessionEnded(true);
    Vibration.vibrate([0, 500, 200, 500, 200, 500]);
    
    const totalMinutes = Math.floor(originalDuration / 60);
    const basePoints = totalMinutes * activeMission.pointsPerMinute;
    const milestoneBonus = achievedMilestones.reduce((acc, minutes) => {
      const milestone = sessionMilestones.find(m => m.minutes === minutes);
      return acc + (milestone?.points || 0);
    }, 0);
    const completionBonus = 50; // Bonus pour avoir terminé
    const phonePickupPenalty = phonePickups * 5;
    const totalPoints = basePoints + milestoneBonus + completionBonus - phonePickupPenalty;

    setTimeout(() => {
      Alert.alert(
        "Félicitations ! 🎉",
        `Session complète de ${totalMinutes} minutes !
Points totaux: ${totalPoints}
Bonus milestones: +${milestoneBonus}
Bonus complétion: +${completionBonus}
${phonePickups > 0 ? `Pénalité téléphone: -${phonePickupPenalty}` : ''}
Impact: ${Math.floor(totalPoints / activeMission.pointsPerMinute)} ${activeMission.impact}`,
        [
          { text: "Partager", onPress: handleShare },
          { text: "Nouvelle session", onPress: handleReset },
          { text: "Terminer", onPress: () => router.back() }
        ]
      );
    }, 1000);
  };

  const handleShare = () => {
    // Ici vous pourriez intégrer le partage social
    Alert.alert(
      "Partager ton succès ! 📱",
      "Bientôt disponible : partage tes sessions sur les réseaux sociaux !",
      [{ text: "OK", style: "default" }]
    );
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getSessionPhase = (): string => {
    const progress = elapsedTime / originalDuration;
    if (progress < 0.25) return "Démarrage";
    if (progress < 0.5) return "Concentration";
    if (progress < 0.75) return "Flow";
    return "Maîtrise";
  };

  const progressPercentage = (elapsedTime / originalDuration) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      
      {/* Background */}
      <Image 
        source={{ uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2560' }}
        style={styles.backgroundImage}
        contentFit="cover"
      />
      <LinearGradient
        colors={[
          'rgba(99, 102, 241, 0.8)',
          'rgba(118, 75, 162, 0.9)',
          'rgba(99, 102, 241, 0.8)'
        ]}
        style={styles.overlay}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => {
            if (isActive) {
              Alert.alert(
                "Quitter la session ?",
                "Ta progression sera perdue si tu quittes maintenant.",
                [
                  { text: "Rester", style: "cancel" },
                  { text: "Quitter", style: "destructive", onPress: () => router.back() }
                ]
              );
            } else {
              router.back();
            }
          }}
        >
          <X size={24} color="white" />
        </TouchableOpacity>
        
        <View style={styles.missionInfo}>
          <Text style={styles.missionTitle}>{activeMission.title}</Text>
          <Text style={styles.missionSubtitle}>
            {activeMission.pointsPerMinute} pts/min
          </Text>
        </View>
      </View>

      {/* Contenu principal */}
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Phase de session */}
        <Text style={styles.sessionPhase}>{getSessionPhase()}</Text>
        
        {/* Timer principal */}
        <Animated.View 
          style={[
            styles.timerContainer,
            { transform: [{ scale: pulseAnim }] }
          ]}
        >
          <View style={styles.timerCircle}>
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
            <Text style={styles.timerLabel}>
              {Math.floor(elapsedTime / 60)} min écoulées
            </Text>
          </View>
          
          {/* Cercle de progression */}
          <Animated.View 
            style={[
              styles.progressRing,
              {
                transform: [{
                  rotate: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  })
                }]
              }
            ]}
          />
        </Animated.View>

        {/* Barre de progression */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <Animated.View 
              style={[
                styles.progressFill,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  })
                }
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {Math.round(progressPercentage)}% terminé
          </Text>
        </View>

        {/* Statistiques de session */}
        <View style={styles.sessionStats}>
          <View style={styles.statItem}>
            <Award size={20} color="rgba(255,255,255,0.8)" />
            <Text style={styles.statValue}>{achievedMilestones.length}</Text>
            <Text style={styles.statLabel}>Milestones</Text>
          </View>
          <View style={styles.statItem}>
            <TrendingUp size={20} color="rgba(255,255,255,0.8)" />
            <Text style={styles.statValue}>
              {Math.floor(elapsedTime / 60 * activeMission.pointsPerMinute)}
            </Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
          <View style={styles.statItem}>
            <Smartphone size={20} color={phonePickups > 0 ? colors.warning : "rgba(255,255,255,0.8)"} />
            <Text style={[styles.statValue, { color: phonePickups > 0 ? colors.warning : 'white' }]}>
              {phonePickups}
            </Text>
            <Text style={styles.statLabel}>Distractions</Text>
          </View>
        </View>

        {/* Citation motivationnelle */}
        {showMotivation && (
          <Animated.View 
            style={[
              styles.motivationContainer,
              { opacity: motivationAnim }
            ]}
          >
            <Text style={styles.motivationText}>
              {motivationalQuotes[currentQuote]}
            </Text>
          </Animated.View>
        )}
      </Animated.View>

      {/* Contrôles */}
      <View style={styles.controls}>
        {!isActive ? (
          <TouchableOpacity 
            style={styles.startButton}
            onPress={handleStart}
          >
            <Play size={32} color="white" fill="white" />
            <Text style={styles.startButtonText}>Commencer</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.activeControls}>
            <TouchableOpacity 
              style={styles.controlButton}
              onPress={handlePause}
            >
              {isPaused ? (
                <Play size={24} color="white" fill="white" />
              ) : (
                <Pause size={24} color="white" />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.controlButton}
              onPress={handleEndSession}
            >
              <Square size={24} color="white" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.controlButton}
              onPress={handleReset}
            >
              <RotateCcw size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Résultat de session */}
      {sessionEnded && (
        <View style={styles.sessionResult}>
          <CheckCircle size={48} color={colors.success} />
          <Text style={styles.resultTitle}>Session Terminée !</Text>
          <Text style={styles.resultSubtitle}>
            Merci pour ta contribution 💚
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  backgroundImage: {
    position: 'absolute',
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 16,
  },
  closeButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  missionInfo: {
    flex: 1,
  },
  missionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  missionSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  sessionPhase: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 40,
    textAlign: 'center',
  },
  timerContainer: {
    position: 'relative',
    marginBottom: 40,
  },
  timerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 48,
    fontWeight: '300',
    color: 'white',
    marginBottom: 8,
  },
  timerLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  progressRing: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: 'white',
  },
  progressBarContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  progressBar: {
    width: '80%',
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
  },
  sessionStats: {
    flexDirection: 'row',
    gap: 32,
    marginBottom: 40,
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  motivationContainer: {
    position: 'absolute',
    top: '40%',
    left: 24,
    right: 24,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 20,
    backdropFilter: 'blur(10px)',
  },
  motivationText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },
  controls: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    paddingVertical: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  activeControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  sessionResult: {
    position: 'absolute',
    top: '50%',
    left: 24,
    right: 24,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    transform: [{ translateY: -100 }],
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  resultSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});