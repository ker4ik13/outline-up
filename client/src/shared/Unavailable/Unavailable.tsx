import type { CSSProperties, MouseEvent } from "react";
import styles from "./Unavailable.module.scss";

interface UnavailableProps {
  children: React.ReactNode;
  onClick?: (...args: any) => void;
  style?: CSSProperties;
}

const stopClick = (event: MouseEvent) => {
  event.preventDefault();
  event.stopPropagation();
};

const Unavailable = ({ children, onClick, style }: UnavailableProps) => {
  return (
    <div
      className={styles.unavailable}
      onClick={(event) => {
        stopClick(event);

        if (onClick) {
          onClick();
        }
      }}
      style={style}
    >
      {children}
    </div>
  );
};

export default Unavailable;
