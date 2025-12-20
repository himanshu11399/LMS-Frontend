import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import DropDownPicker from "react-native-dropdown-picker";
import { handleRegister } from "../../src/services/register"


const Signup = () => {
    const router = useRouter();
    const [secure, setSecure] = useState(true);

    const [open, setOpen] = useState(false);
    const [role, setRole] = useState(null);
    const [items, setItems] = useState([
        { label: "Student", value: "STUDENT" },
        { label: "Mentor", value: "MENTOR" },
    ]);

    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async () => {
        if (!email || !password || !role || !name) {
            Alert.alert("Error", "All fields are mandatory");
            return;
        }

        try {
            const res = await handleRegister({
                name,
                email,
                password,
                role,
            });

            if (res?.status === 201) {
                router.replace("/(auth)/login");
            }
            else if (res?.status === 409) {
                Alert.alert("Signup Failed", "User Already Exist");
            } else {
                Alert.alert("Signup Failed", "Please try again");
            }

        } catch (error) {
            Alert.alert("Error", "Something went wrong");
        } finally {
            setname("");
            setemail("");
            setPassword("");
        }
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#1E2A84" }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>

                    {/* Header */}
                    <Text style={styles.heading}>Create Account</Text>

                    {/* Avatar */}
                    <View>
                        <Image
                            source={require("../../assets/appimg/usericon.png")}
                            style={styles.avatar}
                        />
                    </View>

                    {/* Card */}
                    <View style={styles.card}>

                        {/* Full Name */}
                        <View style={styles.inputBox}>
                            <TextInput
                                placeholder="Full Name"
                                placeholderTextColor="#7A7A7A"
                                value={name}
                                onChangeText={(text) => setname(text)}
                                style={styles.input}
                            />
                        </View>

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
                                onChangeText={(text) => setPassword(text)}
                                style={styles.input}
                            />
                            <TouchableOpacity
                                style={styles.eye}
                                onPress={() => setSecure(!secure)}
                            >
                                <Text>👁</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ zIndex: 1000, marginBottom: 14 }}>
                            <DropDownPicker
                                open={open}
                                value={role}
                                items={items}
                                setOpen={setOpen}
                                setValue={setRole}
                                setItems={setItems}
                                placeholder="Select Role"
                                style={styles.dropdownPicker}
                                dropDownContainerStyle={styles.dropdownContainer}
                                textStyle={styles.dropdownText}
                            />
                        </View>


                        {/* Sign Up Button */}
                        <TouchableOpacity style={styles.signupBtn} onPress={() => handleSignUp()}>
                            <Text style={styles.signupText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Footer */}
                    <View style={styles.footerContainer}>
                        <Text style={styles.footerText}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                            <Text style={styles.login}> Login</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1E2A84",
        alignItems: "center",
        justifyContent: "center",
    },

    heading: {
        color: "#FFFFFF",
        fontSize: 26,
        fontWeight: "700",
        marginBottom: 20,
    },


    avatar: {
        width: 100,
        height: 100,
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

    roleText: {
        color: "#7A7A7A",
        fontSize: 14,
    },

    dropdown: {
        position: "absolute",
        right: 12,
        fontSize: 16,
        color: "#7A7A7A",
    },

    signupBtn: {
        backgroundColor: "#1E2A84",
        height: 48,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },

    signupText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },

    footer: {
        color: "#FFFFFF",
        marginTop: 25,
        fontSize: 13,
    },

    login: {
        fontWeight: "600",
        textDecorationLine: "underline",
        color: "#fff"
    },
    footerContainer: {
        flexDirection: "row",
        marginTop: 25,
    },

    footerText: {
        color: "#FFFFFF",
        fontSize: 13,
    },
    dropdownPicker: {
        borderColor: "#B0B0B0",
        borderRadius: 6,
        height: 48,
    },

    dropdownContainer: {
        borderColor: "#B0B0B0",
        borderRadius: 6,
    },

    dropdownText: {
        fontSize: 14,
        color: "#000000",
    },

});
