import Nav from "../Nav/Nav";
import styles from "./Header.module.scss";
import Link from "next/link";
import logoImg from "../../public/assets/logo.svg";
import Image from "next/image";
import Button from "../Button/Button";

export default function Header() {
  const pages = [
    { label: "자유게시판", path: "/boards" },
    { label: "중고마켓", path: "/products" },
  ];
  return (
    <header className={styles.Header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link href="/">
            <Image
              className="logo"
              src={logoImg}
              alt="panda market logo"
              width={153}
              height={51}
            />
          </Link>
          <Nav links={pages} />
        </div>

        <Button>로그인</Button>
      </div>
    </header>
  );
}
