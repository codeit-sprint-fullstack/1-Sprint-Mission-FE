import { instance } from "./axios-codeit";
import { instanceWithToken } from "./axios-codeit-token";

export async function createProductComment({ productId, content }) {
  const path = `/products/${productId}/comments`;
  const data = { content };

  console.log("path : ", path);

  try {
    const res = await instanceWithToken.post(path, data);
    console.log("res : ", res);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getProductComments({
  productId,
  limit = 10,
  //   cursor = 1,
}) {
  const path = `/products/${productId}/comments`;
  //   const params = { limit: limit, cursor: cursor };
  const params = { limit: limit };

  try {
    const res = await instance.get(path, { params });
    return res.data;
  } catch (err) {
    console.error("getProductComments err : ", err);
  }
}
