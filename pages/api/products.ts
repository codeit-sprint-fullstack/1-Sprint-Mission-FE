import instance from "./httpClient";

interface Params {
  [key: string]: string | number;
}

interface Product {
  id: string;
  name: string;
  createAt: Date;
  updateAt: Date;
  user: { id: string; nickname: string };
  userId: string;
  tags: string[];
  content: string;
}

interface UpdateItem {
  name?: string;
  tags?: string[];
  content?: string;
}

export async function getProducts(params: Params = {}): Promise<Product[]> {
  const res = await instance.get<Product[]>("/products", { params });
  return res.data;
}

export async function getProduct(id: string): Promise<Product> {
  const res = await instance.get<Product>(`/products/${id}`);
  return res.data;
}

export async function updateProduct(
  id: string,
  item: UpdateItem
): Promise<Product> {
  const res = await instance.patch(`/products/${id}`, item);
  return res.data;
}

export async function createProduct(item: UpdateItem): Promise<Product> {
  const res = await instance.post<Product>(`/products`, item);
  return res.data;
}

export async function deleteProduct(id: string): Promise<number> {
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
