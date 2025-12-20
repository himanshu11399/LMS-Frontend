import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router";

const MentorHome = () => {
  const router = useRouter();
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* ===== HERO HEADER ===== */}
      <LinearGradient
        colors={["#4F46E5", "#6366F1"]}
        style={styles.hero}
      >
        <Text style={styles.heroHello}>Hello 👋</Text>
        <Text style={styles.heroName}>Mentor</Text>
        <Text style={styles.heroSubtitle}>
          Let’s build great learning experiences today
        </Text>
      </LinearGradient>

      {/* ===== STATS ===== */}
      <View style={styles.statsWrapper}>
        <View style={styles.statsRow}>
          <StatCard label="Courses Created" value="6" />
          <StatCard label="Assigned Courses" value="12" />
        </View>

        <View style={styles.statsRow}>
          <StatCard
            label="Pending Approvals"
            value="4"
            highlight
          />
          <StatCard label="Total Students" value="38" />
        </View>
      </View>

      {/* ===== QUICK ACTIONS ===== */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Quick Actions
        </Text>

        <TouchableOpacity activeOpacity={0.9}>
          <ActionCard
            title="Create New Course"
            subtitle="Add course & chapters"
            primary
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.navigate('/(mentortabs)/approvals')} activeOpacity={0.9}>
          <ActionCard
            title="Approve Students"
            subtitle="Review pending requests"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.navigate("/(mentortabs)/assign")} activeOpacity={0.9}>
          <ActionCard
            title="Assign Course"
            subtitle="Assign courses to students"
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default MentorHome;

/* ---------- STAT CARD ---------- */
const StatCard = ({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <View
    style={[
      styles.statCard,
      highlight && styles.highlightCard,
    ]}
  >
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

/* ---------- ACTION CARD ---------- */
const ActionCard = ({
  title,
  subtitle,
  primary,
}: {
  title: string;
  subtitle: string;
  primary?: boolean;
}) => (
  <View
    style={[
      styles.actionCard,
      primary && styles.primaryAction,
    ]}

  >
    <Text
      style={[
        styles.actionTitle,
        primary && styles.primaryText,
      ]}
    >
      {title}
    </Text>
    <Text
      style={[
        styles.actionSubtitle,
        primary && styles.primaryText,
      ]}
    >
      {subtitle}
    </Text>
  </View>
);

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  /* Hero */
  hero: {
    padding: 24,
    paddingTop: 60,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  heroHello: {
    fontSize: 16,
    color: "#E0E7FF",
  },

  heroName: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
    marginTop: 2,
  },

  heroSubtitle: {
    fontSize: 14,
    color: "#E0E7FF",
    marginTop: 6,
    maxWidth: "90%",
  },

  /* Stats */
  statsWrapper: {
    padding: 20,
    marginTop: -30,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  statCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    elevation: 4,
  },

  highlightCard: {
    borderWidth: 1.5,
    borderColor: "#6366F1",
  },

  statValue: {
    fontSize: 26,
    fontWeight: "800",
    color: "#4F46E5",
  },

  statLabel: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 6,
  },

  /* Section */
  section: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 12,
    color: "#111827",
  },

  /* Actions */
  actionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    marginBottom: 14,
    elevation: 3,
  },

  primaryAction: {
    backgroundColor: "#4F46E5",
  },

  actionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  actionSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },

  primaryText: {
    color: "#FFFFFF",
  },
});
