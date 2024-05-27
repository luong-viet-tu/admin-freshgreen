import { UserType } from "./userType";

export interface ShopType {
  _id?: string;
  user: string | UserType;
  name: string;
  image?: string;
  description: string;
  bio: string;
  startYear: number;
  products?: Array<string>;
  star?: {
    count: number;
  };
  ratings?: Array<{
    stars: number;
    count: number;
  }>;
  followers?: Array<string>;
  createdAt?: string;
  updatedAt?: string;
}

export const InitialShop = {
  name: "",
  image: "",
  user: "",
  description: "",
  bio: "",
  startYear: 1978,
  products: [],
  star: {
    count: 0,
  },
  ratings: [],
  followers: [],
};
