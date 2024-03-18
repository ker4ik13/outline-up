import Link from "next/link";
import styles from "./SharedButton.module.scss";

interface Props {
  children?: React.ReactNode;
  href?: string;
  onClick?: (...args: unknown[]) => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  center?: boolean;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  fullWidth?: boolean;
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
      <Link href={href} className={getStyles()}>
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
