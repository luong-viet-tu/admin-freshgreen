interface ProductFavorite {
  product: string;
}

export interface FavoriteType {
  user: string;
  products: Array<ProductFavorite>;
}
