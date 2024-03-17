import $api from "@/http";
import type { ErrorResponse } from "@/shared/types/response/ErrorResponse";
import type { CreateUserDto, LoginUser, User } from "@/shared/types/user";

export class AuthService {
  static async login(dto: LoginUser) {
    return await $api.post<ErrorResponse | User>("/auth/login", dto);
  }

  static async registration(dto: CreateUserDto) {
    return await $api.post<User>("/auth/register", dto);
  }

  static async logout() {
    return await $api.get(`/auth/logout`);
  }

  static async refresh() {
    return await $api.get("/auth/refresh");
  }
}
