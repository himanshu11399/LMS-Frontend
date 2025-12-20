import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function AdminHome() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* Header */}
      <Text style={styles.title}>Admin Dashboard</Text>
      <Text style={styles.subtitle}>Overview & analytics</Text>

      {/* Stats Cards */}
      <View style={styles.cardRow}>
        <StatCard title="Total Users" value="1,240" />
        <StatCard title="Students" value="980" />
      </View>

      <View style={styles.cardRow}>
        <StatCard title="Mentors" value="210" />
        <StatCard title="Pending" value="50" highlight />
      </View>

      {/* Line Chart */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>User Growth</Text>
        <LineChart
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{ data: [200, 320, 450, 700, 980, 1240] }],
          }}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>

      {/* Pie Chart */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>User Distribution</Text>
        <PieChart
          data={[
            {
              name: "Students",
              population: 980,
              color: "#1E2A84",
              legendFontColor: "#333",
              legendFontSize: 13,
            },
            {
              name: "Mentors",
              population: 210,
              color: "#4F46E5",
              legendFontColor: "#333",
              legendFontSize: 13,
            },
            {
              name: "Admins",
              population: 50,
              color: "#9333EA",
              legendFontColor: "#333",
              legendFontSize: 13,
            },
          ]}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          center={[5, 0]}
        />
      </View>

    </ScrollView>
  );
}



/* ---------- Components ---------- */
type StatCardProps = {
  title: string;
  value: string;
  highlight?: boolean;
};
const StatCard = ({ title, value, highlight }: StatCardProps) => (
  <View style={[styles.statCard, highlight && styles.highlightCard]}>
    <Text style={styles.statTitle}>{title}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

/* ---------- Chart Config ---------- */
const chartConfig = {
  backgroundGradientFrom: "#FFFFFF",
  backgroundGradientTo: "#FFFFFF",
  color: (opacity = 1) => `rgba(30, 42, 132, ${opacity})`,
  labelColor: () => "#6B7280",
  strokeWidth: 3,
};

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    padding: 20,
    marginTop:30
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

  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  statCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    elevation: 4,
  },

  highlightCard: {
    borderWidth: 1.5,
    borderColor: "#1E2A84",
  },

  statTitle: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 6,
  },

  statValue: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1E2A84",
  },

  chartCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 15,
    marginBottom: 30,
    elevation: 4,
  },

  chartTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },

  chart: {
    borderRadius: 16,
  },
});
