import axios from "axios";

export const getAllProduct = async (payload) => {
  try {
    const params = payload ? `?limit=${payload.limit}&skip=${(payload.page - 1) * payload.limit}` : "";
    const response = await axios.get(`https://dummyjson.com/products${params}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const searchProduct = async (name) => {
  try {
    const response = await axios.get(`https://dummyjson.com/products/search?q=${name}`);
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export const limitProduct = async (limit) => {
  try {
    const response = await axios.get(`https://dummyjson.com/products?limit=${limit}`);
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
