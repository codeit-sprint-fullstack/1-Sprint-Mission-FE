import Nav from "../Nav/Nav";
import styles from "./Header.module.scss";
import Link from "next/link";
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
            <div className={styles.logo}></div>
          </Link>
          <Nav links={pages} />
        </div>

        <Button>로그인</Button>
      </div>
    </header>
  );
}
