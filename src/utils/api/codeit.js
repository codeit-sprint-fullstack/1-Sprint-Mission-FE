import { codeitApi } from './axios.js';

export async function postSignIn(params) {
  try {
    const response = await codeitApi.post('/auth/signIn', params);

    const accessToken = response.data?.accessToken;
    const refreshToken = response.data?.refreshToken;

    if (accessToken) {
      document.cookie = `accessToken=${accessToken}; path=/; secure; samesite=strict; expires=${new Date(
        new Date().getTime() + 24 * 60 * 60 * 1000
      ).toUTCString()}`;
    }

    if (refreshToken) {
      document.cookie = `refreshToken=${refreshToken}; path=/; secure; samesite=strict; expires=${new Date(
        new Date().getTime() + 14 * 24 * 60 * 60 * 1000
      ).toUTCString()}`;
    }

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function postSignup(params) {
  try {
    const response = await codeitApi.post('/auth/signUp', params);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getProducts(id) {
  try {
    const response = await codeitApi.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(error.status);
  }
}

export async function getProductList(query) {
  try {
    const response = await codeitApi.get(`/products`, {
      params: query,
    });
    return response.data.list;
  } catch (error) {
    console.error(error.status);
  }
}

export async function getUser(headers) {
  try {
    const response = await codeitApi.get(`/users/me`, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.error(error.status);
    throw error;
  }
}

export async function postRefreshToken(refreshToken) {
  try {
    const response = await codeitApi.post(`/auth/refresh-token`, {
      refreshToken,
    });
    return response.data.accessToken;
  } catch (error) {
    console.error(error.status);
  }
}
