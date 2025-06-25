import React from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { 
  Bell, 
  Shield, 
  HelpCircle, 
  Info, 
  Star, 
  Share, 
  Trash2,
  ChevronRight,
  X
} from "lucide-react-native";
import { useSessionStore } from "@/store/useSessionStore";
import colors from "@/constants/colors";

export default function SettingsScreen() {
  const { resetStore } = useSessionStore();

  const handleNotifications = () => {
    Alert.alert(
      "Notifications",
      "Gère tes préférences de notifications pour rester motivé sans être dérangé.",
      [
        { text: "Activer", style: "default" },
        { text: "Annuler", style: "cancel" }
      ]
    );
  };

  const handlePrivacy = () => {
    Alert.alert(
      "Confidentialité",
      "Tes données sont stockées localement sur ton appareil. Nous respectons ta vie privée.",
      [{ text: "OK", style: "default" }]
    );
  };

  const handleSupport = () => {
    Alert.alert(
      "Aide & Support",
      "Comment pouvons-nous t'aider ?",
      [
        { text: "FAQ", onPress: () => {} },
        { text: "Contacter", onPress: () => {} },
        { text: "Annuler", style: "cancel" }
      ]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      "À propos de SeedTrade",
      "SeedTrade v1.0.0\n\nTransforme ton temps de calme en impact positif pour la planète.\n\nDéveloppé avec ❤️ pour un monde meilleur.",
      [{ text: "OK", style: "default" }]
    );
  };

  const handleRate = () => {
    Alert.alert(
      "Noter l'application",
      "Si tu aimes SeedTrade, laisse-nous une note sur le store !",
      [
        { text: "Plus tard", style: "cancel" },
        { text: "Noter", style: "default" }
      ]
    );
  };

  const handleShare = () => {
    Alert.alert(
      "Partager SeedTrade",
      "Invite tes amis à rejoindre le mouvement !",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Partager", style: "default" }
      ]
    );
  };

  const handleResetData = () => {
    Alert.alert(
      "Réinitialiser les données",
      "⚠️ Cette action supprimera toutes tes données : sessions, statistiques, progression. Cette action est irréversible.",
      [
        { text: "Annuler", style: "cancel" },
        { 
          text: "Réinitialiser", 
          style: "destructive",
          onPress: () => {
            Alert.alert(
              "Confirmation",
              "Es-tu vraiment sûr ? Toutes tes données seront perdues.",
              [
                { text: "Annuler", style: "cancel" },
                { 
                  text: "Oui, supprimer", 
                  style: "destructive",
                  onPress: () => {
                    resetStore();
                    Alert.alert("Données supprimées", "Tes données ont été réinitialisées.");
                  }
                }
              ]
            );
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <X size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Paramètres</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Préférences</Text>
        <View style={styles.settingsGroup}>
          <TouchableOpacity style={styles.settingItem} onPress={handleNotifications}>
            <View style={styles.settingIconContainer}>
              <Bell size={20} color={colors.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Notifications</Text>
              <Text style={styles.settingDescription}>
                Rappels de sessions et encouragements
              </Text>
            </View>
            <ChevronRight size={20} color={colors.textLight} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={handlePrivacy}>
            <View style={styles.settingIconContainer}>
              <Shield size={20} color={colors.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Confidentialité</Text>
              <Text style={styles.settingDescription}>
                Gestion des données et vie privée
              </Text>
            </View>
            <ChevronRight size={20} color={colors.textLight} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Support</Text>
        <View style={styles.settingsGroup}>
          <TouchableOpacity style={styles.settingItem} onPress={handleSupport}>
            <View style={styles.settingIconContainer}>
              <HelpCircle size={20} color={colors.secondary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Aide & Support</Text>
              <Text style={styles.settingDescription}>
                FAQ, guides et contact
              </Text>
            </View>
            <ChevronRight size={20} color={colors.textLight} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={handleAbout}>
            <View style={styles.settingIconContainer}>
              <Info size={20} color={colors.secondary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>À propos</Text>
              <Text style={styles.settingDescription}>
                Version et informations sur l'app
              </Text>
            </View>
            <ChevronRight size={20} color={colors.textLight} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Communauté</Text>
        <View style={styles.settingsGroup}>
          <TouchableOpacity style={styles.settingItem} onPress={handleRate}>
            <View style={styles.settingIconContainer}>
              <Star size={20} color={colors.accent} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Noter l'application</Text>
              <Text style={styles.settingDescription}>
                Laisse ton avis sur le store
              </Text>
            </View>
            <ChevronRight size={20} color={colors.textLight} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={handleShare}>
            <View style={styles.settingIconContainer}>
              <Share size={20} color={colors.accent} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Partager SeedTrade</Text>
              <Text style={styles.settingDescription}>
                Invite tes amis à rejoindre le mouvement
              </Text>
            </View>
            <ChevronRight size={20} color={colors.textLight} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Zone de danger</Text>
        <View style={styles.settingsGroup}>
          <TouchableOpacity style={styles.settingItem} onPress={handleResetData}>
            <View style={[styles.settingIconContainer, styles.dangerIcon]}>
              <Trash2 size={20} color={colors.error} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, styles.dangerText]}>
                Réinitialiser les données
              </Text>
              <Text style={styles.settingDescription}>
                Supprime toutes tes sessions et statistiques
              </Text>
            </View>
            <ChevronRight size={20} color={colors.error} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.version}>SeedTrade v1.0.0</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.termsLink}>Conditions d'utilisation</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  closeButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: colors.card,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
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
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  dangerIcon: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
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