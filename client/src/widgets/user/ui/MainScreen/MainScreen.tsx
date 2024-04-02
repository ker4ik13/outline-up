import poster from "@/data/user/source/Header.jpg";
import { SITE_NAME } from "@/shared/constants";
import Image from "next/image";
import styles from "./MainScreen.module.scss";

interface Props {
  title?: string;
  subtitle?: string;
}

export const MainScreen = ({ subtitle, title }: Props) => {
  return (
    <div className={styles.mainScreen}>
      <video
        autoPlay
        loop
        muted
        playsInline
        className={styles.video}
        draggable={false}
        poster={poster.src}
      >
        <source src="/video/Header.mp4" type="video/mp4" />
        <Image
          src={poster}
          alt="poster"
          className={styles.video}
          draggable={false}
        />
      </video>
      <div className={styles.text}>
        <h2 className={styles.title}>{title ? title : `${SITE_NAME}`}</h2>
        <p className={styles.subtitle}>
          {subtitle ? subtitle : "Ваш личный VPN который не заблокируют"}
        </p>
      </div>
    </div>
  );
};
