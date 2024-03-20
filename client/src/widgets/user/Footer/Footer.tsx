import Link from "next/link";
import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copy}>&copy; OUTLINE UP | 2024</p>
        <div className={styles.authorInfo}>
          <p className={styles.authorInfoText}>ИП Пырьев Александр Иванович</p>
          <p className={styles.authorInfoText}>ИНН 543412546512</p>
        </div>
        <ul className={styles.pages}>
          <li className={styles.page}>
            <Link href="#" className={styles.pageLink}>
              Договор оферты
            </Link>
          </li>
          <li className={styles.page}>
            <Link href="#" className={styles.pageLink}>
              Правила возврата
            </Link>
          </li>
          <li className={styles.page}>
            <Link href="#" className={styles.pageLink}>
              Политика обработки персональных данных
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};
