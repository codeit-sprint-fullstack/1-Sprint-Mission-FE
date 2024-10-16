import axios from "axios";

const api = axios.create({
  baseURL: "https://ms10-5yps.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// api/comments.js
export async function getComments(productId, limit) {
  try {
    const response = await api.get(`/products/product/${productId}/comments`, {
      params: {
        limit: limit,
      },
    });
    // console.log(response.data.comments);
    return response.data.comments;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}

export async function postComment(productId, data) {
  try {
    // const token = localStorage.getItem("accessToken");
    const response = await api.post(
      `/products/product/${productId}/comments`,
      data
    );
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}

export async function patchComment(commentId, data) {
  try {
    // const token = localStorage.getItem("accessToken");
    const response = await api.patch(`/products/comments/${commentId}`, data);
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}

export async function deleteComment(commentId) {
  try {
    const response = await api.delete(`/products/comments/${commentId}`);
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}

export async function getArticleComments(articleId, limit) {
  try {
    const response = await api.get(`/article/${articleId}/comments`, {
      params: {
        limit: limit,
      },
    });
    console.log(response.data.comments);
    return response.data.comments;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}

export async function postArticleComment(articleId, data) {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.post(
      `/articles/article/${articleId}/comments`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}

export async function patchArticleComment(commentId, data) {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.patch(`/articles/comments/${commentId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}

export async function deleteArticleComment(commentId) {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.delete(`/articles/comments/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}
