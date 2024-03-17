import { UserResponse } from 'src/crud/user/dto/responses';
import { User } from 'src/types/user';

export const isUserBlocked = (user: User | UserResponse): boolean => {
  if (!user) {
    return true;
  }

  if (!user.blocked) {
    return false;
  }

  if (user.blocked && user.blocked.isBlocked) {
    return true;
  }

  if (user.blocked && !user.blocked.isBlocked) {
    return false;
  }

  return false;
};
