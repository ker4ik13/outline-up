import styles from "./MainScreen.module.scss";

interface Props {
  title?: string;
  subtitle?: string;
}

export const MainScreen = ({ subtitle, title }: Props) => {
  return (
    <div className={styles.mainScreen}>
      <video
        src="/video/partial-bg.mp4"
        autoPlay
        loop
        preload="auto"
        muted
        unselectable="on"
        className={styles.video}
        id="video"
        draggable={false}
      ></video>
      <div className={styles.text}>
        <h2 className={styles.title}>{title ? title : "Outline UP"}</h2>
        <p className={styles.subtitle}>
          {subtitle ? subtitle : "Ваш личный VPN который не заблокируют"}
        </p>
      </div>
    </div>
  );
};
