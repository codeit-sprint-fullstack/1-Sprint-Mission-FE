import styles from "./Nav.module.scss";

function getLinkStyle({ isActive }) {
  return {
    color: isActive ? "var(--primary-colour)" : "var(--grey-600)",
  };
}

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to={"/forums"} style={getLinkStyle}>
            자유게시판
          </NavLink>
        </li>
        <li>
          <NavLink to={"/items"} style={getLinkStyle}>
            중고마켓
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
