import API from "../api";

export const handleRegister = async (userData) => {
  try {
    const res = await API.post("/auth/register", userData);
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
};
