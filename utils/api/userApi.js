import axios from 'axios';

const baseUrl = 'https://panda-market-api.vercel.app';

export async function postUserSingUpApi({
  email,
  nickname,
  password,
  passwordConfirmation,
}) {
  try {
    const res = await axios.post(`${baseUrl}/auth/signUp`, {
      email,
      nickname,
      password,
      passwordConfirmation,
    });

    return res.data;
  } catch (error) {
    console.error('Error posting data:', error);
    alert('회원가입에 실패했습니다');
  }
}

export async function postUserLogInApi({ email, password }) {
  try {
    const res = await axios.post(`${baseUrl}/auth/signIn`, {
      email,
      password,
    });

    localStorage.setItem('accessToken', res.data.accessToken);
    localStorage.setItem('refreshToken', res.data.refreshToken);

    return res.data;
  } catch (error) {
    console.error('Error posting data:', error);
    alert('로그인에 실패했습니다');
  }
}

export async function getUserInfoApi() {
  try {
    const token = localStorage.getItem('accessToken');

    const res = await axios.get(
      `https://panda-market-api.vercel.app/users/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      // {
      //   withCredentials: true,
      // }
    );

    return res.data;
  } catch (error) {
    console.error('Error posting data:', error);
  }
}

export async function getUserTokenApi() {
  try {
    const res = await axios.post(
      `https://panda-market-api.vercel.app/auth/toketn/refresh`
      // {
      //   withCredentials: true,
      // }
    );

    return res.data;
  } catch (error) {
    console.error('Error posting data:', error);
  }
}

export async function deleteUserLogOutApi() {
  // try {
  //   const res = await axios.delete(`${baseUrl}/auth/refresh-token`);
  //   localStorage.setItem('accessToken', res.data.accessToken);
  //   return res.data;
  // } catch (error) {
  //   console.error('Error posting data:', error);
  //   alert('로그아웃에 실패했습니다');
  // }
}

export async function editUserInfoApi() {
  // try {
  //   const res = await axios.patch(`${baseUrl}/users/me/password`);
  //   localStorage.setItem('accessToken', res.data.accessToken);
  //   return res.data;
  // } catch (error) {
  //   console.error('Error posting data:', error);
  //   alert('회원정보 수정에 실패했습니다');
  // }
}
