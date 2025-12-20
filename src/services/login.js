import API from "../api.js"

export const handlelogin = async (userdata) => {
    try {
        console.log("Login Called");
        const res = await API.post("/auth/login", userdata);
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