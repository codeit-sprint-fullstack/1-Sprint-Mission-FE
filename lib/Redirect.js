import { useEffect } from "react";
import { useRouter } from "next/router";

const Redirect = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/forder");
    }
  }, [router]);

  return children;
};

export default Redirect;
