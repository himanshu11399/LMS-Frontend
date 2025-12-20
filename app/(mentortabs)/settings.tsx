import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";


const Settings = () => {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("authToken");
              router.replace("/(auth)/login");
            } catch (error) {
              Alert.alert("Error", "Something went wrong");
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* ===== HEADER ===== */}
      <LinearGradient
        colors={["#4F46E5", "#6366F1"]}
        style={styles.header}
      >
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>
          Manage your mentor account & preferences
        </Text>
      </LinearGradient>

      {/* ===== ACCOUNT ===== */}
      <Section title="Account">
        <SettingItem label="Profile Information" />
        <SettingItem label="Change Password" />
      </Section>

      {/* ===== TEACHING ===== */}
      <Section title="Teaching">
        <SettingItem label="My Courses" />
        <SettingItem label="Assigned Students" />
      </Section>

      {/* ===== SECURITY ===== */}
      <Section title="Security">
        <SettingItem label="Active Sessions" />
        <SettingItem label="Login Activity" />
      </Section>

      {/* ===== SUPPORT ===== */}
      <Section title="Support">
        <SettingItem label="Help & Documentation" />
        <SettingItem label="Contact Support" />
      </Section>

      {/* ===== LOGOUT ===== */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

export default Settings;

/* ---------- SECTION ---------- */
const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

/* ---------- SETTING ITEM ---------- */
const SettingItem = ({
  label,
}: {
  label: string;
}) => (
  <TouchableOpacity style={styles.item}>
    <Text style={styles.itemText}>{label}</Text>
    <Text style={styles.arrow}>›</Text>
  </TouchableOpacity>
);

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  /* Header */
  header: {
    padding: 20,
    paddingTop: 55,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  subtitle: {
    fontSize: 13,
    color: "#E0E7FF",
    marginTop: 4,
  },

  /* Section */
  section: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 18,
    paddingVertical: 6,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#6B7280",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderColor: "#F3F4F6",
  },

  itemText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  arrow: {
    fontSize: 20,
    color: "#9CA3AF",
  },

  /* Logout */
  logoutContainer: {
    marginHorizontal: 20,
    marginTop: 25,
  },

  logoutBtn: {
    backgroundColor: "#FEE2E2",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    elevation: 2,
  },

  logoutText: {
    color: "#991B1B",
    fontSize: 15,
    fontWeight: "800",
  },
});
