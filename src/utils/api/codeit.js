import { codeitApi } from './axios.js';

export async function postSignIn(params) {
  try {
    const response = await codeitApi.post('/auth/signIn', params);

    const accessToken = response.data?.accessToken;
    const refreshToken = response.data?.refreshToken;

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }

    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function postSignup(params) {
  try {
    const response = await codeitApi.post('/auth/signUp', params);

    const accessToken = response.data.accessToken;
    const refreshToken = response.data.refreshToken;

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }

    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }

    return response.data;
  } catch (error) {
    console.error(error);
  }
}
