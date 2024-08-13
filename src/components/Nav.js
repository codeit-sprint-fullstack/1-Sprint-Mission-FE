import { NavLink } from "react-router-dom";
import "../assets/styles/global.css";
import "../assets/styles/nav.css";

export function NavItem({ className, linkto, children }) {
  const navItemClass = `nav__item ${className}`;

  return (
    <li className={navItemClass}>
      <NavLink to={linkto} className="nav__text">
        {children}
      </NavLink>
    </li>
  );
}

export function Nav({ className, children }) {
  const navClass = `flex-row nav ${className}`;
  return (
    <nav className={navClass}>
      <ul className="nav__list">{children}</ul>
    </nav>
  );
}
