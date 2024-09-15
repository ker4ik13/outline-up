import type { DefaultBlockProps } from "@/shared/types/ui";

interface Props extends DefaultBlockProps {
  styles: {
    readonly [key: string]: string;
  };
}

export const getDefaultBlockStyles = ({
  rounded,
  isGrayBg,
  className,
  styles,
  withoutTopPadding,
}: Props) => {
  return `${isGrayBg && styles.gray} ${
    rounded && rounded.top && styles.roundedTop
  } ${rounded && rounded.bottom && styles.roundedBottom} ${
    rounded && rounded.bottom && rounded.top && styles.rounded
  } ${withoutTopPadding ? styles.withoutTopPadding : ""} ${
    className && className
  }`;
};
