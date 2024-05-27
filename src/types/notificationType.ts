import { UserType } from "./userType";

export interface NotificationType {
  _id?: string;
  auth: UserType | string;
  title: string;
  description: string;
  path: string;
  seen?: boolean;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
}
