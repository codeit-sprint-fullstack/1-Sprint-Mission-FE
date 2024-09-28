import Nav from "./Nav";
import styles from "./Header.module.scss";
import Link from "next/link";
import Button from "../ui/Button";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import ProfileImg from "../ui/ProfileImg";
import Logo from "./Logo";

export function LoginHeader() {
  return (
    <header className={styles.AuthHeader}>
      <Logo isLoginHeader={true} />
    </header>
  );
}

export default function Header() {
  const pathname = usePathname();
  const { user } = useAuth();
  const isLoginHeader = pathname?.includes("/auth");

  if (isLoginHeader) {
    return <LoginHeader />;
  }

  const pages = [
    { label: "자유게시판", path: "/forum" },
    { label: "중고마켓", path: "/products" },
  ];
  return (
    <header className={styles.Header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Logo />
          <Nav links={pages} />
        </div>

        {!user && (
          <Button>
            <Link href="/auth/login">로그인</Link>
          </Button>
        )}
        {user && (
          <Link className={styles.userProfile} href="/my-page">
            <ProfileImg width="40px" src={user.image} />
            <span className={styles.userName}>{user.nickname}</span>
          </Link>
        )}
      </div>
    </header>
  );
}
