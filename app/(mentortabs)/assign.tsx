import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { getAllStudents } from "../../src/mentor/getallStudents";

/* ---------- TYPES ---------- */
type Student = {
  _id: string;
  name: string;
  email: string;
  role: string;
  isApproved: boolean;
};

const COURSES = [
  { id: "1", title: "React Native Mastery" },
  { id: "2", title: "Full Stack Web Development" },
];

const assign = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  /* ---------- FETCH STUDENTS ---------- */
  const fetchStudents = async () => {
    try {
      const res = await getAllStudents();

      if (res?.status === 200) {
        // ✅ only approved students
        const approvedStudents = res.data.students.filter(
          (s: Student) => s.isApproved
        );
        setStudents(approvedStudents);
      } else {
        Alert.alert("Error", "Failed to load students");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  /* ---------- TOGGLE STUDENT ---------- */
  const toggleStudent = (id: string) => {
    setSelectedStudents((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : [...prev, id]
    );
  };

  /* ---------- ASSIGN ---------- */
  const handleAssign = () => {
    if (!selectedCourse || selectedStudents.length === 0) {
      Alert.alert("Error", "Select course and students");
      return;
    }

    Alert.alert(
      "Assigned",
      "Course assigned successfully"
    );

    // later → call backend assign API here
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
        <Text style={styles.title}>Assign Course</Text>
        <Text style={styles.subtitle}>
          Assign courses to approved students
        </Text>
      </LinearGradient>

      {/* ===== SELECT COURSE ===== */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Select Course
        </Text>

        {COURSES.map((course) => (
          <TouchableOpacity
            key={course.id}
            style={[
              styles.courseCard,
              selectedCourse === course.id &&
                styles.courseSelected,
            ]}
            onPress={() => setSelectedCourse(course.id)}
          >
            <Text style={styles.courseText}>
              {course.title}
            </Text>
            {selectedCourse === course.id && (
              <Text style={styles.check}>✓</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* ===== SELECT STUDENTS ===== */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Select Students
        </Text>

        <FlatList
          data={students}
          keyExtractor={(item) => item._id}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.studentCard,
                selectedStudents.includes(item._id) &&
                  styles.studentSelected,
              ]}
              onPress={() => toggleStudent(item._id)}
            >
              <View>
                <Text style={styles.studentName}>
                  {item.name}
                </Text>
                <Text style={styles.studentEmail}>
                  {item.email}
                </Text>
              </View>

              {selectedStudents.includes(item._id) && (
                <Text style={styles.check}>✓</Text>
              )}
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            !loading ? (
              <Text style={styles.emptyText}>
                No approved students found
              </Text>
            ):null
          }
        />
      </View>

      {/* ===== ASSIGN BUTTON ===== */}
      <TouchableOpacity
        style={[
          styles.assignBtn,
          (!selectedCourse ||
            selectedStudents.length === 0) && {
            opacity: 0.5,
          },
        ]}
        disabled={
          !selectedCourse || selectedStudents.length === 0
        }
        onPress={handleAssign}
      >
        <Text style={styles.assignText}>
          Assign Course
        </Text>
      </TouchableOpacity>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

export default assign;

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
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
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    color: "#111827",
  },
  courseCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  courseSelected: {
    borderWidth: 1.5,
    borderColor: "#4F46E5",
  },
  courseText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  studentCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  studentSelected: {
    borderWidth: 1.5,
    borderColor: "#4F46E5",
  },
  studentName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
  },
  studentEmail: {
    fontSize: 11,
    color: "#6B7280",
  },
  check: {
    fontSize: 16,
    fontWeight: "800",
    color: "#4F46E5",
  },
  assignBtn: {
    backgroundColor: "#4F46E5",
    marginHorizontal: 20,
    marginTop: 10,
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    elevation: 4,
  },
  assignText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#6B7280",
    fontSize: 13,
  },
});