"use client";

import { appLinks } from "@/shared/constants";
import { getUserPlatform } from "@/shared/helpers/lib";
import { getDefaultBlockStyles } from "@/shared/helpers/ui";
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
import Link from "next/link";
import { useEffect, useState } from "react";
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
    slug: "Windows",
    href: "https://s3.amazonaws.com/outline-releases/client/windows/stable/Outline-Client.exe",
    icon: <WindowsIcon className={styles.itemIcon} />,
  },
  {
    name: "Mac OS",
    slug: "Macintosh",
    href: "https://itunes.apple.com/us/app/outline-app/id1356178125",
    icon: <AppleIcon className={styles.itemIcon} />,
  },
  {
    name: "Linux",
    slug: "Linux",
    href: "https://s3.amazonaws.com/outline-releases/client/linux/stable/Outline-Client.AppImage",
    icon: <LinuxIcon className={styles.itemIcon} />,
  },
  {
    name: "Android",
    slug: "Android",
    href: "https://play.google.com/store/apps/details?id=org.outline.android.client",
    icon: <AndroidIcon className={styles.itemIcon} />,
  },
  {
    name: "iOS",
    slug: "iPhone",
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

export const Download = ({
  isGrayBg,
  rounded,
  title,
  items,
  className,
}: Props) => {
  const [selectedItem, setSelectedItem] = useState<Partial<DownloadItem>>({});
  const userAgent = typeof window !== "undefined" && navigator.userAgent;

  useEffect(() => {
    const userPlatform = getUserPlatform(userAgent || "");
    const defaultSelectedItem = items
      ? items.filter((item) => item.slug === userPlatform)[0]
      : initialItems.filter((item) => item.slug === userPlatform)[0];

    if (defaultSelectedItem) {
      setSelectedItem(defaultSelectedItem);
    }
  }, []);

  return (
    <div
      className={`${styles.downloadBlock} ${getDefaultBlockStyles({
        styles,
        isGrayBg,
        rounded,
        className,
      })}`}
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
        <div className={styles.buttons}>
          <div className={styles.buttonWrapper}>
            <SharedButton
              center
              fullWidth
              className={styles.button}
              href={selectedItem.href}
              target="_blank"
            >{`Скачать для ${selectedItem.name}`}</SharedButton>
          </div>
          <Link href={appLinks.user.buy.main} className={styles.link}>
            Купить ключ доступа
          </Link>
        </div>
      </div>
    </div>
  );
};
