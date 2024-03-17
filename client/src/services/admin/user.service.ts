import $api from "@/http";
import type { PageDto, PageOptionsDto } from "@/shared/dtos/page";
import type { ChangeUserDto } from "@/shared/dtos/user";
import type { IsValid } from "@/shared/types";
import type {
  BlockUser,
  ChangeUser,
  ChangeUserCreator,
  User,
} from "@/shared/types/user";

export class UserService {
  static async getMe() {
    const response = await $api.get<User>("/me");
    console.log("get me");
    console.log(response.data);
    return response;
  }

  static async updateUser(
    userId: string,
    body: User | ChangeUserCreator | ChangeUser | ChangeUserDto
  ) {
    return await $api.patch<User>(`/users/${userId}`, body);
  }

  static async updateUserPhoto(userId: string, photo: FormData) {
    console.log(photo);
    return await $api.patch<User>(`/users-photo/${userId}`, photo, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static async getAllUsers(options?: PageOptionsDto) {
    return await $api.get<PageDto<User>>("/users", {
      params: options,
    });
  }
  static async getUserByIdOrSlug(idOrSlug: string) {
    return await $api.get<User>(`/users/${idOrSlug}`);
  }

  static async blockUser(blockUserDto: BlockUser) {
    return await $api.post<User>(`/users/ban`, blockUserDto);
  }
  static async unBlockUser(userId: string) {
    return await $api.post<User>(`/users/unban/${userId}`);
  }

  static async checkUsername(username: string) {
    return await $api.get<IsValid>(`/users/check-username/${username}`);
  }

  static async checkEmail(email: string) {
    return await $api.get<IsValid>(`/users/check-email/${email}`);
  }
}
