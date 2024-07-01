// Функция возвращает active style, если проходит проверка

interface GetActiveStyleProps {
  isActive: boolean;
  styles: {
    readonly [key: string]: string;
  };
  needStyle?: string;
}

export const getActiveStyle = ({
  isActive,
  styles,
  needStyle = styles.active,
}: GetActiveStyleProps): string => {
  return isActive ? needStyle : "";
};
