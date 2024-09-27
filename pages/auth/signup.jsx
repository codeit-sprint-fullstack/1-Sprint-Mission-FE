import SignUpForm from "@/components/form/auth/SignUpForm";
import SocialLogin from "@/components/ui/SocialLogin";
import { useAuth } from "@/context/AuthProvider";
import styles from "@/styles/pages/auth/main.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SignUpPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  });
  return (
    <section className={styles.AuthPage}>
      <SignUpForm />
      <SocialLogin />
      <p className={styles.text}>
        이미 회원이신가요?
        <Link href="/auth/login" className={styles.link}>
          로그인
        </Link>
      </p>
    </section>
  );
}
