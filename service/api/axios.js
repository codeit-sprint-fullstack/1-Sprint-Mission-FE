import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_LOCAL_API_URL;

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    //refreshToken handle
    if (
      typeof window !== 'undefined' &&
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const response = await instance.post('/auth/refresh-token', null, {
          withCredentials: true,
        });
        const { accessToken } = response.data;

        localStorage.setItem('accessToken', accessToken);

        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return instance(originalRequest);
      } catch (error) {
        console.error(
          'token refresh error:',
          error.response?.status,
          error.message
        );

        return Promise.reject({ status: error.response?.status });
      }
    }
    // response error handle
    if (error.response) {
      console.error('error.response', error.response.data);
      return Promise.reject({
        message: error.response?.data.message,
        status: error.response?.status,
      });
    }

    //request error handle
    if (error.request) {
      console.error('error.request', error.request);
      return Promise.reject({ message: error.request?.responseText });
    }

    console.error('error', error.message);

    return Promise.reject(error);
  }
);

export default instance;
