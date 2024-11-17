export enum Status {
  AVAILABLE = "AVAILABLE",
  SOLD = "SOLD",
}

export interface User {
  id: string;
  name?: string;
  email: string;
  password: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  status: Status;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  sellerId: string;
  seller?: User;
  _count?: {
    comments: number;
    likes: number;
  };
}
export interface Like {
  id: string;
  createdAt: Date;
  userId: string;
  productId?: string;
  postId?: string;
  product?: Product;
  post?: Post;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  images: string[];
  views: number;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author?: User;
  _count?: {
    comments: number;
    likes: number;
  };
}

export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author?: User;
  productId?: string;
  postId?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}
