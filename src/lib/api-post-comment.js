import { instanceWithToken } from "./axios-codeit-token";

// 임시로 userId 고정값 사용
const userId = "123e4567-e89b-12d3-a456-426614174001";

export async function createPostComment(postId, content) {
  const path = `/post/${postId}/comment`;
  const data = { content };
  const headers = { authorization: userId };

  try {
    const res = await instanceWithToken.post(path, data, { headers });
    return res.data;
  } catch (err) {
    alert(err);
  }
}

export async function getPostComments(postId) {
  const path = `/post/${postId}/comment`;

  try {
    const res = await instanceWithToken.get(path);
    return res.data;
  } catch (err) {
    alert(err);
  }
}
