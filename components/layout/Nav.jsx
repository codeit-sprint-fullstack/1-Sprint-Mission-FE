"use client";
import styles from "./Nav.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav({ links }) {
  const pathname = usePathname();
  return (
    <nav className={styles.Nav}>
      <ul>
        {links.map((link) => {
          const isActive = pathname === link.path;
          return (
            <li key={link.path}>
              <Link className={isActive ? styles.active : ""} href={link.path}>
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
