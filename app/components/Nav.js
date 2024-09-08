import Link from "next/link";
import style from "@/app/components/nav.module.css";

export function NavItem({ linkto, children }) {
  const navItemClass = `Text-2lg Bold ${style["item"]}`;
  const navTextClass = style["text"];

  return (
    <li className={navItemClass}>
      <Link className={navTextClass} href={linkto} target="_self">
        {children}
      </Link>
    </li>
  );
}

export function Nav({ children }) {
  const navClass = `flex-row ${style.nav}`;
  const navUlClass = style["list"];

  return (
    <nav className={navClass}>
      <ul className={navUlClass}>{children}</ul>
    </nav>
  );
}
