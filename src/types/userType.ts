import { RoleType, initialRole } from "./roleType";

interface UserAddress {
  city: string;
  district: string;
  ward: string;
  street: string;
  more: string;
}

export enum UserRole {
  user = "user",
  staff = "staff",
  producer = "producer",
  admin = "admin",
  superadmin = "superadmin",
}

interface FullnameOfUser {
  firstname: string;
  lastname: string;
}

export interface UserType {
  _id?: string;
  fullname: FullnameOfUser;
  email: string;
  phone: string;
  username: string;
  password?: string;
  avatar?: string;
  address: UserAddress;
  permissions?: RoleType;
  following?: Array<string>;
  createdAt?: string;
  updatedAt?: string;
}

export const InitialUser: UserType = {
  fullname: {
    firstname: "",
    lastname: "",
  },
  email: "",
  phone: "",
  username: "",
  password: "",
  avatar: "",
  address: {
    city: "",
    district: "",
    ward: "",
    street: "",
    more: "",
  },
  permissions: initialRole,
  following: [""],
};

export const fullnameOfUser = ({ firstname, lastname }: FullnameOfUser) => {
  if (!firstname) return "Anonymous";
  if (!lastname) return "Anonymous";
  return `${firstname} ${lastname}`;
};

export const addressOfUser = (InitialUserAddress: UserAddress) => {
  if (InitialUserAddress?.city === undefined || InitialUserAddress?.city === "")
    return null;
  return `${InitialUserAddress?.more} ${InitialUserAddress?.street} ${InitialUserAddress?.ward} ${InitialUserAddress?.district} ${InitialUserAddress?.city}`;
};

export const phoneOfUser = (phone: string) => {
  if (phone === undefined) return "";
  if (phone.includes("social")) return "";
  return phone;
};
