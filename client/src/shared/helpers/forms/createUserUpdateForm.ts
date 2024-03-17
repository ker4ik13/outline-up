import { type ChangeUserDto } from "@/shared/dtos/user";
import type { User } from "@/shared/types/user";
import { appendFormData } from "./appendFormData";

// Функция для создания формы изменения пользователя

export const createUserUpdateForm = (
  updatedUser: ChangeUserDto | User,
  file?: File
): FormData => {
  console.log({
    ...updatedUser,
    info: {
      ...updatedUser.info,
      photo: file,
    },
  });
  const form = appendFormData({
    ...updatedUser,
    "info.photo": file,
  });

  // // Добавление полей в форму
  // // Info
  // const userInfo = new UserInfoDto(updatedUser.info);

  // for (const key in userInfo) {
  //   if (userInfo[key as keyof UserInfoDto]) {
  //     form.append(`info.${key}`, userInfo[key as keyof UserInfoDto] as string);
  //   }
  // }

  // form.append("email", updatedUser.email);
  // // form.append('roles', updatedUser.roles);

  // // Photo
  // if (file) {
  //   form.append("info.photo", file);
  // }
  console.log(form);

  return form;
};
