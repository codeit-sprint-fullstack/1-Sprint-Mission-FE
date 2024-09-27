import { instanceWithToken } from "./axios-codeit-token";

/** codeit GET /users/me 
  return : {
    "updatedAt": "2024-09-23T05:28:51.088Z",
    "createdAt": "2024-09-23T05:28:51.088Z",
    "image": "https://example.com/...",
    "nickname": "닉네임",
    "id": 1
  }
 */
export async function getMyInfo() {
  const path = "/users/me";

  try {
    const res = await instanceWithToken.get(path);
    return res.data;
  } catch (err) {
    throw err;
  }
}
