import styles from "./Preloader.module.scss";

interface PreloaderProps {
  theme?: "dark" | "light";
}

export const Preloader = ({ theme = "dark" }: PreloaderProps) => {
  return (
    <div
      className={`${styles.preloader} ${
        theme === "dark" ? styles.dark : styles.light
      }`}
    >
      <div className={styles.loader}></div>
    </div>
  );
};
