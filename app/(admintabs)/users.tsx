import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList,
    TouchableOpacity,
    Image,
    Alert,
    RefreshControl
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { getallstudents } from "../../src/services/getallstudents.js"

type User = {
    _id: string;
    name: string;
    email: string;
    role: "STUDENT" | "MENTOR";
    isApproved: boolean;
};


export default function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("ALL");
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleusers = useCallback(async () => {
        try {
            const res = await getallstudents();

            if (res?.status === 200) {
                setUsers(res.data.user);
            } else {
                Alert.alert("Error", "Please Try Again");
            }
        } catch (error) {
            Alert.alert("Error", "Something went wrong");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);


    useEffect(() => {
        handleusers();
    }, [handleusers]);


    const filteredUsers = users.filter((user) => {
        const matchSearch =
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase());

        const matchFilter =
            filter === "ALL" ? true : user.role === filter;

        return matchSearch && matchFilter;
    });

    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.title}>Users</Text>
            <Text style={styles.subtitle}>
                Total Users: {filteredUsers.length}
            </Text>

            {/* Search */}
            <TextInput
                placeholder="Search users..."
                value={search}
                onChangeText={setSearch}
                style={styles.search}
            />

            {/* Filters */}
            <View style={styles.filters}>
                {["ALL", "STUDENT", "MENTOR"].map((item) => (
                    <TouchableOpacity
                        key={item}
                        style={[
                            styles.filterBtn,
                            filter === item && styles.filterActive,
                        ]}
                        onPress={() => setFilter(item)}
                    >
                        <Text
                            style={[
                                styles.filterText,
                                filter === item && styles.filterTextActive,
                            ]}
                        >
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Users List */}

            <FlatList
                data={filteredUsers}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(true);
                            handleusers();
                        }}
                        colors={["#1E2A84"]}
                        tintColor="#1E2A84"
                    />
                }
                renderItem={({ item }) => <UserCard user={item} />}
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
}

/* ---------- User Card ---------- */
const UserCard = ({ user }: { user: User }) => (
    <View style={styles.card}>
        <Image
            source={require("../../assets/appimg/usericon.png")}
            style={styles.avatar}
        />

        <View style={{ flex: 1 }}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>

            <View style={styles.badges}>
                <Badge label={user.role} type="role" />
                <Badge label={user.isApproved ? "ACTIVE" : "PENDING"} type="status" />
            </View>
        </View>

        <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionText}>View</Text>
        </TouchableOpacity>
    </View>
);


type BadgeProps = {
    label: "STUDENT" | "MENTOR" | "ACTIVE" | "PENDING" | "BLOCKED";
    type: "role" | "status";
};
const Badge = ({ label, type }: BadgeProps) => {
  const bg =
    type === "role"
      ? "#EEF2FF"
      : label === "ACTIVE"
      ? "#DCFCE7"
      : "#FEF3C7";

  const color =
    label === "ACTIVE" ? "#166534" : "#92400E";

  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.badgeText, { color }]}>{label}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F6FA",
        padding: 20,
        marginTop: 30
    },

    title: {
        fontSize: 24,
        fontWeight: "800",
        color: "#111827",
    },

    subtitle: {
        fontSize: 14,
        color: "#6B7280",
        marginBottom: 15,
    },

    search: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        paddingHorizontal: 15,
        height: 45,
        marginBottom: 15,
    },

    filters: {
        flexDirection: "row",
        marginBottom: 15,
    },

    filterBtn: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: "#E5E7EB",
        borderRadius: 20,
        marginRight: 10,
    },

    filterActive: {
        backgroundColor: "#1E2A84",
    },

    filterText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#374151",
    },

    filterTextActive: {
        color: "#FFFFFF",
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
    },

    email: {
        fontSize: 12,
        color: "#6B7280",
    },

    badges: {
        flexDirection: "row",
        marginTop: 6,
    },

    badge: {
        borderRadius: 12,
        paddingVertical: 3,
        paddingHorizontal: 10,
        marginRight: 6,
    },

    badgeText: {
        fontSize: 11,
        fontWeight: "700",
    },

    actionBtn: {
        paddingVertical: 6,
        paddingHorizontal: 14,
        backgroundColor: "#EEF2FF",
        borderRadius: 10,
    },

    actionText: {
        color: "#1E2A84",
        fontWeight: "700",
        fontSize: 12,
    },
});
