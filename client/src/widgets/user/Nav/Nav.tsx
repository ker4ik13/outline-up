"use client";

import { appLinks, SITE_NAME } from "@/shared/constants";
import Link from "next/link";
import { useRef } from "react";
import styles from "./Nav.module.scss";
import { handleNav } from "./handleNav";

export const Nav = () => {
  const burger = useRef<HTMLDivElement>(null);
  // const path = usePathname();

  // const isActive = (link: string) =>
  //   path === link ? `${styles.link} ${styles.active}` : styles.link;
  return (
    <header className={styles.nav}>
      <div className={styles.container}>
        <Link href={appLinks.user.main} className={styles.logo}>
          {SITE_NAME}
        </Link>
        <div className={styles.centerPages}>
          <nav className={styles.pages}>
            <li className={styles.page}>
              <Link href={appLinks.user.download.main}>Скачать Outline</Link>
            </li>
            <li className={styles.page}>
              <Link href={appLinks.user.buy.main}>Купить ключ</Link>
            </li>
            <li className={styles.page}>
              <Link href={appLinks.user.instructions.main}>Инструкции</Link>
            </li>
          </nav>
          <Link className={styles.page} href={appLinks.user.support.main}>
            Поддержка
          </Link>
        </div>
        <div
          ref={burger}
          className={styles.burger}
          onClick={() => {
            handleNav(burger, styles);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
};
