// Функция для создания формы изменения фото пользователя

export const changeUserPhoto = (file: File): FormData => {
  const form = new FormData();
  form.append("info.photo", file);
  return form;
};
