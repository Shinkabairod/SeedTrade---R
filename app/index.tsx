import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSessionStore } from "@/store/useSessionStore";

export default function IndexScreen() {
  const { hasCompletedOnboarding } = useSessionStore();

  useEffect(() => {
    const checkOnboarding = async () => {
      if (hasCompletedOnboarding) {
        router.replace("/home");
      } else {
        router.replace("/onboarding/1");
      }
    };

    checkOnboarding();
  }, [hasCompletedOnboarding]);

  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});