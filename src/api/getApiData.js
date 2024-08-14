import axios from "axios";

const URL = "https://panda-market-api.vercel.app";

export async function getApiData(page, pageSize, orderBy, keyword) {
  try {
    const response = await axios.get(`${URL}/products`, {
      params: { page, pageSize, orderBy, keyword },
    });
    return response.data;
  } catch (error) {
    console.error("Fail Get Product List: ", error);
    throw error;
  }
}
export default getApiData;
