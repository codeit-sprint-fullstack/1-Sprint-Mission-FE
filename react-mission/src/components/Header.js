import './Header.css'
import { useCallback, useState } from "react";
import useResize from "./hook/useResize";
import pandaLogo from "./img/PandaLogo.png";
import textLogo from "./img/textLogo.png";
import Nav from "./Nav";

function Header() {
  const [logoImg, setLogoImg] = useState(null);

  // 스크린 크기에 따른 로고 변경
  const handleResize = useCallback(() => {
    const length = window.innerWidth;

    if (length >= 768) {
      setLogoImg(pandaLogo);
    } else if (length >= 375 && length < 768) {
      setLogoImg(textLogo);
    }
  }, []);

  useResize(handleResize);

  return (
    <header>
      <a href="/">
        <img className="Logo" src={logoImg} alt="판다로고" />
      </a>
      <Nav />
    </header>
  );
}

export default Header;
