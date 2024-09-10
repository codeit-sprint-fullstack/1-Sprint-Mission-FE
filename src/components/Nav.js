import personIcon from "../assets/user.png";
import logoImg from "../assets/logo.png";
import styles from "./Nav.module.css";

function Nav() {
  return (
    <div className={styles.nav}>
      <ul className={styles.menu}>
        <li>
          <img src={logoImg} alt="Fanda-market Logo" />
        </li>
        <li>자유게시판</li>
        <li>중고마켓</li>
      </ul>
      <img src={personIcon} alt="유저 메뉴" />
    </div>
  );
}

export default Nav;
