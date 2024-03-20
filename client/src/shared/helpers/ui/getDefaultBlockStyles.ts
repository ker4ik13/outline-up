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
}: Props) => {
  return `${isGrayBg && styles.gray} ${
    rounded && rounded.top && styles.roundedTop
  } ${rounded && rounded.bottom && styles.roundedBottom} ${
    rounded && rounded.bottom && rounded.top && styles.rounded
  } ${className && className}`;
};
