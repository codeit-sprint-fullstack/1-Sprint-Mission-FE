import LoginForm from "@/components/form/auth/LogInForm";
import Loader from "@/components/ui/Loader";
import SocialLogin from "@/components/ui/SocialLogin";
import { useAuth } from "@/context/AuthProvider";
import styles from "@/styles/pages/auth/main.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LoginPage() {
  const { user, isLoading, logIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !isLoading) {
      router.push("/");
    }
  }, [user, router, isLoading]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className={styles.AuthPage}>
      <LoginForm logIn={logIn} />
      <SocialLogin />
      <p className={styles.text}>
        판다마켓이 처음이신가요?
        <Link href="/auth/signup" className={styles.link}>
          회원가입
        </Link>
      </p>
    </section>
  );
}
