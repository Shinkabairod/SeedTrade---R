import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Redirect } from "expo-router";
import { useSessionStore } from "@/store/useSessionStore";
import colors from "@/constants/colors";

export default function IndexScreen() {
  const { hasCompletedOnboarding, isHydrated } = useSessionStore();

  // Simple loading screen while store is hydrating
  if (!isHydrated) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>SeedTrade</Text>
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
  },
});