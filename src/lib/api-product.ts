import { instance } from "./axios-token";
// import { cookies } from "next/headers";
import { parse } from "cookie";
import axios from "axios";
import { getAccessToken } from "./token-codeit";

import { ORDER_BY_RECENT, ORDER_BY } from "src/app/constants/sort";

/**
 * codeit POST /products
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

  try {
    const res = await instance.post(path, body);

    return res.data;
  } catch (err) {}
}

/**
 * codeit GET /products
 */

const baseURL = process.env.NEXT_PUBLIC_SPRINT_BASE_URL || "";

interface GetProductsParams {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  keyword?: string | null;
}

export async function getProducts({
  page = 1,
  pageSize = 10,
  orderBy = ORDER_BY[ORDER_BY_RECENT],
  keyword = null,
}: GetProductsParams) {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const token = await getAccessToken();

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

/**
 * codeit GET /products/{productId}
 */
export async function getProduct({ productId }: { productId: string }) {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const token = await getAccessToken();

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

/**
 * codeit PATCH /products/{productId}
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
    const res = await instance.patch(path, body);

    return res.data;
  } catch (err) {}
}

/** codeit DELETE /products/{productId} */
export async function deleteProduct(productId: string) {
  try {
    const path = `/products/${productId}`;
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
    const res = await instance.post(path);

    return res.data;
  } catch (err) {}
}

/** codeit DELETE /products/{productId}/favorite
 */
export async function removeFavoriteProduct(productId: string) {
  try {
    const path = `/products/${productId}/favorite`;
    const res = await instance.delete(path);

    return res.data;
  } catch (err) {}
}
