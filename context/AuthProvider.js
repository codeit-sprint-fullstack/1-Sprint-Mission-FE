import { createLogIn } from "@/service/api/auth";
import { getUserMe } from "@/service/api/user";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect } from "react";

const AuthContext = createContext({
  user: null,
  isLoading: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: user,
    refetch: getMe,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUserMe,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const logInMutation = useMutation({
    mutationFn: (data) => createLogIn(data),
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      getMe();
      router.push("/products");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const logOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    queryClient.invalidateQueries({ queryKey: ["user"] });

    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, logIn: logInMutation.mutate, logOut }}
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
      router.push("/login");
    }
  }, [context.user, context.isLoading, router, required]);
  return context;
}
