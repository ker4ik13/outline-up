import notFoundImg from "@/data/images/not_found.webp";
import Image from "next/image";
import { type ReactNode } from "react";
import s from "./Empty.module.scss";

type Props = {
  title?: string;
  description?: string;
  children?: ReactNode;
};

export const Empty = ({ description, title, children }: Props) => {
  return (
    <div className={s.empty}>
      <Image
        src={notFoundImg}
        alt="Ничего не найдено"
        width={300}
        height={300}
        draggable={false}
        className={s.image}
      />
      <p className={s.title}>{title || "Ничего не найдено"}</p>
      {description && <p className={s.description}>{description}</p>}
      {children}
    </div>
  );
};
