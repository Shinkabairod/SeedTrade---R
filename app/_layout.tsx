import { Tabs } from "expo-router";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { Home, Target, Trophy, User, Play } from "lucide-react-native";
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import colors from "@/constants/colors";

function TabBarIcon({ Icon, focused }: { Icon: any; focused: boolean }) {
  return (
    <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
      <Icon
        size={22}
        color={focused ? colors.primary : colors.textMuted}
        strokeWidth={focused ? 2.5 : 2}
      />
    </View>
  );
}

function SessionButton() {
  const handleSessionPress = () => {
    router.push('/session');
  };

  return (
    <View style={styles.sessionButtonContainer}>
      <TouchableOpacity
        style={styles.sessionButton}
        onPress={handleSessionPress}
        activeOpacity={0.8}
      >
        <View style={styles.sessionButtonInner}>
          <Play size={24} color="white" fill="white" />
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
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
        tabBarBackground: () => (
          Platform.OS === 'ios' ? (
            <BlurView 
              intensity={100} 
              style={StyleSheet.absoluteFill}
              tint="extraLight"
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
    height: Platform.OS === 'ios' ? 88 : 78,
    backgroundColor: Platform.OS === 'ios' ? 'rgba(255, 255, 255, 0.95)' : colors.surface,
    borderTopWidth: 0,
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 28 : 18,
    paddingTop: 12,
    elevation: 0,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 1,
    shadowRadius: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  tabBarItem: {
    paddingTop: 8,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: "600",
    marginTop: 4,
    letterSpacing: 0.5,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainerActive: {
    backgroundColor: colors.wellness.lavender,
  },
  sessionButtonContainer: {
    position: "absolute",
    top: -28,
    alignSelf: "center",
    zIndex: 10,
  },
  sessionButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 4,
    borderColor: colors.surface,
  },
  sessionButtonInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});