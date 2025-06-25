import { Tabs } from "expo-router";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Home, Target, Trophy, User, Settings } from "lucide-react-native";
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
        onPress={() => {}}
      >
        <View style={styles.sessionButtonInner}>
          <Target size={28} color="white" />
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
    height: 85,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.06)",
    paddingHorizontal: 10,
    paddingBottom: 20,
    paddingTop: 10,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
  sessionButtonContainer: {
    position: "absolute",
    top: -30,
    alignSelf: "center",
  },
  sessionButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  sessionButtonInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
});