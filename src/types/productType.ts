import { TagType } from "./tagType";

interface RatingsType {
  stars: number;
  count: number;
}

interface ShopType {
  _id?: string;
  name: string;
  user?: {
    _id?: string;
    avatar: string;
  };
}
export interface ProductType {
  _id?: string;
  images: string[];
  title: string;
  description: string;
  price: number;
  lastPrice?: number;
  discount: number;
  star?: {
    count: number;
  };
  sold?: number;
  ratings?: Array<RatingsType>;
  averageStarRating?: number;
  category: string;
  tags: Array<TagType>;
  unit: string;
  status: boolean;
  quantity: number;
  currentQuantity?: number;
  brand: string;
  shop: ShopType;
  views?: number;
  comments?: Array<string>;
  createdAt?: string;
  updatedAt?: string;
}

export type NewProductType = Omit<ProductType, "shop"> & {
  shop: string;
};

export const InitialProduct: ProductType = {
  _id: "",
  images: [],
  title: "",
  description: "",
  price: 0,
  unit: "",
  lastPrice: 0,
  discount: 0,
  star: {
    count: 0,
  },
  status: false,
  sold: 0,
  ratings: [],
  averageStarRating: 0,
  category: "",
  tags: [],
  quantity: 0,
  currentQuantity: 0,
  brand: "",
  shop: {
    name: "",
  },
  comments: [],
  createdAt: "",
  updatedAt: "",
};
