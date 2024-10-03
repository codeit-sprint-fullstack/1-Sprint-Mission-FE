import styles from "./SocialLogin.module.css";

const SocialLogin = () => {
  return (
    <div className={styles.socialLogin}>
      <span>간편 로그인하기</span>
      <div className={styles.socialIcons}>
        <a href="https://www.google.com/" className={styles.googleLogin}>
          <img src="/image/google.svg" alt="Google Login" />
        </a>
        <a href="https://www.kakaocorp.com/page/" className={styles.kakaoLogin}>
          <img src="/image/kakao.svg" alt="Kakao Login" />
        </a>
      </div>
    </div>
  );
};

export default SocialLogin;

