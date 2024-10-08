import { appLinks, SITE_NAME } from "@/shared/constants";
import Link from "next/link";
import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copy}>&copy; {SITE_NAME} 2024</p>
        <div className={styles.authorInfo}>
          <p className={styles.authorInfoText}>ИП Пырьев Александр Иванович</p>
          <p className={styles.authorInfoText}>ИНН 711609923813</p>
        </div>
        <ul className={styles.pages}>
          <li className={styles.page}>
            <Link
              href={appLinks.user.returnPolicy.main}
              className={styles.pageLink}
            >
              Правила возврата
            </Link>
          </li>
          <li className={styles.page}>
            <Link href={appLinks.user.offerta.main} className={styles.pageLink}>
              Оферта
            </Link>
          </li>
          <li className={styles.page}>
            <Link href={appLinks.user.privacy.main} className={styles.pageLink}>
              Политика конфиденциальности
            </Link>
          </li>
        </ul>
        <div className={styles.authors}>
          <div className={styles.author}>
            <p className={styles.authorJob}>Дизайн:</p>
            <Link
              className={styles.authorLink}
              href={"https://t.me/alexpyriev"}
              target="_blank"
            >
              alexpyriev
            </Link>
          </div>
          <div className={styles.author}>
            <p className={styles.authorJob}>Разработка:</p>
            <Link
              className={styles.authorLink}
              href={"https://hxh.agency"}
              target="_blank"
              aria-label="HxH Agency"
            >
              HxH Agency
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
