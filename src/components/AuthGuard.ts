import { useEffect } from "react";
import { useRouter } from "next/router";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  useEffect(() => {
    if (
      token &&
      (router.pathname === "/login" || router.pathname === "/signin")
    ) {
      router.push("/folder");
    } else if (
      !token &&
      router.pathname !== "/login" &&
      router.pathname !== "/signin"
    ) {
      router.push("/login");
    }
  }, [token, router]);

  return children;
};

export default AuthGuard;
