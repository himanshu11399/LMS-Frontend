import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

type Course = {
  id: string;
  title: string;
  description: string;
  chapters: number;
  image: any;
};

const COURSES: Course[] = [
  {
    id: "1",
    title: "React Native Mastery",
    description:
      "Build modern mobile apps using React Native and Expo.",
    chapters: 12,
    image: require("../../assets/appimg/course.png"),
  },
  {
    id: "2",
    title: "Full Stack Web Development",
    description:
      "Learn frontend, backend, databases and deployment.",
    chapters: 18,
    image: require("../../assets/appimg/course.png"),
  },
];

const Courses = () => {
  return (
    <View style={styles.container}>
      {/* ===== HEADER ===== */}
      <LinearGradient
        colors={["#4F46E5", "#6366F1"]}
        style={styles.header}
      >
        <Text style={styles.title}>Your Courses</Text>
        <Text style={styles.subtitle}>
          Create and manage your learning content
        </Text>
      </LinearGradient>

      {/* ===== CREATE COURSE CTA ===== */}
      <TouchableOpacity style={styles.createBtn}>
        <Text style={styles.createText}>➕ Create New Course</Text>
      </TouchableOpacity>

      {/* ===== COURSE LIST ===== */}
      <FlatList
        data={COURSES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CourseCard course={item} />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No courses created yet
          </Text>
        }
      />
    </View>
  );
};

export default Courses;

/* ---------- COURSE CARD ---------- */
const CourseCard = ({ course }: { course: Course }) => (
  <TouchableOpacity style={styles.card} activeOpacity={0.85}>
    <Image source={course.image} style={styles.image} />

    <View style={styles.cardContent}>
      <Text style={styles.courseTitle}>
        {course.title}
      </Text>

      <Text style={styles.courseDesc} numberOfLines={2}>
        {course.description}
      </Text>

      <View style={styles.cardFooter}>
        <Text style={styles.chapterText}>
          📘 {course.chapters} Chapters
        </Text>

        <Text style={styles.manageText}>
          Manage →
        </Text>
      </View>
    </View>
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
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
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

  /* Create Button */
  createBtn: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: -18,
    marginBottom: 10,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    elevation: 4,
  },

  createText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#4F46E5",
  },

  /* Course Card */
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginBottom: 18,
    elevation: 4,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },

  cardContent: {
    padding: 16,
  },

  courseTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
  },

  courseDesc: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 6,
  },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },

  chapterText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
  },

  manageText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#4F46E5",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 60,
    color: "#6B7280",
    fontSize: 14,
  },
});
