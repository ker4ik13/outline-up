import type { ChangeUserDto } from "@/shared/dtos/user";
import type { CreateUserDto, LoginUser, User } from "@/shared/types/user";
import { type AxiosResponse } from "axios";
import { createContext, type ReactNode } from "react";
import { useProvideAuth } from "../hooks";

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuth: boolean;
  signin: (user: LoginUser) => Promise<User | null>;
  signout: () => Promise<User | null>;
  getUser: () => Promise<User | null>;
  registration: (user: CreateUserDto) => Promise<AxiosResponse<User, any>>;
  updateUser: (user: User | ChangeUserDto) => Promise<User | null>;
  updateUserPhoto: (photo: FormData) => Promise<User | null>;
}
interface AuthProviderProps {
  children: ReactNode;
}
export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
