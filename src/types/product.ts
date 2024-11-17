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

export interface ProductPreviewFavoriteProps {
  productId: string;
  isFavorite: boolean;
  favriteCount: number;
}

export interface ProductPreviewImageProps {
  imgUrl: string;
}
