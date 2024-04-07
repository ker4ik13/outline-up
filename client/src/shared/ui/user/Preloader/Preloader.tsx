import styles from "./Preloader.module.scss";

export const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <div className={styles.loader}></div>
    </div>
  );
};
