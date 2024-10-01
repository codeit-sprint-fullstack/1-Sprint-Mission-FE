import SignUpForm from "@/components/form/auth/SignUpForm";
import SocialLogin from "@/components/ui/SocialLogin";
import styles from "@/styles/pages/auth/main.module.scss";
import Link from "next/link";

export default function SignUpPage() {
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
