import axios from "axios";

const API_URL = "https://panda-market-api.vercel.app";

export async function getProduct(page, pageSize, orderBy, keyword) {
  try {
    const response = await axios.get(`${API_URL}/products`, {
      params: { page, pageSize, orderBy, keyword },
    });
    return response.data;
  } catch (error) {
    console.error("Fail Get Product List: ", error);
    throw error;
  }
}
export default getProduct;
