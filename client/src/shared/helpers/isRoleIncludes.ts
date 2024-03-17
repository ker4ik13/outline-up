// Функция проверяет наличие необходимых ролей и пользователя

export const isRoleIncludes = (
  needRoles: string[],
  userRoles: string[]
): boolean => {
  let isIncludes = false;

  userRoles.forEach((role) => {
    if (needRoles.includes(role)) {
      isIncludes = true;
    }
  });

  return isIncludes;
};
