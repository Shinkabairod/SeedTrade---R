import React, { useState } from "react";
import { StyleSheet, Text, View, Switch, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bell, Moon, Globe, Lock, Info, ChevronRight } from "lucide-react-native";
import { useSessionStore } from "@/store/useSessionStore";
import colors from "@/constants/colors";

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const { resetStore } = useSessionStore();
  
  const handleResetData = () => {
    Alert.alert(
      "Réinitialiser les données",
      "Es-tu sûr de vouloir réinitialiser toutes tes données ? Cette action est irréversible.",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Réinitialiser",
          style: "destructive",
          onPress: () => resetStore(),
        },
      ]
    );
  };
  
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Préférences</Text>
        
        <View style={styles.settingsGroup}>
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Bell size={20} color={colors.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Notifications</Text>
              <Text style={styles.settingDescription}>
                Rappels pour les sessions de focus
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: colors.inactive, true: colors.primary }}
              thumbColor="white"
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Moon size={20} color={colors.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Mode sombre</Text>
              <Text style={styles.settingDescription}>
                Changer l'apparence de l'application
              </Text>
            </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: colors.inactive, true: colors.primary }}
              thumbColor="white"
            />
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Langue</Text>
        
        <View style={styles.settingsGroup}>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Globe size={20} color={colors.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Langue</Text>
              <Text style={styles.settingDescription}>
                Français
              </Text>
            </View>
            <ChevronRight size={20} color={colors.textLight} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.sectionTitle}>Compte</Text>
        
        <View style={styles.settingsGroup}>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Lock size={20} color={colors.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Confidentialité</Text>
              <Text style={styles.settingDescription}>
                Gestion des données personnelles
              </Text>
            </View>
            <ChevronRight size={20} color={colors.textLight} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={handleResetData}
          >
            <View style={[styles.settingIconContainer, styles.dangerIcon]}>
              <Info size={20} color={colors.error} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, styles.dangerText]}>
                Réinitialiser les données
              </Text>
              <Text style={styles.settingDescription}>
                Effacer toutes les données et statistiques
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.version}>SeedTrade v1.0.0</Text>
          <TouchableOpacity>
            <Text style={styles.termsLink}>Conditions d'utilisation</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 12,
    marginTop: 20,
  },
  settingsGroup: {
    backgroundColor: colors.card,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  dangerIcon: {
    backgroundColor: "rgba(252, 129, 129, 0.2)",
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 4,
  },
  dangerText: {
    color: colors.error,
  },
  settingDescription: {
    fontSize: 14,
    color: colors.textLight,
  },
  footer: {
    marginTop: "auto",
    alignItems: "center",
    paddingVertical: 20,
  },
  version: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 8,
  },
  termsLink: {
    fontSize: 14,
    color: colors.primary,
  },
});