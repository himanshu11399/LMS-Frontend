import API from "../api.js"
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getallstudents = async () => {
    const token = await AsyncStorage.getItem("authToken")
    try {
        const res = await API.get("/admin/getallmembers", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        );
        return res;
    } catch (error) {
        if (error.response) {
            console.log("Register Error:", error.response.data);
            return error.response;
        } else {
            console.log("Network Error:", error.message);
            throw error;
        }
    }
}