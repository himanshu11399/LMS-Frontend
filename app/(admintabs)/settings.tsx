import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Settings = () => {
    const router = useRouter();

    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await AsyncStorage.removeItem("authToken");
                            router.replace("/(auth)/login");
                        } catch (error) {
                            Alert.alert("Error", "Something went wrong");
                        }
                    },
                },
            ]
        );
    };

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <Text style={styles.title}>Settings</Text>
            <Text style={styles.subtitle}>
                Manage account & system preferences
            </Text>

            {/* ===== ACCOUNT ===== */}
            <Section title="Account">
                <SettingItem label="Profile Information" />
                <SettingItem label="Change Password" />
            </Section>

            {/* ===== SYSTEM ===== */}
            <Section title="System">
                <SettingItem label="App Version" value="v1.0.0" />
                <SettingItem label="Maintenance Mode" />
            </Section>

            {/* ===== SECURITY ===== */}
            <Section title="Security">
                <SettingItem label="Active Sessions" />
                <SettingItem label="Access Logs" />
            </Section>

            {/* ===== SUPPORT ===== */}
            <Section title="Support">
                <SettingItem label="Help & Documentation" />
                <SettingItem label="Contact Support" />
            </Section>

            {/* ===== DANGER ZONE ===== */}
            <View style={styles.dangerZone}>
                <TouchableOpacity
                    style={styles.logoutBtn}
                    onPress={handleLogout}
                >
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default Settings;

/* ---------- SECTION ---------- */
const Section = ({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {children}
    </View>
);

/* ---------- SETTING ITEM ---------- */
const SettingItem = ({
    label,
    value,
}: {
    label: string;
    value?: string;
}) => (
    <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>{label}</Text>
        {value && <Text style={styles.valueText}>{value}</Text>}
    </TouchableOpacity>
);

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
        paddingVertical: 10,
        marginBottom: 20,
        elevation: 2,
    },

    sectionTitle: {
        fontSize: 13,
        fontWeight: "700",
        color: "#6B7280",
        paddingHorizontal: 15,
        paddingBottom: 8,
    },

    item: {
        paddingHorizontal: 15,
        paddingVertical: 14,
        borderTopWidth: 1,
        borderColor: "#F3F4F6",
        flexDirection: "row",
        justifyContent: "space-between",
    },

    itemText: {
        fontSize: 14,
        color: "#111827",
    },

    valueText: {
        fontSize: 13,
        color: "#6B7280",
    },

    dangerZone: {
        marginTop: 10,
    },

    logoutBtn: {
        backgroundColor: "#FEE2E2",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginBottom:50
    },

    logoutText: {
        color: "#991B1B",
        fontSize: 14,
        fontWeight: "700",
    },
});
