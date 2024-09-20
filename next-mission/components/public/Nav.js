import Link from "next/link";
import style from "./Nav.module.css";
import { useRouter } from "next/router";

//         color: isActive? '#3692FF': '#4b5563',

function Nav() {
  const router = useRouter();
  const { id } = router.query;
  const getLinkStyle = (href) =>
    router.asPath === href[0] ||
    router.asPath === href[1] ||
    router.asPath === href[2] ||
    router.asPath === href[3]
      ? style.onHref
      : style.offHref;

  return (
    <nav>
      <div className={style.listContaner}>
        <Link href="/freeNoticeBoard">
          <p
            className={`${style.listFont} ${style.freeFont} ${getLinkStyle([
              "/freeNoticeBoard",
              `/freeNoticeBoard/patchArticle/${id}`,
              "/freeNoticeBoard/postArticle",
              `/freeNoticeBoard/${id}`,
            ])}`}
          >
            자유게시판
          </p>
        </Link>
        <Link href="/items">
          <p
            className={`${style.listFont} ${style.usedFont} ${getLinkStyle([
              "/items",
              `/items/${id}`,
            ])}`}
          >
            중고마켓
          </p>
        </Link>
      </div>
      <Link href="/login">
        <div className={style.login}>로그인</div>
      </Link>
    </nav>
  );
}

export default Nav;
