import axios from "axios";

export const getAllUser = async () => {
    try {
        const response = await axios.get("https://dummyjson.com/users");
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

export const updateSingleUser = async ({ id, ...userData }) => {
    try {
        const response = await axios.put(`https://dummyjson.com/users/${id}`, userData);
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
}

export const addNewUser = async (userData) => {
    try {
        const response = await axios.post(`https://dummyjson.com/users/add`, userData);
        return response.data;
    } catch (error) {
        console.error("Error adding user:", error);
        throw error;
    }
}

export const deleteSingleUser = async (id) => {
    try {
        const response = await axios.delete(`https://dummyjson.com/users/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}

export const searchUser = async (search) => {
    try {
        const response = await axios.get(`https://dummyjson.com/users/search?q=${search}`);
        return response.data.users;
    } catch (error) {
        console.error("Error searching user:", error);
        throw error;
    }
}

export const loginUser = async (username, password, token) => {
    try {
        const response = await axios.post(`https://dummyjson.com/users/login`, { username, password, token },
        token && {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}
