import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    Alert,
    RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { getAllStudents } from "../../src/mentor/getallStudents";
import { approveStudent } from "../../src/mentor/approveStudent";

type Student = {
    _id: string;
    name: string;
    email: string;
    role: string;
    isApproved: boolean;
};

const Approvals = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);


    /* ---------- FETCH STUDENTS ---------- */
    const manageStudent = async () => {
        try {
            const res = await getAllStudents();

            if (res?.status === 200) {
                // only pending students
                const pending = res.data.students.filter(
                    (s: Student) => !s.isApproved
                );
                setStudents(pending);
            } else {
                Alert.alert("Error", "Please try again later");
            }
        } catch (error) {
            Alert.alert("Error", "Something went wrong");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        manageStudent();
    }, []);

    /* ---------- APPROVE ---------- */
    const handleApprove = async (id: string, name: string) => {
        try {
            const res = await approveStudent(id);

            if (res?.status === 200) {
                Alert.alert(
                    "Approved",
                    `${name} approved successfully`
                );

                // remove student instantly from UI
                setStudents((prev) =>
                    prev.filter((s) => s._id !== id)
                );
            } else {
                Alert.alert("Error", "Approval failed");
            }
        } catch (error) {
            Alert.alert("Error", "Something went wrong");
        }
    };

    /* ---------- REJECT ---------- */
    const handleReject = (id: string, name: string) => {
        Alert.alert(
            "Reject Student",
            `Are you sure you want to reject ${name}?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Reject",
                    style: "destructive",
                    onPress: () => {
                        setStudents((prev) =>
                            prev.filter((s) => s._id !== id)
                        );
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <LinearGradient
                colors={["#4F46E5", "#6366F1"]}
                style={styles.header}
            >
                <Text style={styles.title}>Student Approvals</Text>
                <Text style={styles.subtitle}>
                    Review and approve assigned students
                </Text>
            </LinearGradient>

            <FlatList
                data={students}
                keyExtractor={(item) => item._id}
                contentContainerStyle={{ padding: 20 }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <ApprovalCard
                        student={item}
                        onApprove={handleApprove}
                        onReject={handleReject}
                    />
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(true);
                            manageStudent();
                        }}
                        colors={["#4F46E5"]}   // Android
                        tintColor="#4F46E5"    // iOS
                    />
                }
                ListEmptyComponent={
                    !loading ? (
                        <Text style={{ textAlign: "center", marginTop: 40 }}>
                            No users found
                        </Text>
                    ) : null
                }
            />

        </View>
    );
};

export default Approvals;

/* ---------- CARD ---------- */
const ApprovalCard = ({
    student,
    onApprove,
    onReject,
}: {
    student: Student;
    onApprove: (id: string, name: string) => void;
    onReject: (id: string, name: string) => void;
}) => (
    <View style={styles.card}>
        <Image
            source={require("../../assets/appimg/usericon.png")}
            style={styles.avatar}
        />

        <View style={{ flex: 1 }}>
            <Text style={styles.name}>{student.name}</Text>
            <Text style={styles.email}>{student.email}</Text>

            <View style={styles.badge}>
                <Text style={styles.badgeText}>PENDING</Text>
            </View>
        </View>

        <View style={styles.actions}>
            <TouchableOpacity
                style={styles.approveBtn}
                onPress={() =>
                    onApprove(student._id, student.name)
                }
            >
                <Text style={styles.approveText}>Approve</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.rejectBtn}
                onPress={() =>
                    onReject(student._id, student.name)
                }
            >
                <Text style={styles.rejectText}>Reject</Text>
            </TouchableOpacity>
        </View>
    </View>
);

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },
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
    card: {
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 15,
        marginBottom: 14,
        alignItems: "center",
        elevation: 3,
    },
    avatar: {
        width: 46,
        height: 46,
        marginRight: 12,
    },
    name: {
        fontSize: 15,
        fontWeight: "700",
        color: "#111827",
    },
    email: {
        fontSize: 12,
        color: "#6B7280",
    },
    badge: {
        marginTop: 6,
        alignSelf: "flex-start",
        backgroundColor: "#FEF3C7",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: "700",
        color: "#92400E",
    },
    actions: {
        justifyContent: "space-between",
        height: 68,
    },
    approveBtn: {
        backgroundColor: "#DCFCE7",
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 10,
        marginBottom: 6,
    },
    rejectBtn: {
        backgroundColor: "#FEE2E2",
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 10,
    },
    approveText: {
        color: "#166534",
        fontWeight: "700",
        fontSize: 12,
    },
    rejectText: {
        color: "#991B1B",
        fontWeight: "700",
        fontSize: 12,
    },
    emptyText: {
        textAlign: "center",
        marginTop: 60,
        color: "#6B7280",
        fontSize: 14,
    },
});
