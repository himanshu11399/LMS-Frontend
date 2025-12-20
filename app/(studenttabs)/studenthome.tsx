import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle } from "react-native-svg";

/* ===== MOCK DATA (Replace with backend later) ===== */
const COURSE_DATA = [
  { label: "React", percent: 60, color: "#22C55E" },
  { label: "DSA", percent: 40, color: "#F59E0B" },
  { label: "DBMS", percent: 80, color: "#3B82F6" },
  { label: "OS", percent: 25, color: "#EF4444" },
];

const StudentHome = () => {
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
        <Text style={styles.greeting}>Hello 👋</Text>
        <Text style={styles.name}>Welcome back</Text>
        <Text style={styles.subtitle}>
          Let’s continue your learning journey 🚀
        </Text>
      </LinearGradient>

      {/* ===== STATS ===== */}
      <View style={styles.statsRow}>
        <StatCard title="Courses" value="4" color="#22C55E" />
        <StatCard title="In Progress" value="2" color="#F59E0B" />
        <StatCard title="Completed" value="1" color="#3B82F6" />
      </View>

      {/* ===== LEARNING PROGRESS (CUSTOM GRAPH) ===== */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Learning Progress</Text>

        <View style={styles.circleRow}>
          <CircleProgress {...COURSE_DATA[0]} />
          <CircleProgress {...COURSE_DATA[1]} />
        </View>

        <View style={styles.circleRow}>
          <CircleProgress {...COURSE_DATA[2]} />
          <CircleProgress {...COURSE_DATA[3]} />
        </View>
      </View>

      {/* ===== CURRENT COURSE ===== */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Continue Learning</Text>

        <View style={styles.courseCard}>
          <Text style={styles.courseTitle}>
            React Native Mastery
          </Text>
          <Text style={styles.courseDesc}>
            Build mobile apps using React Native & Expo
          </Text>

          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>

          <Text style={styles.progressText}>
            60% completed
          </Text>

          <TouchableOpacity
            style={styles.continueBtn}
            activeOpacity={0.85}
          >
            <Text style={styles.continueText}>
              Continue →
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ===== MOTIVATION ===== */}
      <View style={styles.motivationCard}>
        <Text style={styles.motivationTitle}>
          🎯 Daily Goal
        </Text>
        <Text style={styles.motivationText}>
          Complete at least 1 chapter today to stay consistent
        </Text>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

export default StudentHome;

/* ===== STAT CARD ===== */
const StatCard = ({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) => (
  <View style={styles.statCard}>
    <Text style={[styles.statValue, { color }]}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
  </View>
);

/* ===== CIRCULAR PROGRESS ===== */
const CircleProgress = ({
  percent,
  label,
  color,
}: {
  percent: number;
  label: string;
  color: string;
}) => {
  const radius = 42;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (circumference * percent) / 100;

  return (
    <View style={styles.circleItem}>
      <Svg width={110} height={110}>
        <Circle
          cx="55"
          cy="55"
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx="55"
          cy="55"
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          rotation="-90"
          origin="55,55"
        />
      </Svg>

      <View style={styles.circleCenter}>
        <Text style={styles.circleValue}>{percent}%</Text>
        <Text style={styles.circleLabel}>{label}</Text>
      </View>
    </View>
  );
};

/* ===== STYLES ===== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  header: {
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  greeting: {
    fontSize: 16,
    color: "#ECFDF5",
    fontWeight: "600",
  },

  name: {
    fontSize: 26,
    fontWeight: "800",
    color: "#FFFFFF",
    marginTop: 4,
  },

  subtitle: {
    fontSize: 14,
    color: "#D1FAE5",
    marginTop: 4,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    marginTop: 20,
  },

  statCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    width: "30%",
    elevation: 4,
    alignItems: "center",
  },

  statValue: {
    fontSize: 22,
    fontWeight: "900",
  },

  statTitle: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: 4,
    fontWeight: "600",
    textAlign: "center",
  },

  section: {
    paddingHorizontal: 20,
    marginTop: 28,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },

  circleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  circleItem: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: "center",
    elevation: 4,
  },

  circleCenter: {
    position: "absolute",
    top: 38,
    alignItems: "center",
  },

  circleValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
  },

  circleLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },

  courseCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    elevation: 4,
  },

  courseTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#111827",
  },

  courseDesc: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },

  progressBar: {
    height: 10,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    marginTop: 15,
    overflow: "hidden",
  },

  progressFill: {
    width: "60%",
    height: "100%",
    backgroundColor: "#22C55E",
  },

  progressText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 8,
    fontWeight: "500",
  },

  continueBtn: {
    marginTop: 15,
    backgroundColor: "#22C55E",
    paddingVertical: 14,
    borderRadius: 15,
    alignItems: "center",
  },

  continueText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 15,
  },

  motivationCard: {
    marginHorizontal: 20,
    marginTop: 28,
    backgroundColor: "#ECFDF5",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#A7F3D0",
  },

  motivationTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#065F46",
  },

  motivationText: {
    fontSize: 13,
    color: "#047857",
    marginTop: 6,
    lineHeight: 18,
  },
});
