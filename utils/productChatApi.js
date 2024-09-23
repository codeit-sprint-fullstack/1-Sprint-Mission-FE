import axios from "axios";
import { apiHandler } from "./apiHandler";

const baseUrl = "https://panda-market-api.vercel.app";

export async function fetchComments(id, cursor = 0) {
  return apiHandler(async () => {
    const response = await axios.get(
      `${baseUrl}/products/${id}/comments?limit=4&cursor=${cursor}`
    );

    return response.data;
  });
}

export async function addComment(id, comment) {
  const accessToken = localStorage.getItem("accessToken");
  return apiHandler(async () => {
    const response = await axios.post(
      `${baseUrl}/products/${id}/comments`,
      comment,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  });
}

export async function editComment(id, comment) {
  const accessToken = localStorage.getItem("accessToken");
  return apiHandler(async () => {
    const response = await axios.patch(`${baseUrl}/comments/${id}`, comment, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  });
}

export async function deleteComment(id) {
  const accessToken = localStorage.getItem("accessToken");
  return apiHandler(async () => {
    const response = await axios.delete(`${baseUrl}/comments/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  });
}
