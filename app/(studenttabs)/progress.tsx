import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { LineChart } from "react-native-chart-kit";
import Svg, { Circle } from "react-native-svg";

const screenWidth = Dimensions.get("window").width;

/* ===== MOCK DATA ===== */
const WEEKLY_PROGRESS = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      data: [20, 35, 45, 60, 55, 70, 80],
      strokeWidth: 3,
    },
  ],
};

const OVERALL_PROGRESS = 68; // %

const StudentProgress = () => {
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
        <Text style={styles.title}>Your Progress</Text>
        <Text style={styles.subtitle}>
          Consistency builds mastery 🚀
        </Text>
      </LinearGradient>

      {/* ===== OVERALL PROGRESS RING ===== */}
      <View style={styles.ringCard}>
        <ProgressRing progress={OVERALL_PROGRESS} />
        <Text style={styles.ringText}>
          Overall Completion
        </Text>
      </View>

      {/* ===== WEEKLY TREND ===== */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Weekly Learning Trend
        </Text>

        <View style={styles.chartCard}>
          <LineChart
            data={WEEKLY_PROGRESS}
            width={screenWidth - 40}
            height={220}
            yAxisSuffix="%"
            chartConfig={{
              backgroundGradientFrom: "#FFFFFF",
              backgroundGradientTo: "#FFFFFF",
              decimalPlaces: 0,
              color: () => "#22C55E",
              labelColor: () => "#6B7280",
              propsForDots: {
                r: "4",
                strokeWidth: "2",
                stroke: "#16A34A",
              },
            }}
            bezier
            style={{ borderRadius: 16 }}
          />
        </View>
      </View>

      {/* ===== STREAK ===== */}
      <View style={styles.streakCard}>
        <Text style={styles.streakTitle}>
          🔥 Learning Streak
        </Text>
        <Text style={styles.streakValue}>7 Days</Text>
        <Text style={styles.streakSub}>
          Keep learning daily to grow faster
        </Text>
      </View>

      {/* ===== SKILL BREAKDOWN ===== */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Skill Breakdown
        </Text>

        <SkillCard skill="React Native" value="70%" />
        <SkillCard skill="DSA" value="45%" />
        <SkillCard skill="DBMS" value="80%" />
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

export default StudentProgress;

/* ===== PROGRESS RING ===== */
const ProgressRing = ({ progress }: { progress: number }) => {
  const radius = 60;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const offset =
    circumference - (circumference * progress) / 100;

  return (
    <View style={styles.ringContainer}>
      <Svg width={150} height={150}>
        <Circle
          cx="75"
          cy="75"
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx="75"
          cy="75"
          r={radius}
          stroke="#22C55E"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </Svg>
      <Text style={styles.ringValue}>{progress}%</Text>
    </View>
  );
};

/* ===== SKILL CARD ===== */
const SkillCard = ({
  skill,
  value,
}: {
  skill: string;
  value: string;
}) => (
  <View style={styles.skillCard}>
    <Text style={styles.skillName}>{skill}</Text>
    <Text style={styles.skillValue}>{value}</Text>
  </View>
);

/* ===== STYLES ===== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  header: {
    padding: 20,
    paddingTop: 55,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  subtitle: {
    fontSize: 13,
    color: "#D1FAE5",
    marginTop: 4,
  },

  ringCard: {
    backgroundColor: "#FFFFFF",
    margin: 20,
    borderRadius: 24,
    alignItems: "center",
    paddingVertical: 20,
    elevation: 4,
  },

  ringContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  ringValue: {
    position: "absolute",
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
  },

  ringText: {
    marginTop: 10,
    fontSize: 13,
    color: "#6B7280",
  },

  section: {
    padding: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    color: "#111827",
  },

  chartCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 10,
    elevation: 3,
    alignItems: "center",
  },

  streakCard: {
    marginHorizontal: 20,
    backgroundColor: "#ECFDF5",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#A7F3D0",
    alignItems: "center",
  },

  streakTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#065F46",
  },

  streakValue: {
    fontSize: 26,
    fontWeight: "800",
    color: "#16A34A",
    marginVertical: 6,
  },

  streakSub: {
    fontSize: 12,
    color: "#047857",
  },

  skillCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 2,
  },

  skillName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  skillValue: {
    fontSize: 14,
    fontWeight: "800",
    color: "#22C55E",
  },
});
