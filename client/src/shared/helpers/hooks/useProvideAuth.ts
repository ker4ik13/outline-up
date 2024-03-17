import { AuthService, UserService } from "@/services/admin";
import { ChangeUserDto } from "@/shared/dtos/user";
import type { CreateUserDto, LoginUser, User } from "@/shared/types/user";
import { useState } from "react";
import { AuthContextType } from "../auth/AuthContext";

export const useProvideAuth = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUser = (user: User | null) => {
    if (user) {
      setIsLoading(false);
      setUser(user);
      setIsAuth(true);
      return user;
    } else {
      setIsLoading(false);
      setUser(null);
      setIsAuth(false);
      return null;
    }
  };

  const signin = async (user: LoginUser) => {
    setIsLoading(true);
    const response = await AuthService.login(user);
    return handleUser(response.data as User);
  };

  const signout = async () => {
    await AuthService.logout();
    return handleUser(null);
  };

  const registration = async (user: CreateUserDto) => {
    return await AuthService.registration(user);
  };

  const getUser = async () => {
    setIsLoading(true);

    if (!user) {
      const response = await UserService.getMe();
      return handleUser(response.data);
    }

    setIsLoading(false);
    setIsAuth(true);
    return user;
  };

  const updateUser = async (user: ChangeUserDto | User) => {
    setIsLoading(true);
    const response = await UserService.updateUser(user._id, user);
    return handleUser(response.data);
  };

  const updateUserPhoto = async (photo: FormData) => {
    setIsLoading(true);
    if (!user) {
      const response = await UserService.getMe();
      return handleUser(response.data);
    }

    const response = await UserService.updateUserPhoto(user._id, photo);
    return handleUser(response.data);
  };

  return {
    user,
    isLoading,
    isAuth,
    signin,
    signout,
    getUser,
    registration,
    updateUser,
    updateUserPhoto,
  };
};
