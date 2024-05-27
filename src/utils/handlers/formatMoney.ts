export const formattedAmount = (amount: number) => {
  const money = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
  return money;
};
