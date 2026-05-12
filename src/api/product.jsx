import axios from "axios";

export const getAllProduct = async () => {
  try {
    const response = await axios.get("https://dummyjson.com/products");
    return response.data.products;
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
