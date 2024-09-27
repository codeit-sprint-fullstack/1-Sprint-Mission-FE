import Link from "next/link";
import styles from "./SocialLogin.module.scss";
import { IconContainer } from "./ImgContainers";
import assets from "@/variables/images";

export default function SocialLogin() {
  return (
    <div className={styles["social-login"]}>
      <p>간편 로그인 하기</p>
      <ul>
        <li>
          <Link href="https://www.google.com/">
            <IconContainer
              src={assets.icons.google}
              alt="google icon"
              width="42px"
            />
          </Link>
        </li>
        <li>
          <Link href="https://www.kakaocorp.com/page/">
            <IconContainer
              src={assets.icons.kakao}
              alt="kakaotalk icon"
              width="42px"
            />
          </Link>
        </li>
      </ul>
    </div>
  );
}
