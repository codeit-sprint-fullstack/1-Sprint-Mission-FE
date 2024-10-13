import { renderApi } from './axios';

export async function postLogin({ email, password }) {
  try {
    const response = await renderApi.post('/auth/login', { email, password });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function postSignup({ email, password, nickname }) {
  try {
    const response = await renderApi.post('/auth/signup', {
      email,
      password,
      nickname,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getUser(headers) {
  try {
    const response = await renderApi.get(`/users/me`, {
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
    const response = await renderApi.post(`/auth/refresh-token`, {
      refreshToken,
    });
    return response.data.accessToken;
  } catch (error) {
    console.error(error.status);
  }
}
