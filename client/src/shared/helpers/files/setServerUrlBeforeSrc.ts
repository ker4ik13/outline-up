// Функция принимает на вход строку или массив строк
// Подставляет в начало ссылку на сервер и возвращает строку или массив строк

export const setServerUrlBeforeSrc = <T extends string | string[]>(
  imageSrc: T
): T => {
  if (Array.isArray(imageSrc)) {
    return imageSrc.map(
      (src) => `${process.env.NEXT_PUBLIC_API_URL}${src}`
    ) as T;
  }

  return `${process.env.NEXT_PUBLIC_API_URL}${imageSrc}` as T;
};
