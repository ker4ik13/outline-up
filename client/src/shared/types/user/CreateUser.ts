export interface CreateUserDto {
  email: string;
  info: {
    firstName: string;
    lastName: string;
  };
  private: {
    password: string;
  };
}
