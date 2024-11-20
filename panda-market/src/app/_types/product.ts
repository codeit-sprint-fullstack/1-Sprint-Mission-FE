import { Status } from "@prisma/client";

export interface ProductFormData {
  title: string;
  description: string;
  price: number;
  images: string[];
  status?: Status;
  tags: string[];
}

export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  authorId: string;
  author: {
    id: string;
    name: string | null;
    image: string | null;
  };
}

export interface ProductDetail {
  id: string;
  title: string;
  description: string;
  price: number;
  status: Status;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  views: number;
  tags: string[];
  sellerId: string;
  seller: {
    id: string;
    name: string | null;
    image: string | null;
  };
  comments: Comment[];
  _count: {
    comments: number;
    likes: number;
  };
}

export interface ProductUpdateInput {
  id: string;
  title?: string;
  description?: string;
  price?: number;
  images?: string[];
  status?: Status;
}

export interface CommentCreateInput {
  productId: string;
  content: string;
}

export interface CommentUpdateInput {
  commentId: string;
  content: string;
}
export interface ProductUpdateInput extends Partial<ProductFormData> {
  id: string; // tags 등은 상품 업데이트 시 선택사항일 수도, 추가해야할듯? (아직) -Check-
}
