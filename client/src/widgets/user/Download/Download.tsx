"use client";

import type { DefaultBlockProps } from "@/shared/types/ui";
import { SharedButton } from "@/shared/ui/user";
import {
  AndroidIcon,
  AppleIcon,
  ChromeIcon,
  DevicesIcon,
  LinuxIcon,
  WindowsIcon,
} from "@/shared/ui/user/icons";
import { useState } from "react";
import styles from "./Download.module.scss";

interface DownloadItem {
  name: string;
  icon: React.ReactNode;
  href: string;
  slug: string;
}

interface Props extends DefaultBlockProps {
  title?: string;
  items?: DownloadItem[];
}

const initialItems: DownloadItem[] = [
  {
    name: "Windows",
    slug: "windows",
    href: "https://s3.amazonaws.com/outline-releases/client/windows/stable/Outline-Client.exe",
    icon: <WindowsIcon className={styles.itemIcon} />,
  },
  {
    name: "Mac OS",
    slug: "mac-os",
    href: "https://itunes.apple.com/us/app/outline-app/id1356178125",
    icon: <AppleIcon className={styles.itemIcon} />,
  },
  {
    name: "Linux",
    slug: "linux",
    href: "https://s3.amazonaws.com/outline-releases/client/linux/stable/Outline-Client.AppImage",
    icon: <LinuxIcon className={styles.itemIcon} />,
  },
  {
    name: "Android",
    slug: "android",
    href: "https://play.google.com/store/apps/details?id=org.outline.android.client",
    icon: <AndroidIcon className={styles.itemIcon} />,
  },
  {
    name: "iOS",
    slug: "ios",
    href: "https://itunes.apple.com/us/app/outline-app/id1356177741",
    icon: <AppleIcon className={styles.itemIcon} />,
  },
  {
    name: "Chrome",
    slug: "chrome-extension",
    href: "https://play.google.com/store/apps/details?id=org.outline.android.client",
    icon: <ChromeIcon className={styles.itemIcon} />,
  },
];

export const Download = ({ isGrayBg, rounded, title, items }: Props) => {
  const [selectedItem, setSelectedItem] = useState(initialItems[0]);

  return (
    <div
      className={`${styles.downloadBlock} ${isGrayBg && styles.gray} ${
        rounded && rounded.top && styles.roundedTop
      } ${rounded && rounded.bottom && styles.roundedBottom}`}
    >
      <div className={styles.container}>
        <h1 className={styles.title}>
          {title ? title : `Скачать Outline client`}
        </h1>
        <DevicesIcon className={styles.mainIcon} />
        <p className={styles.helpText}>
          Скачайте приложение Outline, а затем подключитесь с помощью
          уникального ключа доступа. Outline можно установить на компьютер,
          телефон или планшет, чтобы пользоваться интернетом на любых
          устройствах и безопасно обмениваться данными
        </p>

        <div className={styles.items}>
          {items
            ? items.map((item, index) => (
                <button
                  onClick={() => setSelectedItem(item)}
                  type="button"
                  className={`${styles.item} ${
                    item.slug === selectedItem.slug && styles.selected
                  }`}
                  key={index}
                >
                  {item.icon}
                  <p className={styles.itemName}>{item.name}</p>
                </button>
              ))
            : initialItems.map((item, index) => (
                <button
                  onClick={() => setSelectedItem(item)}
                  type="button"
                  className={`${styles.item} ${
                    item.slug === selectedItem.slug && styles.selected
                  }`}
                  key={index}
                >
                  {item.icon}
                  <p className={styles.itemName}>{item.name}</p>
                </button>
              ))}
        </div>
        <div className={styles.buttonWrapper}>
          <SharedButton
            center
            fullWidth
            className={styles.button}
            href={selectedItem.href}
            target="_blank"
          >{`Скачать для ${selectedItem.name}`}</SharedButton>
        </div>
      </div>
    </div>
  );
};
