export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
  favoriteCount: number;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
  ownerId: number;
  ownerNickname: string;
  favorites?: { id: number }[];
}

export interface FetchProductsParams {
  pageSize: number;
  page: number;
  keyword?: string;
  orderBy?: string;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  images: string[];
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
    email: string;
    image: string;
  };
  isLiked: boolean;
}

export interface UploadedImage {
  isExisting: boolean;
  previewUrl: string;
  file: File | null;
  isDeleted: boolean; // 추가된 속성
}

export interface CustomFormData {
  title: string;
  content: string;
  images: UploadedImage[];
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  writer?: {
    id: number;
    nickname: string;
    image: string;
  };
}

export interface UserProfile {
  id?: number;
  email?: string;
  nickname?: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface LoginFormInputs {
  email: string;
  password: string;
}

export interface SignUpFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
}

export interface ModalProps {
  text: string;
  onConfirm?: () => void;
  onClose?: () => void;
}

export interface FormValues {
  productName: string;
  productIntro: string;
  productPrice: string;
}
