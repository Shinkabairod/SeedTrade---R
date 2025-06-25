import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { router, SplashScreen } from "expo-router";
import { useSessionStore } from "@/store/useSessionStore";
import colors from "@/constants/colors";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function IndexScreen() {
  const { hasCompletedOnboarding } = useSessionStore();

  useEffect(() => {
    // Use a timeout to ensure the layout is mounted before navigation
    const timer = setTimeout(() => {
      if (hasCompletedOnboarding) {
        router.replace("/home");
      } else {
        router.replace("/onboarding/1");
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [hasCompletedOnboarding]);

  // Render a loading state or placeholder while waiting to navigate
  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>SeedTrade</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
  },
});