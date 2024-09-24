import { instance } from "./axios-codeit";

import { ORDER_BY_RECENT, ORDER_BY } from "@/app/constants/sort";

/** codeit POST /products */
export async function createProduct({
  images,
  tags,
  price,
  description,
  name,
}) {
  const path = "/products";
  const body = { images, tags, price, description, name };
  // token 필요

  //   {
  //     "createdAt": "2024-09-23T04:51:52.533Z",
  //     "favoriteCount": 0,
  //     "ownerId": 1,
  //     "images": [
  //       "https://example.com/..."
  //     ],
  //     "tags": [
  //       "전자제품"
  //     ],
  //     "price": 0,
  //     "description": "string",
  //     "name": "상품 이름",
  //     "id": 1
  //   }

  try {
    const res = await instance.post(path, body);
    return res.data;
  } catch (err) {}
}

/** codeit GET /products */
export async function getProducts({
  page = 1,
  pageSize = 10,
  orderBy = ORDER_BY[ORDER_BY_RECENT],
  keyword,
}) {
  const path = "/products";
  const params = {
    page,
    pageSize,
    orderBy,
    ...(keyword && { keyword }),
  };

  //   {
  //     "totalCount": 0,
  //     "list": [
  //       {
  //         "createdAt": "2024-09-23T05:02:40.056Z",
  //         "favoriteCount": 0,
  //         "ownerId": 1,
  //         "images": [
  //           "https://example.com/..."
  //         ],
  //         "tags": [
  //           "전자제품"
  //         ],
  //         "price": 0,
  //         "description": "string",
  //         "name": "상품 이름",
  //         "id": 1
  //       }
  //     ]
  //   }

  try {
    const res = await instance.get(path, { params });
    return res.data;
  } catch (err) {}
}

/** codeit GET /products/{productId} */
export async function getProduct({ productId }) {
  const path = `/products/${productId}`;
  // token 필요

  //   {
  //     "createdAt": "2024-09-23T05:16:26.648Z",
  //     "favoriteCount": 0,
  //     "ownerId": 1,
  //     "images": [
  //       "https://example.com/..."
  //     ],
  //     "tags": [
  //       "전자제품"
  //     ],
  //     "price": 0,
  //     "description": "string",
  //     "name": "상품 이름",
  //     "id": 1,
  //     "isFavorite": true
  //   }

  try {
    const res = await instance.get(path);
    return res.data;
  } catch (err) {}
}

/** codeit PATCH /products/{productId} */
export async function modifyProduct({
  productId,
  images,
  tags,
  price,
  description,
  name,
}) {
  const path = `/products/${productId}`;
  const body = {
    ...(images && { images }),
    ...(tags && { tags }),
    ...(price && { price }),
    ...(description && { description }),
    ...(name && { name }),
  };
  // token 필요

  //   {
  //     "createdAt": "2024-09-23T05:16:26.630Z",
  //     "favoriteCount": 0,
  //     "ownerId": 1,
  //     "images": [
  //       "https://example.com/..."
  //     ],
  //     "tags": [
  //       "전자제품"
  //     ],
  //     "price": 0,
  //     "description": "string",
  //     "name": "상품 이름",
  //     "id": 1,
  //     "isFavorite": true
  //   }

  try {
    const res = await instance.patch(path, body);
    return res.data;
  } catch (err) {}
}

/** codeit DELETE /products/{productId} */
export async function deleteProduct({ productId }) {
  const path = `/products/${productId}`;
  // token 필요

  try {
    const res = await instance.delete(path);
    return res.data;
  } catch (err) {}
}
