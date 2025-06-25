import { Tabs } from "expo-router";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { Home, Target, Trophy, User, Play } from "lucide-react-native";
import { BlurView } from 'expo-blur';
import colors from "@/constants/colors";

function TabBarIcon({ Icon, focused }: { Icon: any; focused: boolean }) {
  return (
    <Icon
      size={24}
      color={focused ? colors.primary : colors.textLight}
      strokeWidth={focused ? 2.5 : 2}
    />
  );
}

function SessionButton() {
  return (
    <View style={styles.sessionButtonContainer}>
      <TouchableOpacity
        style={styles.sessionButton}
        onPress={() => {
          // Navigation vers session focus
        }}
        activeOpacity={0.8}
      >
        <View style={styles.sessionButtonInner}>
          <Play size={28} color="white" fill="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
        tabBarBackground: () => (
          Platform.OS === 'ios' ? (
            <BlurView 
              intensity={100} 
              style={StyleSheet.absoluteFill}
              tint="light"
            />
          ) : (
            <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.surface }]} />
          )
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Accueil",
          tabBarIcon: ({ focused }) => <TabBarIcon Icon={Home} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="missions"
        options={{
          title: "Missions",
          tabBarIcon: ({ focused }) => <TabBarIcon Icon={Target} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="session"
        options={{
          title: "",
          tabBarButton: () => <SessionButton />,
        }}
      />
      <Tabs.Screen
        name="rankings"
        options={{
          title: "Classement",
          tabBarIcon: ({ focused }) => <TabBarIcon Icon={Trophy} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ focused }) => <TabBarIcon Icon={User} focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 90 : 80,
    backgroundColor: Platform.OS === 'ios' ? 'rgba(255, 255, 255, 0.8)' : colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: 12,
    paddingBottom: Platform.OS === 'ios' ? 25 : 15,
    paddingTop: 12,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  tabBarItem: {
    paddingTop: 8,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },
  sessionButtonContainer: {
    position: "absolute",
    top: -32,
    alignSelf: "center",
    zIndex: 10,
  },
  sessionButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
    // Effet de glow moderne
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  sessionButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    // Gradient effect simulé avec une bordure
    borderWidth: 2,
    borderColor: colors.primaryLight,
  },
});