import SignUpForm from "@/components/form/auth/SignUpForm";
import styles from "@/styles/pages/auth/main.module.scss";

export default function SignUpPage() {
  return (
    <section className={styles.AuthPage}>
      <SignUpForm />
    </section>
  );
}
