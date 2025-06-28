import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Redirect } from "expo-router";
import { useSessionStore } from "@/store/useSessionStore";
import colors from "@/constants/colors";

export default function IndexScreen() {
  const { hasCompletedOnboarding, isHydrated } = useSessionStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait a bit for the store to hydrate
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Show loading screen while store is hydrating
  if (!isHydrated || !isReady) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>SeedTrade</Text>
        <Text style={styles.loadingSubtext}>Chargement...</Text>
      </View>
    );
  }

  // Navigate based on onboarding status
  if (hasCompletedOnboarding) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/onboarding/1" />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 8,
  },
  loadingSubtext: {
    fontSize: 16,
    color: colors.textLight,
  },
});