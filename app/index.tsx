import React from "react";
import { Redirect } from "expo-router";
import { useSessionStore } from "@/store/useSessionStore";

export default function IndexScreen() {
  const { hasCompletedOnboarding } = useSessionStore();

  // Navigate based on onboarding status
  if (hasCompletedOnboarding) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/onboarding/1" />;
}