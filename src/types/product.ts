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
