import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const StudentProfile = () => {
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
            await AsyncStorage.removeItem("authToken");
            router.replace("/(auth)/login");
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
        colors={["#22C55E", "#16A34A"]}
        style={styles.header}
      >
        <Image
          source={require("../../assets/appimg/usericon.png")}
          style={styles.avatar}
        />
        <Text style={styles.name}>Himanshu</Text>
        <Text style={styles.role}>Student</Text>
      </LinearGradient>

      {/* ===== STATS ===== */}
      <View style={styles.statsRow}>
        <StatCard label="Courses" value="4" />
        <StatCard label="Completed" value="1" />
        <StatCard label="Streak" value="7🔥" />
      </View>

      {/* ===== ACCOUNT ===== */}
      <Section title="Account">
        <ProfileItem label="Edit Profile" />
        <ProfileItem label="Change Password" />
        <ProfileItem label="Email Preferences" />
      </Section>

      {/* ===== LEARNING ===== */}
      <Section title="Learning">
        <ProfileItem label="My Courses" />
        <ProfileItem label="Progress Overview" />
        <ProfileItem label="Certificates" />
      </Section>

      {/* ===== SUPPORT ===== */}
      <Section title="Support">
        <ProfileItem label="Help & FAQs" />
        <ProfileItem label="Contact Support" />
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

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

export default StudentProfile;

/* ===== SMALL COMPONENTS ===== */

const StatCard = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <View style={styles.statCard}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

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

const ProfileItem = ({ label }: { label: string }) => (
  <TouchableOpacity style={styles.item}>
    <Text style={styles.itemText}>{label}</Text>
    <Text style={styles.arrow}>›</Text>
  </TouchableOpacity>
);

/* ===== STYLES ===== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  header: {
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },

  name: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  role: {
    fontSize: 13,
    color: "#D1FAE5",
    marginTop: 2,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    marginTop: 10,
  },

  statCard: {
    backgroundColor: "#FFFFFF",
    width: "30%",
    borderRadius: 16,
    padding: 16,
    elevation: 3,
    alignItems: "center",
  },

  statValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#22C55E",
  },

  statLabel: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: 4,
  },

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

  logoutContainer: {
    marginHorizontal: 20,
    marginTop: 25,
  },

  logoutBtn: {
    backgroundColor: "#FEE2E2",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
  },

  logoutText: {
    color: "#991B1B",
    fontSize: 15,
    fontWeight: "800",
  },
});
