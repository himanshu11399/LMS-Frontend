import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import React from "react";
import { LineChart, PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const Analytics = () => {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Text style={styles.title}>Analytics & Reports</Text>
      <Text style={styles.subtitle}>
        Detailed platform statistics
      </Text>

      {/* ===== SECTION: USER DISTRIBUTION ===== */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          User Distribution
        </Text>

        <PieChart
          data={[
            {
              name: "Students",
              population: 980,
              color: "#2563EB",
              legendFontColor: "#374151",
              legendFontSize: 12,
            },
            {
              name: "Mentors",
              population: 210,
              color: "#7C3AED",
              legendFontColor: "#374151",
              legendFontSize: 12,
            },
            {
              name: "Admins",
              population: 50,
              color: "#DB2777",
              legendFontColor: "#374151",
              legendFontSize: 12,
            },
          ]}
          width={screenWidth - 40}
          height={200}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="10"
          chartConfig={chartConfig}
        />
      </View>

      {/* ===== SECTION: GROWTH ===== */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Monthly User Growth
        </Text>

        <LineChart
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                data: [200, 340, 480, 690, 980, 1240],
              },
            ],
          }}
          width={screenWidth - 40}
          height={180}
          chartConfig={chartConfig}
          style={styles.chart}
        />
      </View>

      {/* ===== SECTION: USER TABLE ===== */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          User Statistics
        </Text>

        <TableHeader />
        <TableRow label="Total Users" value="1,240" />
        <TableRow label="Active Students" value="980" />
        <TableRow label="Active Mentors" value="210" />
        <TableRow label="Pending Mentors" value="50" />
        <TableRow label="Blocked Users" value="12" />
      </View>

      {/* ===== SECTION: ACTIVITY TABLE ===== */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Recent Platform Activity
        </Text>

        <TableHeader />
        <TableRow label="New Registrations (7 days)" value="86" />
        <TableRow label="Mentor Approvals" value="14" />
        <TableRow label="User Logins Today" value="320" />
        <TableRow label="Account Blocks" value="3" />
      </View>
    </ScrollView>
  );
};

export default Analytics;

/* ---------- TABLE COMPONENTS ---------- */
const TableHeader = () => (
  <View style={styles.tableHeader}>
    <Text style={styles.tableHeaderText}>Metric</Text>
    <Text style={styles.tableHeaderText}>Value</Text>
  </View>
);

const TableRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <View style={styles.tableRow}>
    <Text style={styles.tableLabel}>{label}</Text>
    <Text style={styles.tableValue}>{value}</Text>
  </View>
);

/* ---------- CHART CONFIG ---------- */
const chartConfig = {
  backgroundGradientFrom: "#FFFFFF",
  backgroundGradientTo: "#FFFFFF",
  decimalPlaces: 0,
  color: (opacity = 1) =>
    `rgba(17, 24, 39, ${opacity})`,
  labelColor: () => "#6B7280",
};

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 20,
    marginTop: 30,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
  },

  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 20,
  },

  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 15,
    marginBottom: 30,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    color: "#111827",
  },

  chart: {
    borderRadius: 10,
  },

  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
    paddingBottom: 8,
    marginBottom: 8,
  },

  tableHeaderText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6B7280",
  },

  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#F3F4F6",
  },

  tableLabel: {
    fontSize: 13,
    color: "#374151",
  },

  tableValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
  },
});
