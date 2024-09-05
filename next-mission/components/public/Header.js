import style from "./Header.module.css";
import { useCallback, useState } from "react";
import useResize from "../hook/useResize";
import Nav from "./Nav";
import Link from "next/link";

export default function Header() {
  const [logoImg, setLogoImg] = useState(null);

  // 스크린 크기에 따른 로고 변경
  const handleResize = useCallback(() => {
    const length = window.innerWidth;

    if (length >= 768) {
      setLogoImg("/images/pandaLogo.svg");
    } else if (length >= 375 && length < 768) {
      setLogoImg("/images/textLogo.svg");
    }
  }, []);

  useResize(handleResize);

  return (
    <header>
      <Link href="/">
        <img className={style.Logo} src={logoImg} alt="판다로고" />
      </Link>
      <Nav />
    </header>
  );
}
