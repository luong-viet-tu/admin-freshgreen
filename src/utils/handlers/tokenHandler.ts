export const createToken = (token: string): void =>
  localStorage.setItem("token", token);

export const getToken = (): string | null => localStorage.getItem("token");

export const removeToken = (): void => localStorage.removeItem("token");
