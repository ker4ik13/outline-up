export const isRoleIncludes = (
  needRoles: string[],
  roles: string[],
): boolean => {
  let isIncludes = false;

  roles.forEach((role) => {
    if (needRoles.includes(role)) {
      isIncludes = true;
    }
  });

  return isIncludes;
};
