"use client";

import s from "./Notification.module.scss";
import { IoIosInformationCircle } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import { type MutableRefObject } from "react";

export type NotificationTypes = "success" | "warning" | "error" | "info";

export interface INotification {
  isOpen: boolean;
  text: string;
  type: NotificationTypes;
  myref: MutableRefObject<HTMLDivElement | null>;
}

interface Props extends INotification {
  setIsOpen: (props: INotification) => void;
}

const stylesFromType = (type: NotificationTypes) => {
  switch (type) {
    case "success":
      return s.success;
    case "info":
      return s.info;
    case "error":
      return s.error;
    case "warning":
      return s.warning;
    default:
      return s.info;
  }
};

const isOpenNotification = (value: boolean) => {
  return value ? s.open : "";
};

export const Notification = ({
  text,
  type,
  myref,
  isOpen,
  setIsOpen,
}: Props) => {
  const handleClose = () => {
    myref.current?.classList.remove(s.open);

    setIsOpen({
      isOpen: false,
      myref: myref,
      text: text,
      type: type,
    });
  };

  return (
    <div
      className={`${s.notification} ${stylesFromType(
        type,
      )} ${isOpenNotification(isOpen)}`}
      ref={myref}
    >
      {type === "success" ? <FaCircleCheck /> : <IoIosInformationCircle />}
      <p className={s.text}>{text}</p>
      <button type='button' className={s.closeButton} onClick={handleClose}>
        <IoIosClose />
      </button>
    </div>
  );
};
