import { Entity } from "@/utils/interface/defaultEntity";
import instance from "./httpClient";
import { User } from "@/utils/interface/User";

interface Params {
  [key: string]: string | number;
}

interface Product extends Entity {
  name: string;
  owner: User;
  ownerId: string;
  tags: string[];
  description: string;
  price: number;
  favoriteCount: number;
  images: string[];
  isFavorite: boolean;
}

interface ItemValues {
  name?: string;
  tags?: string[];
  price?: number;
  description?: string;
  images?: File[];
}

interface ResponseData {
  list: Product[];
  totalCount: number;
}

export async function getProducts(params: Params = {}): Promise<ResponseData> {
  const res = await instance.get<ResponseData>("/products", { params });
  return res.data;
}

export async function getProduct<T>(id: T): Promise<Product> {
  const res = await instance.get<Product>(`/products/${id}`);
  return res.data;
}

export async function updateProduct(
  id: string,
  item: ItemValues
): Promise<Product> {
  const res = await instance.patch<Product>(`/products/${id}`, item);
  return res.data;
}

export async function createProduct(item: FormData): Promise<Product> {
  const res = await instance.post<Product>(`/products`, item);
  return res.data;
}

export async function deleteProduct<T>(id: T): Promise<number> {
  const res = await instance.delete(`/products/${id}`);
  return res.status;
}

export async function likeProduct(id: string): Promise<Product> {
  const res = await instance.post<Product>(`/products/${id}/favorite`);
  return res.data;
}

export async function unlikeProduct(id: string): Promise<Product> {
  const res = await instance.delete<Product>(`/products/${id}/favorite`);
  return res.data;
}
