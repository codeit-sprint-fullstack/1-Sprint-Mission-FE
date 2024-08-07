import axios from "axios";

const URL = "https://panda-market-api.vercel.app";

export async function getProductList(page, pageSize, orderBy, keyword) {
  try {
    const response = await axios.get(`${URL}/products`, {
      params: { page, pageSize, orderBy, keyword },
    });
    console.log("api 호출")
    return response.data;
  } catch (error) {
    console.error("Fail Get Product List: ", error);
    throw error;
  }
}
export default getProductList;
