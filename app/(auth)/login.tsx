import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { handlelogin } from "../../src/services/login";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
    const router = useRouter();
    const [secure, setSecure] = useState(true);
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const storeToken = async (token: string,role:string) => {
        try {
            await AsyncStorage.setItem("authToken", token);
            await AsyncStorage.setItem("role", role);
        } catch (error) {
            console.log("Error storing token:", error);
        }
    };

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "All Fields Are Required");
            return;
        }

        try {
            const res = await handlelogin({
                email,
                password,
            });

            if (res.status === 200) {
                const { token, role, message } = res.data;

                console.log(message);
                console.log(token);
                console.log(role);

                storeToken(token,role);

                if (role === "ADMIN") {
                    router.replace("/(admintabs)/adminhome");
                } else if (role === "MENTOR") {
                    router.replace("/(mentortabs)/mentorhome");
                } else {
                    router.replace("/(studenttabs)/studenthome");
                }

            }

            else if (res.status === 400 || res.status === 401) {
                Alert.alert("Error", "Invalid Credentials");
            } else if (res.status === 403) {
                Alert.alert("Error", "Approval Pending . Contact Higher Faculty");
            } else {
                Alert.alert("Error", "Please try Again");
            }
        } catch (error) {
            Alert.alert("Error", "Something went wrong");
        } finally {
            setemail("");
            setpassword("");
        }
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#1E2A84" }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>

                    {/* Header */}
                    <Text style={styles.heading}>Welcome Back</Text>
                    <Text style={styles.subHeading}>
                        Sign in to continue your learning
                    </Text>

                    {/* Avatar */}
                    <View style={styles.avatarWrapper}>
                        <Image
                            source={require("../../assets/appimg/usericon.png")}
                            style={styles.avatar}
                        />
                    </View>

                    {/* Card */}
                    <View style={styles.card}>
                        {/* Email */}
                        <View style={styles.inputBox}>
                            <TextInput
                                placeholder="Email Address"
                                placeholderTextColor="#7A7A7A"
                                value={email}
                                onChangeText={(text) => setemail(text)}
                                style={styles.input}
                            />
                        </View>

                        {/* Password */}
                        <View style={styles.inputBox}>
                            <TextInput
                                placeholder="Password"
                                placeholderTextColor="#7A7A7A"
                                secureTextEntry={secure}
                                value={password}
                                onChangeText={(text) => setpassword(text)}
                                style={styles.input}
                            />
                            <TouchableOpacity
                                style={styles.eye}
                                onPress={() => setSecure(!secure)}
                            >
                                <Text style={{ fontSize: 16 }}>👁</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Forgot */}
                        <TouchableOpacity>
                            <Text style={styles.forgot}>Forgot Password?</Text>
                        </TouchableOpacity>

                        {/* Login Button */}
                        <TouchableOpacity style={styles.loginBtn} onPress={() => handleLogin()}>
                            <Text style={styles.loginText}>Login</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Footer */}
                    <View style={styles.footerContainer}>
                        <Text style={styles.footerText}>Don’t have an account?</Text>
                        <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
                            <Text style={styles.signup}> Sign Up</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1E2A84",
        alignItems: "center",
        paddingTop: 80,
    },

    heading: {
        color: "#FFFFFF",
        fontSize: 26,
        fontWeight: "700",
        marginBottom: 6,
    },

    subHeading: {
        color: "#D1D5FF",
        fontSize: 14,
        marginBottom: 25,
    },

    avatarWrapper: {
        marginBottom: 20,
    },

    avatar: {
        width: 180,
        height: 180,
        resizeMode: "contain",
    },

    card: {
        width: "85%",
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 20,
    },

    inputBox: {
        borderWidth: 1,
        borderColor: "#B0B0B0",
        borderRadius: 6,
        paddingHorizontal: 12,
        height: 48,
        justifyContent: "center",
        marginBottom: 14,
    },

    input: {
        fontSize: 14,
        color: "#000000",
    },

    eye: {
        position: "absolute",
        right: 12,
    },

    forgot: {
        textAlign: "right",
        fontSize: 12,
        color: "#1E2A84",
        marginBottom: 18,
    },

    loginBtn: {
        backgroundColor: "#1E2A84",
        height: 48,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
    },

    loginText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },

    footerContainer: {
        flexDirection: "row",
        marginTop: 25,
    },

    footerText: {
        color: "#FFFFFF",
        fontSize: 13,
    },

    signup: {
        color: "#FFFFFF",
        fontWeight: "600",
        textDecorationLine: "underline",
    },
});
