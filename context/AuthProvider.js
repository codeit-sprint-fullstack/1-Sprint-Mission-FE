import { createLogIn, createUser } from "@/service/api/auth";
import { getUserMe } from "@/service/api/user";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  user: null,
  isLoading: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  let accessToken;

  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("accessToken");
  }

  const {
    data,
    refetch: getMe,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUserMe,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!accessToken,
  });

  const logInMutation = useMutation({
    mutationFn: (data) => createLogIn(data),
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      queryClient.invalidateQueries("user");
      getMe();
      router.push("/products");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const signUpMutation = useMutation({
    mutationFn: (data) => createUser(data),
    onSuccess: (data) => {
      console.log(data);
      const { accessToken, refreshToken } = data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      queryClient.invalidateQueries("user");
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  const logOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    queryClient.setQueriesData(["user"], null);
    console.log("로그아웃 됨");

    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user: data,
        isLoading,
        logIn: logInMutation,
        signUp: signUpMutation,
        logOut,
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
    throw new Error("Error: not used within AuthProvider");
  }

  useEffect(() => {
    if (required && !context.user && !context.isLoading) {
      router.push("/auth/login");
      console.log("로그인 필요함");
    }
  }, [context.user, context.isLoading, router, required]);
  return context;
}
