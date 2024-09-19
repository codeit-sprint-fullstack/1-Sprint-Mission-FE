import Link from "next/link";
import { useState } from "react";
import Image from "next/image"; // Next.js의 Image 컴포넌트 임포트

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main>
      <header className={styles.header}>
        {/* 로고와 판다 마켓 로고를 담는 컨테이너 */}
        <div className={styles.logoContainer}>
          <Image
            src="/images/img_login_panda_logo.png" // public/images 폴더에서 이미지 접근
            alt="Panda Logo"
            layout="fixed"
            width={396}
            height={132}
            className={styles.logo}
          />
        </div>

        {/* 로그인 버튼 */}
        <Link href="/login" className={styles.loginButton}>
          로그인
        </Link>
      </header>

      <div className={styles.form_box}>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">비밀번호</label>
          <div className={styles.ps_confirm}>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={styles.eyes}>
              <Image
                className={styles.eyss_img}
                src="/images/비밀번호눈.png"
                alt="비밀번호 보기"
                width={24}
                height={24}
              />
            </div>
          </div>

          <button type="submit">로그인</button>
        </form>

        <div className={styles.easy_login_box}>
          <div className={styles.easy_text}>간편 로그인하기</div>

          <div className={styles.sns}>
            <a href="https://www.google.com/" target="google">
              <Image
                src="/images/google.png"
                alt="구글"
                width={42}
                height={42}
              />
            </a>
            <a href="https://www.kakaocorp.com/page/" target="kakaotalk">
              <Image
                src="/images/kakaotalk.png"
                alt="카카오톡"
                width={42}
                height={42}
              />
            </a>
          </div>
        </div>

        <div className={styles.first_ingayo}>
          판다마켓이 처음이신가요?
          <Link href="/create_account" style={{ color: "#3182F6" }}>
            회원가입
          </Link>
        </div>
      </div>
    </main>
  );
}
