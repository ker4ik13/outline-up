import { API_URL, SERVER_FILES_DIST } from '@common/constants';

// Функция принимает на вход строку или массив строк
// Подставляет в начало ссылку на сервер и возвращает строку или массив строк

export const setServerUrlBeforeSrc = <T extends string | string[]>(
  imageSrc: T,
): T => {
  if (Array.isArray(imageSrc)) {
    return imageSrc.map((src) => `${API_URL}/${SERVER_FILES_DIST}/${src}`) as T;
  }

  return `${API_URL}/${SERVER_FILES_DIST}/${imageSrc}` as T;
};
