import Link from "next/link";
import style from "./Nav.module.css";
import { useRouter } from "next/router";

//         color: isActive? '#3692FF': '#4b5563',

function Nav() {
  const router = useRouter();
  const getLinkStyle = (href) =>
    (router.pathname === href[0] || router.pathname === href[1]) ? style.onHref : style.offHref;

  return (
    <nav>
      <div className={style.listContaner}>
        <Link href="/freeNoticeBoard">
          <p
            className={`${style.listFont} ${style.freeFont} ${getLinkStyle(
              ["/freeNoticeBoard", "/postArticle"]
            )}`}
          >
            자유게시판
          </p>
        </Link>
        <Link href="/items">
          <p
            className={`${style.listFont} ${style.usedFont} ${getLinkStyle(
              ["/items"]
            )}`}
          >
            중고마켓
          </p>
        </Link>
      </div>
      <div className={style.login}>로그인</div>
    </nav>
  );
}

export default Nav;
