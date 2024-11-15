import { createAxiosInstance } from "./axios-token";
// import { cookies } from "next/headers";
import { parse } from "cookie";
import axios from "axios";

import { ORDER_BY_RECENT, ORDER_BY } from "src/app/constants/sort";

/** codeit POST /products
  return : {
    "createdAt": "2024-09-23T04:51:52.533Z",
    "favoriteCount": 0,
    "ownerId": 1,
    "images": [
      "https://example.com/..."
    ],
    "tags": [
      "전자제품"
    ],
    "price": 0,
    "description": "string",
    "name": "상품 이름",
    "id": 1
  }
 */
export async function createProduct({
  images,
  tags,
  price,
  description,
  name,
}: {
  images: string[];
  tags: string[];
  price: number;
  description: string;
  name: string;
}) {
  const path = "/products";
  const body = { images, tags, price, description, name };
  const instance = createAxiosInstance();

  try {
    const res = await instance.post(path, body);

    return res.data;
  } catch (err) {}
}

/** codeit GET /products
 */
async function getAccessToken(): Promise<string | null> {
  if (typeof window === "undefined") {
    // SSR: Use next/headers
    const { cookies } = await import("next/headers"); // Dynamically import to avoid client-side issues
    const cookieStore = await cookies();
    return cookieStore.get("codeit-access-token")?.value || null;
  } else {
    // CSR: Use document.cookie
    const cookies = parse(document.cookie);
    return cookies["codeit-access-token"] || null;
  }
}

// Main API function
const baseURL = process.env.NEXT_PUBLIC_SPRINT_BASE_URL || "";

interface GetProductsParams {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  keyword?: string;
}

export async function getProducts({
  page = 1,
  pageSize = 10,
  orderBy,
  keyword,
}: GetProductsParams) {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const token = await getAccessToken(); // Get token based on environment

  try {
    const res = await instance.get("/products", {
      params: { page, pageSize, orderBy, ...(keyword && { keyword }) },
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

/** codeit GET /products/{productId}
 */
export async function getProduct({ productId }: { productId: string }) {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const token = await getAccessToken(); // Get token based on environment

  try {
    const res = await instance.get(`/products/${productId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

/** codeit PATCH /products/{productId}
 */
export async function modifyProduct({
  productId,
  images,
  tags,
  price,
  description,
  name,
}: {
  productId: string;
  images: string[];
  tags: string[];
  price: number;
  description: string;
  name: string;
}) {
  try {
    const path = `/products/${productId}`;
    const body = {
      ...(images && { images }),
      ...(tags && { tags }),
      ...(price && { price }),
      ...(description && { description }),
      ...(name && { name }),
    };
    const instance = createAxiosInstance();
    const res = await instance.patch(path, body);

    return res.data;
  } catch (err) {}
}

/** codeit DELETE /products/{productId} */
export async function deleteProduct(productId: string) {
  try {
    const path = `/products/${productId}`;
    const instance = createAxiosInstance();
    const res = await instance.delete(path);

    return res.data;
  } catch (err) {
    throw err;
  }
}

/** codeit POST /products/{productId}/favorite
 */
export async function addFavoriteProduct(productId: string) {
  try {
    const path = `/products/${productId}/favorite`;
    const instance = createAxiosInstance();
    const res = await instance.post(path);

    return res.data;
  } catch (err) {}
}

/** codeit DELETE /products/{productId}/favorite
 */
export async function removeFavoriteProduct(productId: string) {
  try {
    const path = `/products/${productId}/favorite`;
    const instance = createAxiosInstance();
    const res = await instance.delete(path);

    return res.data;
  } catch (err) {}
}
