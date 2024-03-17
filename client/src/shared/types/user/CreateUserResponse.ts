export interface CreateUserErrorResponse {
  errors: {
    field:
      | "private"
      | "email"
      | "info"
      | `root.${string}`
      | "root"
      | "private.repeatPassword"
      | "private.password"
      | "info.lastName"
      | "info.firstName";
    message: string;
  }[];
}
