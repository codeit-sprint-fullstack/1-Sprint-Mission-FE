import { useGlobalModal } from "@/hooks/useModals";
import { createLogIn, createUser } from "@/service/api/auth";
import { getUserMe } from "@/service/api/user";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect } from "react";

const AuthContext = createContext({
  user: null,
  isLoading: false,
  logIn: () => {},
  logOut: () => {},
  onModalOpen: () => {},
});

export function AuthProvider({ children }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { onModalOpen, GlobalModal: AuthModal } = useGlobalModal();
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
    onModalOpen({
      msg: "로그아웃 되었습니다",
      action: () => router.push("/"),
    });

    console.log("로그아웃 됨");
  };

  return (
    <AuthContext.Provider
      value={{
        user: data,
        isLoading,
        logIn: logInMutation,
        signUp: signUpMutation,
        logOut,
        onModalOpen,
      }}
    >
      {children}
      <AuthModal />
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
      context.onModalOpen({
        msg: "로그인 된 유저만 접근할수 있습니다.",
        action: () => router.push("/auth/login"),
      });

      // router.push("/auth/login");
      console.log("로그인 필요함");
    }
  }, [context.user, context.isLoading, router, required]);
  return context;
}
