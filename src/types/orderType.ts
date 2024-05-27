import { ProductCartType } from "./cartType";
import { InitialUser, UserType } from "./userType";

export enum StatusOrder {
  pending,
  success,
  cancel,
  refuse,
  default,
}

interface VoucherUsedType {
  voucher: string;
  discount: number;
}

export enum PayMethod {
  payNow = "payNow",
  lastPay = "lastPay",
}

export enum PayStatus {
  pending = "pending",
  falure = "falure",
  success = "success",
}
export interface PayType {
  method: PayMethod;
  amount: number;
  status: PayStatus;
}

export enum OrderStatus {
  done = "done",
  success = "success",
  pending = "pending",
  access = "access",
  refuse = "refuse",
}
export interface OrderItemType {
  _id?: string;
  products: ProductCartType[];
  totalPrice: number;
  voucherUsed: VoucherUsedType;
  status: OrderStatus;
  message?: string;
  pay: PayType;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OrderType {
  _id?: string;
  user: UserType;
  order: OrderItemType;
}

export const initialDataOrder = {
  user: InitialUser,
  order: {},
};
