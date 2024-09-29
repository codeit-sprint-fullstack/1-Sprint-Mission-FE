import axios from 'axios';

const articleApi = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_DATABASE_URL || 'https://mini1018.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

const codeitApi = axios.create({
  baseURL: 'https://panda-market-api.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// function interceptor(apiClient) {
//   apiClient.interceptors.request.use(
//     (config) => {
//       const accessToken = document.cookie
//         .split('; ')
//         .find((row) => row.startsWith('accessToken='))
//         ?.split('=')[1];

//       if (accessToken) {
//         config.headers['Authorization'] = `Bearer ${accessToken}`;
//       }

//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   apiClient.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     async (error) => {
//       const originalRequest = error.config;

//       if (error.response.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;

//         const refreshToken = document.cookie
//           .split('; ')
//           .find((row) => row.startsWith('refreshToken='))
//           ?.split('=')[1];

//         if (refreshToken) {
//           try {
//             const response = await axios.post('/auth/refresh-token', {
//               refreshToken,
//             });

//             const newAccessToken = response.data?.accessToken;

//             document.cookie = `accessToken=${newAccessToken}; path=/; secure; samesite=strict; expires=${new Date(
//               new Date().getTime() + 24 * 60 * 60 * 1000
//             ).toUTCString()}`;

//             originalRequest.headers[
//               'Authorization'
//             ] = `Bearer ${newAccessToken}`;
//             return apiClient(originalRequest);
//           } catch (err) {
//             console.error('Token refresh failed:', err);
//             window.location.href = '/login';
//           }
//         } else {
//           window.location.href = '/login';
//         }
//       }

//       return Promise.reject(error);
//     }
//   );
// }

// interceptor(codeitApi);

export { articleApi, codeitApi };
