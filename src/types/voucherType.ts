export interface VoucherType {
  _id?: string;
  voucher: string;
  discount: number;
  author: string;
  lastDate: string;
  createdAt?: string;
  updatedAt?: string;
}

export const initialVoucher: VoucherType = {
  _id: "",
  voucher: "",
  discount: 0,
  author: "",
  lastDate: "",
  createdAt: "",
  updatedAt: "",
};
