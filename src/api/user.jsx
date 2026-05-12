import axios from "axios";

export const getAllUser = () => {
    try {
        const response = axios.get("https://dummyjson.com/users");
        return response.data.users;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}

export const getSingleUser = async (id) => {
    try {
        const response = await axios.get(`https://dummyjson.com/users/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
}

export const updateSingleUser = async (id, userData) => {
    try {
        const response = await axios.put(`https://dummyjson.com/users/${id}`, userData);
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
}

