import LoginForm from "@/components/LoginComponents/LoginForm";
import styles from "@/styles/login.module.css";

export default function login() {
  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <LoginForm />
      </div>
    </div>
  );
}
