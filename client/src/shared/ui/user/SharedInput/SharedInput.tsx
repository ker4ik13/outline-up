"use client";

import { useState, type InputHTMLAttributes } from "react";
import styles from "./SharedInput.module.scss";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const SharedInput = (props: InputProps) => {
  const [isError, setIsError] = useState(false);

  const defaultOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Если есть минимальное и максимальное значение, то проверяем их
    if (props.min || props.max) {
      const { value } = e.target;
      if (props.min && +value < +props.min) {
        setIsError(true);
        return;
      }
      if (props.max && +value > +props.max) {
        setIsError(true);
        return;
      }

      setIsError(false);
    }

    setIsError(false);
  };

  return (
    <input
      {...props}
      onChange={(e) => {
        defaultOnChange(e);
        props.onChange?.(e);
      }}
      className={`${styles.input} ${props.className ? props.className : ""} ${
        isError ? styles.error : ""
      }`}
    />
  );
};
