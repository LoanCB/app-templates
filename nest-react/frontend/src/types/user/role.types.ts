export enum RoleType {
  ADMINISTRATOR = "ADMINISTRATOR",
  MANAGER = "MANAGER",
  READ_ONLY = "READ_ONLY",
}

export interface Role {
  title: string;
  type: RoleType;
  description: string;
}
