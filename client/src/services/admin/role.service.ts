import $api from "@/http";
import type { CreateRole, Role } from "@/shared/types/role";

export class RoleService {
  static async getRoles() {
    return await $api.get<Role[]>("/roles");
  }

  static async getRoleByValue(value: string) {
    return await $api.get<Role>(`/roles/${value}`);
  }

  static async createRole(role: CreateRole) {
    return await $api.post<Role>("/roles", role);
  }
}
