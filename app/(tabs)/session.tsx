import { Redirect } from "expo-router";

export default function TabSessionScreen() {
  // This is just a placeholder for the tab
  // The actual session screen is modal at /session
  return <Redirect href="/session" />;
}