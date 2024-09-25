import { instance } from "./axios-codeit";

export async function getMyInfo() {
  const path = "/users/me";

  //   {
  //     "updatedAt": "2024-09-23T05:28:51.088Z",
  //     "createdAt": "2024-09-23T05:28:51.088Z",
  //     "image": "https://example.com/...",
  //     "nickname": "닉네임",
  //     "id": 1
  //   }

  try {
    const res = await instance.get(path);
    console.log("getMyInfo : ", res);
    return res.data;
  } catch (err) {
    throw err;
  }
}
