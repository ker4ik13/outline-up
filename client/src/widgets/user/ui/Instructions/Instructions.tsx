"use client";

import { appLinks } from "@/shared/constants";
import { getDefaultBlockStyles } from "@/shared/helpers/ui";
import type {
  DefaultBlockProps,
  InstructionAccordion,
} from "@/shared/types/ui";
import { Accordion, SharedButton } from "@/shared/ui/user";
import {
  AndroidIcon,
  AppleIcon,
  ChromeIcon,
  LinuxIcon,
  WindowsIcon,
} from "@/shared/ui/user/icons";
import Markdown from "markdown-to-jsx";
import { useState } from "react";
import styles from "./Instructions.module.scss";

interface DownloadItem {
  name: string;
  icon: React.ReactNode;
  href: string;
  slug: string;
}

interface Props extends DefaultBlockProps {
  title?: string;
  items?: DownloadItem[];
  moreInstructions?: InstructionAccordion[];
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

export const Instructions = ({
  isGrayBg,
  rounded,
  title,
  items,
  className,
  moreInstructions,
}: Props) => {
  const [selectedItem, setSelectedItem] = useState(initialItems[0]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number | null) => {
    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      if (index === openIndex) {
        setOpenIndex(null);
        return;
      }
    }

    setOpenIndex(index);
  };

  return (
    <div
      className={`${styles.instructionsBlock} ${getDefaultBlockStyles({
        styles,
        isGrayBg,
        rounded,
        className,
      })}`}
    >
      <div className={styles.container}>
        <h1 className={styles.title}>
          {title ? title : `Как пользоваться OUTLINE UP?`}
        </h1>
        {/* Инструкция 1 */}
        <div className={styles.instructionItems}>
          <div className={styles.instructionItem}>
            <p className={styles.instructionTitle}>
              Установка приложения Outline
            </p>
            <div className={styles.instructionContent}>
              <ol>
                <li>
                  <p>
                    Выберите операционную систему, и после этого нажмите на
                    кнопку «Скачать»
                  </p>
                </li>
                <li>
                  <p>
                    Если в выбрали Android или iOS то после нажатия на кнопку
                    «Скачать» вы перейдете на страницу загрузки приложения в
                    «Google Play Market» или «AppStore». Для ПК загрузка
                    начнется автоматически
                  </p>
                </li>
                <li>
                  <p>Установите приложение на ваше устройство</p>
                </li>
              </ol>
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
                  className={styles.button}
                  href={selectedItem.href}
                  target="_blank"
                >{`Скачать для ${selectedItem.name}`}</SharedButton>
              </div>
            </div>
          </div>
          {/* Инструкция 2 */}
          <div className={styles.instructionItem}>
            <p className={styles.instructionTitle}>Покупка ключа доступа</p>
            <div className={styles.instructionContent}>
              <ol>
                <li>
                  <p>
                    Покупка ключа для доступа к серверу осуществляется через
                    Telegram-бот «OutlineUpBot»
                  </p>
                </li>
                <br />
                <li>
                  <p>Перейдите в бота и нажмите на кнопку «Начать»</p>
                </li>
                <br />

                <li>
                  <p>Для регистрации отправьте боту свое Имя и Фамилию</p>
                </li>
                <br />

                <li>
                  <p>
                    На следующем шаге бот попросит вас указать номер телефона.
                    Для этого нужно нажать на кнопку «Подтвердить номер
                    телефона»
                  </p>
                </li>
                <br />

                <li>
                  <p>
                    После завершения регистрации вам будет доступен тестовый
                    ключ для использования пробного периода длительностью 3 дня
                  </p>
                </li>
                <br />

                <li>
                  <p>
                    Чтобы купить ключ перейдите в главное меню и нажмите на
                    кнопку «Продлить». Если тестовый период уже закончился, то в
                    главном меню нажмите на кнопку «Купить ключ»
                  </p>
                </li>
                <br />

                <li>
                  <p>
                    Выберите подходящий тариф. Если у вас есть промокод на
                    скидку нажмите на кнопку «Ввести промокод»
                  </p>
                </li>
                <br />

                <li>
                  <p>Нажмите на кнопку «Оплатить»</p>
                </li>
                <br />

                <li>
                  <p>
                    В открывшемся окне укажите данные вашей банковской карты и
                    нажмите на кнопку «Заплатить». Telegram и OutlineUp не
                    хранят данные ваших карт, оплата производится через
                    платежный сервис Юкасса
                  </p>
                </li>
                <br />

                <li>
                  <p>
                    После успешной оплаты бот выдаст вам ключ доступа к серверу.
                    Если вы забудете ваш ключ, то в любой момент можно узнать
                    его нажав на кнопку «Мои ключи» в главном меню бота
                  </p>
                </li>
              </ol>
              <div className={styles.buttonWrapper}>
                <SharedButton
                  className={styles.button}
                  href={appLinks.user.buy.main}
                >
                  Купить ключ
                </SharedButton>
              </div>
            </div>
          </div>
          {/* Инструкция 3 */}
          <div className={styles.instructionItem}>
            <p className={styles.instructionTitle}>Подключение к серверу</p>
            <div className={styles.instructionContent}>
              <ol>
                <li>
                  <p>
                    Скопируйте уникальный ключ доступа к серверу полученный в
                    Telegram-боте (он начинается с ss:// и заканчивается набором
                    символов). Для этого просто нажмите на ключ
                  </p>
                </li>
                <br />

                <li>
                  <p>
                    Откройте установленное приложение Outline и нажмите кнопку
                    «Добавить сервер» или иконку плюсика в правом верхнем углу
                  </p>
                </li>
                <br />

                <li>
                  <p>
                    В открывшемся окне вставьте скопированный ранее ключ и
                    нажмите кнопку «Добавить сервер»
                  </p>
                </li>
                <br />

                <li>
                  <p>
                    Теперь сервер Outline Up будет отображаться на главном
                    экране приложения и его не нужно добавлять каждый раз.
                    Нажмите на кнопку «Подключить» чтобы установить соединение с
                    VPN
                  </p>
                </li>
                <br />

                <li>
                  <p>
                    При первом подключении к VPN операционная система задаст
                    вопрос: «Разрешить приложению Outline установить соединение
                    с VPN?» Нажмите на кнопку «Разрешить»
                  </p>
                </li>
                <br />

                <li>
                  <p>
                    Готово! Чтобы выключить VPN, откройте приложение Outline и
                    нажмите кнопку «Отключить»
                  </p>
                </li>
              </ol>
            </div>
          </div>
          {/* Инструкции оставшиеся */}
          {moreInstructions &&
            moreInstructions.length > 0 &&
            moreInstructions.map((insruction) => (
              <div className={styles.instructionItem} key={insruction.id}>
                <p className={styles.instructionTitle}>
                  {insruction.attributes.title}
                </p>
                <div className={styles.instructionContent}>
                  {insruction.attributes.description && (
                    <Markdown>{insruction.attributes.description}</Markdown>
                  )}
                  {insruction.attributes.values.map((value, index) => (
                    <Accordion
                      id={index}
                      key={index}
                      title={value.title}
                      content={value.content}
                      toggleAccordion={() => toggleAccordion(index)}
                      isOpen={openIndex === index}
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
