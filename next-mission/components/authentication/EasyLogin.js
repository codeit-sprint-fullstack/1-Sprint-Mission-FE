import Image from "next/image";
import style from "./EasyLogin.module.css";
import Link from "next/link";

export default function EasyLogin() {
  return (
    <div className={style.contaner}>
      <div>간편 로그인하기</div>
      <div className={style.loginIcon}>
        <Link href={'https://www.google.com'}>
          <Image
            className={style.loginIconImg}
            src={"/images/ic_google.svg"}
            width={42}
            height={42}
            alt="구글 아이콘"
          />
        </Link>
        <Link href={'https://www.kakaocorp.com/page'}>
          <Image
            className={style.loginIconImg}
            src={"/images/ic_kakao.svg"}
            width={42}
            height={42}
            alt="카카오톡 아이콘"
          />
        </Link>
      </div>
    </div>
  );
}
