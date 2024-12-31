import { User } from 'src/users/entities/users.entity';
import { RoleType } from 'src/users/types/role-type';

export interface UserWithRole extends Pick<User, 'id' | 'firstName' | 'lastName' | 'email'> {
  role: {
    id: number;
    title: string;
    type: RoleType;
  };
}

export interface ReturnUser {
  accessToken: string;
  user: UserWithRole;
}
