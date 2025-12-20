import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

/* ===== MOCK DATA (replace with backend later) ===== */
const COURSES = [
  {
    id: "1",
    title: "React Native Mastery",
    description: "Build modern mobile apps using React Native & Expo",
    progress: 60,
    totalChapters: 12,
    completedChapters: 7,
  },
  {
    id: "2",
    title: "Data Structures & Algorithms",
    description: "Master problem solving and coding interviews",
    progress: 35,
    totalChapters: 20,
    completedChapters: 7,
  },
  {
    id: "3",
    title: "Database Management Systems",
    description: "Learn SQL, normalization, indexing & transactions",
    progress: 90,
    totalChapters: 10,
    completedChapters: 9,
  },
];

const StudentCourses = () => {
  return (
    <View style={styles.container}>
      {/* ===== HEADER ===== */}
      <LinearGradient
        colors={["#22C55E", "#16A34A"]}
        style={styles.header}
      >
        <Text style={styles.title}>My Courses</Text>
        <Text style={styles.subtitle}>
          Continue where you left off
        </Text>
      </LinearGradient>

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
            No courses assigned yet
          </Text>
        }
      />
    </View>
  );
};

export default StudentCourses;

/* ===== COURSE CARD ===== */
const CourseCard = ({
  course,
}: {
  course: {
    title: string;
    description: string;
    progress: number;
    totalChapters: number;
    completedChapters: number;
  };
}) => {
  const isCompleted = course.progress === 100;

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9}>
      {/* Image Placeholder */}
      <View style={styles.imageWrapper}>
        <Image
          source={require("../../assets/appimg/course.png")}
          style={styles.image}
        />
      </View>

      {/* Content */}
      <View style={styles.cardContent}>
        <View style={styles.rowBetween}>
          <Text style={styles.courseTitle}>
            {course.title}
          </Text>

          <StatusBadge
            label={
              isCompleted ? "COMPLETED" : "IN PROGRESS"
            }
            completed={isCompleted}
          />
        </View>

        <Text style={styles.courseDesc} numberOfLines={2}>
          {course.description}
        </Text>

        {/* Progress */}
        <View style={styles.progressWrapper}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${course.progress}%` },
              ]}
            />
          </View>

          <Text style={styles.progressText}>
            {course.progress}% • {course.completedChapters}/
            {course.totalChapters} chapters
          </Text>
        </View>

        {/* CTA */}
        <TouchableOpacity style={styles.continueBtn}>
          <Text style={styles.continueText}>
            {isCompleted ? "View Course" : "Continue Learning →"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

/* ===== STATUS BADGE ===== */
const StatusBadge = ({
  label,
  completed,
}: {
  label: string;
  completed: boolean;
}) => (
  <View
    style={[
      styles.badge,
      {
        backgroundColor: completed
          ? "#DCFCE7"
          : "#FEF3C7",
      },
    ]}
  >
    <Text
      style={[
        styles.badgeText,
        {
          color: completed
            ? "#166534"
            : "#92400E",
        },
      ]}
    >
      {label}
    </Text>
  </View>
);

/* ===== STYLES ===== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  /* Header */
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

  /* Card */
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    marginBottom: 18,
    elevation: 4,
    overflow: "hidden",
  },

  imageWrapper: {
    height: 140,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  cardContent: {
    padding: 16,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  courseTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
    flex: 1,
    marginRight: 8,
  },

  courseDesc: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 6,
  },

  /* Progress */
  progressWrapper: {
    marginTop: 14,
  },

  progressBar: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#22C55E",
  },

  progressText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 6,
  },

  /* CTA */
  continueBtn: {
    marginTop: 14,
    backgroundColor: "#22C55E",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
  },

  continueText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },

  /* Badge */
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: "700",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 60,
    color: "#6B7280",
    fontSize: 14,
  },
});
