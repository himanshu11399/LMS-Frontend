import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Index() {
  const router = useRouter();

  const handleRoute = async () => {
    const token = await AsyncStorage.getItem("authToken");
    const role = await AsyncStorage.getItem("role");
    
    if (token && role) {
      if (role === "ADMIN") {
        router.replace("/(admintabs)/adminhome");
      } else if (role === "MENTOR") {
        router.replace("/(mentortabs)/mentorhome")
      } else {
        router.replace("/(studenttabs)/studenthome")
      }
    } else {
      router.replace("/(auth)/login");
    }
  }
  useEffect(() => {
    setTimeout(() => {
      handleRoute();
    }, 2500)
  }, []);

  return (
    <View style={styles.container}>

      {/* Illustration Box */}
      <View style={styles.imageBox}>
        <Image
          source={require("../assets/appimg/splashimg.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Title */}
      <View style={styles.titleBox}>
        <Text style={styles.title}>LUMINARY</Text>
      </View>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        ADVANCING PROFESSIONAL EXCELLENCE
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E2A84", // deep blue
    justifyContent: "center",
    alignItems: "center",
  },

  imageBox: {
    width: 260,
    height: 260,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  titleBox: {
    paddingHorizontal: 30,
    paddingVertical: 8,
    marginBottom: 8,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "700",
    letterSpacing: 2,
  },

  subtitle: {
    color: "#FFFFFF",
    fontSize: 10,
    letterSpacing: 2,
    opacity: 0.9,
  },
});
