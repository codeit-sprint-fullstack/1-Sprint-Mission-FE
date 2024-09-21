import SigninForm from "../components/SigninComponents/SigninForm";
import styles from "../styles/Signin.module.css";

export default function Signin() {
  return (
    <div className={styles.container}>
      <div className={styles.signinContainer}>
        <SigninForm />
      </div>
    </div>
  );
}
