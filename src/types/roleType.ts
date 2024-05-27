export enum RoleEnum {
  Create = "create",
  Update = "update",
  Delete = "delete",
  View = "view",
}

export interface RoleType {
  _id?: string;
  name: string;
  roles: Array<RoleEnum>;
  createdAt?: string;
  updatedAt?: string;
}

export const initialRole: RoleType = {
  _id: "",
  name: "",
  roles: [RoleEnum.View],
  createdAt: "",
  updatedAt: "",
};
