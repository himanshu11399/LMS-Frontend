import API from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const approveStudent = async (studentId) => {
  try {
    const token = await AsyncStorage.getItem("authToken");

    if (!token) {
      return {
        status: 401,
        data: { message: "Unauthorized" },
      };
    }

    const res = await API.post(
      `/mentor/student/${studentId}/approve`,
      {}, // 👈 empty body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res;
  } catch (error) {
    if (error?.response) {
      console.log(
        "Approve Student Error:",
        error.response.data
      );
      return error.response;
    }

    return {
      status: 500,
      data: { message: "Network error" },
    };
  }
};
