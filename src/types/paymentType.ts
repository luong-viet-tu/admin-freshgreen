export enum StatusPayment {
  pending,
  falure,
  success,
}

export interface PaymentType {
  user: string;
  status: "pending" | "falure" | "success";
  method: string;
  amount: number;
  transactionId: string;
}
