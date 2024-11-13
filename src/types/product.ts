export interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  favoriteCount: number;
  images: string[];
  tags: string[];
  ownerId: string;
  ownerImage: string;
  ownerNickname: string;
  isFavorite: boolean;
  createdAt: string;
}

export interface ProductListData {
  totalCount: number;
  products: ProductData[];
}

export interface ProductListProps {
  initList: ProductData[];
  initTotalCount: number;
}

export interface BestProductPreviewProps {
  img: string;
  imgClass: string;
  name: string;
  price: number;
  favorite?: boolean;
}

export interface FleaMarketDetailProps {
  initList: ProductData[];
  initTotalCount: number;
}

export interface ProductPreviewProps {
  productId: string;
  img: string;
  name: string;
  price: number;
  isFavorite?: boolean;
  favoriteCount: number;
}

export interface ProductPreviewFavoriteProps {
  productId: string;
  isFavorite: boolean;
  favriteCount: number;
}

export interface ProductPreviewImageProps {
  imgUrl: string;
}
