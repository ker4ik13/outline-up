"use client";

import { appLinks } from "@/shared/constants";
import Link from "next/link";
import { useEffect, useRef } from "react";
import styles from "./Nav.module.scss";
import { handleNav } from "./handleNav";

interface Props {
  theme?: "light" | "dark";
  isSolid?: boolean;
}

export const Nav = ({ isSolid, theme = "dark" }: Props) => {
  const burger = useRef<HTMLDivElement>(null);
  const header = useRef<HTMLDivElement>(null);

  // Изменение цвета шапки при скролле
  const scrollListener = () => {
    const scroll = window.scrollY;
    const clientInnerHeight = window.innerHeight;
    if (header.current) {
      if (scroll + 90 > clientInnerHeight) {
        header.current.classList.add(styles.light);
        header.current.classList.remove(styles.dark);
        return;
      }
      header.current.classList.remove(styles.light);
      header.current.classList.add(styles.dark);
    }
  };

  useEffect(() => {
    if (theme === "dark") {
      window.addEventListener("scroll", scrollListener);
      return () => window.removeEventListener("scroll", scrollListener);
    }
  }, []);

  return (
    <header
      className={`${styles.nav} ${isSolid ? styles.isSolid : ""} ${
        theme && theme === "light" ? styles.light : styles.dark
      }`}
      ref={header}
    >
      <div className={styles.container}>
        <Link href={appLinks.user.main} className={styles.logo}>
          OutlineUP
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
