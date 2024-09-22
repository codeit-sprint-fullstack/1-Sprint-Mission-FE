import { createContext, useContext, useEffect } from 'react';
import { useState } from 'react';
import {
  postUserLogInApi,
  getUserInfoApi,
  deleteUserLogOutApi,
  editUserInfoApi,
  getUserTokenApi,
} from '@/utils/api/userApi';
import { useRouter } from 'next/router';
import axios from 'axios';

const AuthContext = createContext({
  user: null,
  login: () => {},
  isPending: true,
  logout: () => {},
  editInfo: () => {},
});

export function AuthProvider({ children }) {
  const [values, setValues] = useState({ user: null, isPending: true });

  const getMe = async () => {
    setValues((prevValues) => ({
      ...prevValues,
      isPending: true,
    }));

    let userValue;

    try {
      const res = await getUserInfoApi();
      userValue = res;
    } finally {
      setValues((prevValues) => ({
        ...prevValues,
        user: userValue,
        isPending: false,
      }));
    }
  };

  const login = async ({ email, password }) => {
    await postUserLogInApi({
      email,
      password,
    });
    await getMe();
  };

  const logout = async () => {
    const res = await deleteUserLogOutApi();
  };

  const editInfo = async () => {
    const res = await editUserInfoApi();
    setValues((prevValues) => ({
      ...prevValues,
      user: userValue,
      isPending: false,
    }));
  };

  // useEffect(() => {
  //   getMe();
  // }, []);

  return (
    <AuthContext.Provider
      value={{
        user: values.user,
        isPending: values.isPending,
        login,
        editInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(required) {
  const context = useContext(AuthContext);
  const router = useRouter();
  if (!context) {
    throw new Error('반드시 AuthProvider 안에서 사용해야 합니다!');
  }

  useEffect(() => {
    if (required && !context.user && !context.isPending) {
      router.push('/login');
    }
  }, [context.user, context.isPending, router, required]);

  return context;
}
