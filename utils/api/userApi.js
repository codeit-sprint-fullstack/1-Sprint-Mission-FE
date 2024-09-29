import axios from 'axios';

// const baseUrl = 'https://panda-market-api.vercel.app';

const otherInstance = axios.create({
  baseURL: 'https://panda-market-api.vercel.app',
});

otherInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

otherInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      const token = localStorage.getItem('refreshToken');
      const accessToken = await getUserTokenApi({ token });

      error.config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return Promise.reject(error);
  }
);

export async function getUserInfoApi(accessToken) {
  try {
    const res = await otherInstance.get(`/users/me`, {
      params: {
        accessToken: accessToken,
      },
    });

    return res.data;
  } catch (error) {
    console.error('Error getting user info:', error);
  }
}

export async function postUserSingUpApi({
  email,
  nickname,
  password,
  passwordConfirmation,
}) {
  try {
    const res = await otherInstance.post(`/auth/signUp`, {
      email,
      nickname,
      password,
      passwordConfirmation,
    });

    return res.data;
  } catch (error) {
    console.error('Login error:', error.response.data);
    // alert(
    //   '회원가입 실패: ' + error.response.data.message ||
    //     '알 수 없는 오류가 발생했습니다.'
    // );

    return error.response.data.message;
  }
}

export async function postUserLogInApi({ email, password }) {
  try {
    const res = await otherInstance.post(`/auth/signIn`, { email, password });
    localStorage.setItem('accessToken', res.data.accessToken);
    localStorage.setItem('refreshToken', res.data.refreshToken);

    return res.data;
  } catch (error) {
    console.error('Login error:', error.response.data);
    // alert(
    //   '로그인 실패: ' + error.response.data.message ||
    //     '알 수 없는 오류가 발생했습니다.'
    // );

    return error.response.data.message;
  }
}

export async function getUserTokenApi({ token }) {
  try {
    const res = await otherInstance.post(`/auth/refresh-token`, {
      refreshToken: token,
    });

    localStorage.setItem('accessToken', res.data.accessToken);
    return res.data.accessToken;
  } catch (error) {
    console.error('Error posting data:', error);
  }
}

export async function deleteUserLogOutApi() {
  // try {
  //   const res = await instance.delete(`/auth/refresh-token`);
  //   localStorage.setItem('accessToken', res.data.accessToken);
  //   return res.data;
  // } catch (error) {
  //   console.error('Error posting data:', error);
  //   alert('로그아웃에 실패했습니다');
  // }
}

export async function editUserInfoApi() {
  // try {
  //   const res = await instance.patch(`/users/me/password`);
  //   localStorage.setItem('accessToken', res.data.accessToken);
  //   return res.data;
  // } catch (error) {
  //   console.error('Error posting data:', error);
  //   alert('회원정보 수정에 실패했습니다');
  // }
}
