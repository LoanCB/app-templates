export enum UserType {
  INTERNAL = "INTERNAL",
  API = "API",
}

export interface User {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  apiKey: string;
  password: string;
  type: UserType;
  isActive: boolean;
  token: string;
}

export interface UserDto {
  email: string;
  password: string;
}
