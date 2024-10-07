import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sprint-be-ztdn.onrender.com/',
});

// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// instance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     if (error.response?.status === 401) {
//       const token = getCookie('refreshToken');
//       const accessToken = await getUserTokenApi({ token });

//       error.config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return Promise.reject(error);
//   }
// );

export async function fetchUserInfoApi(accessToken) {
  try {
    const res = await instance.get(`auth`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error('Error getting user info:', error);
  }
}

export async function postUserRegisterApi({ email, nickname, password }) {
  try {
    const res = await instance.post(`user/auth/signUp`, {
      email,
      nickname,
      encryptedPassword: password,
    });

    return res.data;
  } catch (error) {
    return error.response.data.message;
  }
}

export async function postUserLogInApi({ email, encryptedPassword }) {
  try {
    const res = await instance.post(`user/auth/logIn`, {
      email,
      encryptedPassword,
    });
    localStorage.setItem('accessToken', res.data.accessToken);

    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error('Error posting data:', error);
  }
}

export async function fetchUserTokenApi({ token }) {
  try {
    const res = await instance.post(`user/auth/refresh-token`, {
      refreshToken: token,
    });

    localStorage.setItem('accessToken', res.data.accessToken);
    return res.data.accessToken;
  } catch (error) {
    console.error('Error posting data:', error);
  }
}

export async function deleteUserLogOutApi() {}

export async function editUserInfoApi() {}
