import { View } from "react-native";
import { Redirect } from "expo-router";
import { useSessionStore } from "@/store/useSessionStore";

export default function TabIndexScreen() {
  const { hasCompletedOnboarding } = useSessionStore();

  if (!hasCompletedOnboarding) {
    return <Redirect href="/onboarding/1" />;
  }

  return <Redirect href="/home" />;
}