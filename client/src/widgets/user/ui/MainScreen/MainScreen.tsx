"use client";

import mouseAnimation from "@/data/user/lottie/Mouse.json";
import swipeAnimation from "@/data/user/lottie/Swipe.json";
import poster from "@/data/user/source/Video preview.jpg";
import { SITE_NAME } from "@/shared/constants";
import dynamic from "next/dynamic";
import Image from "next/image";
import styles from "./MainScreen.module.scss";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

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
        <source src="/video/Video.mp4" type="video/mp4" />
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
          {subtitle ? (
            subtitle
          ) : (
            <>Ваш личный VPN который не&nbsp;заблокируют</>
          )}
        </p>
      </div>
      <Lottie
        alt="Scroll"
        className={styles.mouseAnimation}
        animationData={mouseAnimation}
        loop
      />
      <Lottie
        alt="Swipe"
        className={styles.swipeAnimation}
        animationData={swipeAnimation}
        loop
      />
    </div>
  );
};
