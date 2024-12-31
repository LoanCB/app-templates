import { Role } from "./role.types";

export enum UserType {
  INTERNAL = "INTERNAL",
  API = "API",
}

export interface LoggedUser {
  accessToken: string;
  user: Omit<User, "accessToken">;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  accessToken: string;
  role: Role;
}

export interface UserDto {
  email: string;
  password: string;
}
