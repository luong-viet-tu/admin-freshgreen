import { UserRole } from "../types/userType";

export const allowEditingProducts = [
  UserRole.admin,
  UserRole.superadmin,
  UserRole.producer,
  UserRole.staff,
];
export const allowDeletingProducts = [
  UserRole.admin,
  UserRole.superadmin,
  UserRole.producer,
];
export const allowCreateShop = [
  UserRole.admin,
  UserRole.superadmin,
  UserRole.producer,
];
export const allowDeleteCategory = [UserRole.admin, UserRole.superadmin];
export const allowDeleteTag = [UserRole.admin, UserRole.superadmin];
