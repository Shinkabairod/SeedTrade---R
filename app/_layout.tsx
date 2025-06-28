import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSessionStore } from '@/store/useSessionStore';

export default function RootLayout() {
  const setHydrated = useSessionStore((state) => state.setHydrated);

  useEffect(() => {
    // Ensure hydration is marked as complete
    const timer = setTimeout(() => {
      setHydrated();
    }, 50);

    return () => clearTimeout(timer);
  }, [setHydrated]);

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding/[screen]" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="session" />
      </Stack>
    </>
  );
}