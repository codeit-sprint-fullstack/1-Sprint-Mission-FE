import { instance } from "./axios-codeit";
import { instanceWithToken } from "./axios-codeit-token";

export async function createProductComment({ productId, content }) {
  const path = `/products/${productId}/comments`;
  const data = { content };

  try {
    const res = await instanceWithToken.post(path, data);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getProductComments({
  productId,
  limit = 10,
  cursor = 1,
}) {
  const path = `/products/${productId}/comments`;
  // const params = { limit: limit, cursor: cursor };
  const params = { limit: limit };

  try {
    const res = await instance.get(path, { params });
    return res.data;
  } catch (err) {
    console.error("getProductComments err : ", err);
  }
}

export async function modifyComment({ commentId, content }) {
  const path = `/comments/${commentId}`;
  const data = { content };

  try {
    const res = await instanceWithToken.patch(path, data);
    return res.data;
  } catch (err) {
    console.error("modifyComment err : ", err);
  }
}

export async function deleteComment(commentId) {
  const path = `/comments/${commentId}`;

  try {
    const res = await instanceWithToken.delete(path);
    return res.data;
  } catch (err) {
    console.error("deleteComment err : ", err);
  }
}
