import "../assets/styles/global.css";
import "../assets/styles/nav.css";

export function NavItem({ className, onClick, children }) {
  const navItemClass = `nav__item ${className}`;
  const itemClick = () => onClick();

  return (
    <li className={navItemClass} onClick={itemClick}>
      {children}
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
