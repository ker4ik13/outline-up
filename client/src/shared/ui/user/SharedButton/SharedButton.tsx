import Link from "next/link";
import type { UrlObject } from "url";
import styles from "./SharedButton.module.scss";

interface Props {
  children?: React.ReactNode;
  href?: UrlObject | string;
  onClick?: (...args: unknown[]) => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  center?: boolean;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  fullWidth?: boolean;
  target?: "_blank" | "_self" | "_parent" | "_top" | "framename";
}

export const SharedButton = ({
  children,
  href,
  onClick,
  type,
  className,
  center,
  variant = "primary",
  disabled,
  fullWidth,
  target,
}: Props) => {
  const getStyles = () => {
    return `${styles.button} ${center && styles.center} ${
      fullWidth && styles.fullWidth
    } ${
      variant === "primary" ? styles.primary : styles.secondary
    } ${className}`;
  };

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={getStyles()}
        target={target}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type || "button"}
      onClick={onClick}
      disabled={disabled}
      className={getStyles()}
    >
      {children}
    </button>
  );
};
