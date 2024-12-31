export enum RoleType {
  ADMINISTRATOR = "ADMINISTRATOR",
  MANAGER = "MANAGER",
  READ_ONLY = "READ_ONLY",
}

export interface Role {
  id: number;
  title: string;
  type: RoleType;
}
