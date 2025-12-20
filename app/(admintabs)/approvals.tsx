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
import {
    getAllPendingMentors,
    approveMentor,
} from "../../src/admin/pendingMentor";

type ApprovalUser = {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
};

const Approvals = () => {
    const [users, setUsers] = useState<ApprovalUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [approvingId, setApprovingId] = useState<string | null>(null);

    const fetchMentors = async () => {
        try {
            const res = await getAllPendingMentors();
            if (res?.status === 200) {
                setUsers(res.data.mentors);
            } else {
                Alert.alert("Error", "Failed to load approvals");
            }
        } catch {
            Alert.alert("Error", "Something went wrong");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchMentors();
    }, []);

    /* ---------- APPROVE HANDLER ---------- */
    const handleApprove = (id: string) => {
        Alert.alert(
            "Approve Mentor",
            "Are you sure you want to approve this mentor?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Approve",
                    onPress: async () => {
                        try {
                            setApprovingId(id);
                            const res = await approveMentor(id);

                            if (res?.status === 200) {
                                Alert.alert(
                                    "Success",
                                    "Mentor approved successfully"
                                );

                                // ✅ remove mentor instantly from UI
                                setUsers((prev) =>
                                    prev.filter((user) => user._id !== id)
                                );
                            } else {
                                Alert.alert("Error", "Approval failed");
                            }
                        } catch {
                            Alert.alert("Error", "Something went wrong");
                        } finally {
                            setApprovingId(null);
                        }
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Approvals</Text>
            <Text style={styles.subtitle}>
                Pending mentor approval requests
            </Text>

            <FlatList
                data={users}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(true);
                            fetchMentors();
                        }}
                        colors={["#1E2A84"]}
                        tintColor="#1E2A84"
                    />
                }
                renderItem={({ item }) => (
                    <ApprovalCard
                        user={item}
                        onApprove={handleApprove}
                        approving={approvingId === item._id}
                    />
                )}
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

/* ---------- Approval Card ---------- */
const ApprovalCard = ({
    user,
    onApprove,
    approving,
}: {
    user: ApprovalUser;
    onApprove: (id: string) => void;
    approving: boolean;
}) => (
    <View style={styles.card}>
        <Image
            source={require("../../assets/appimg/usericon.png")}
            style={styles.avatar}
        />

        <View style={{ flex: 1 }}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>

            <View style={styles.badge}>
                <Text style={styles.badgeText}>PENDING</Text>
            </View>
        </View>

        <View style={styles.actions}>
            <TouchableOpacity
                style={[
                    styles.approveBtn,
                    approving && { opacity: 0.6 },
                ]}
                disabled={approving}
                onPress={() => onApprove(user._id)}
            >
                <Text style={styles.actionText}>
                    {approving ? "Approving..." : "Approve"}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.rejectBtn}>
                <Text style={styles.rejectText}>Reject</Text>
            </TouchableOpacity>
        </View>
    </View>
);

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F6FA",
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
    card: {
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 15,
        marginBottom: 20,
        alignItems: "center",
        elevation: 3,
    },
    avatar: {
        width: 45,
        height: 45,
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
        height: 70,
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
    actionText: {
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
