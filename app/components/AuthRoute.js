"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import useAuth from "../hooks/useAuth";

export default function AuthRoute({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isSignedIn, setPrePath } = useAuth();

  useEffect(() => {
    if (isSignedIn !== true) {
      console.log("router.asPath : ", pathname);
      setPrePath(pathname);
      router.push("/sign-in");
    }
  }, [isSignedIn, router]);

  if (!isSignedIn) return <p>로그인이 필요합니다</p>;

  return <>{children}</>;
}
