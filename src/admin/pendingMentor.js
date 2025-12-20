import API from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

/* ---------- Get Pending Mentors ---------- */
export const getAllPendingMentors = async () => {
  try {
    const token = await AsyncStorage.getItem("authToken");

    if (!token) {
      return {
        status: 401,
        data: { message: "Unauthorized" },
      };
    }

    const res = await API.get("/admin/mentors/pending", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;

  } catch (error) {
    if (error?.response) {
      console.log("Pending Mentors Error:", error.response.data);
      return error.response;
    }

    return {
      status: 500,
      data: { message: "Network error" },
    };
  }
};

/* ---------- Approve Mentor ---------- */
export const approveMentor = async (id) => {
  try {
    const token = await AsyncStorage.getItem("authToken");

    if (!token) {
      return {
        status: 401,
        data: { message: "Unauthorized" },
      };
    }

    const res = await API.post(
      `/admin/mentors/${id}/approve`,
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
      console.log("Approve Mentor Error:", error.response.data);
      return error.response;
    }

    return {
      status: 500,
      data: { message: "Network error" },
    };
  }
};
