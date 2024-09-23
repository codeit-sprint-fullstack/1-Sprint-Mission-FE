import Nav from "./Nav";
import styles from "./Header.module.scss";
import Link from "next/link";
import Button from "../ui/Button";
import { usePathname } from "next/navigation";
import logo from "../../public/assets/logo.svg";
import Image from "next/image";

export function AuthHeader() {
  return (
    <header className={styles.AuthHeader}>
      <Link href="/">
        <div className={styles.logo}>
          <Image src={logo} width={396} height={132} alt="panda market logo" />
        </div>
      </Link>
    </header>
  );
}

export default function Header() {
  const pathname = usePathname();

  const isAuthHeader = pathname.includes("/auth");

  if (isAuthHeader) {
    return <AuthHeader />;
  }

  const pages = [
    { label: "자유게시판", path: "/forum" },
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

        <Button>
          <Link href="/auth/login">로그인</Link>
        </Button>
      </div>
    </header>
  );
}
