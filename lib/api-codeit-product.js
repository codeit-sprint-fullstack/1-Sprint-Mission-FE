import { instance } from "./axios-codeit";
import { instanceWithToken } from "./axios-codeit-token";

import { ORDER_BY_RECENT, ORDER_BY } from "@/app/constants/sort";

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
}) {
  const path = "/products";
  const body = { images, tags, price, description, name };

  try {
    const res = await instanceWithToken.post(path, body);
    return res.data;
  } catch (err) {}
}

/** codeit GET /products 
  return : {
    "totalCount": 0,
    "list": [
      {
        "createdAt": "2024-09-23T05:02:40.056Z",
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
    ]
  }
*/
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

  try {
    const res = await instance.get(path, { params });
    return res.data;
  } catch (err) {}
}

/** codeit GET /products/{productId} 
  return : {
    "createdAt": "2024-09-23T05:16:26.648Z",
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
    "id": 1,
    "isFavorite": true
  }
*/
export async function getProduct({ productId }) {
  const path = `/products/${productId}`;

  try {
    const res = await instance.get(path);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

/** codeit PATCH /products/{productId}
  return : {
    "createdAt": "2024-09-23T05:16:26.630Z",
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
    "id": 1,
    "isFavorite": true
  }
 */
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

  try {
    const res = await instanceWithToken.patch(path, body);
    return res.data;
  } catch (err) {}
}

/** codeit DELETE /products/{productId} */
export async function deleteProduct({ productId }) {
  const path = `/products/${productId}`;

  try {
    const res = await instanceWithToken.delete(path);
    return res.data;
  } catch (err) {}
}

/** codeit POST /products/{productId}/favorite 
  return : {
  "createdAt": "2024-09-27T06:30:18.474Z",
  "favoriteCount": 0,
  "ownerNickname": "string",
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
  "id": 1,
  "isFavorite": true
}
*/
export async function addFavoriteProduct(productId) {
  const path = `/products/${productId}/favorite`;

  try {
    const res = await instanceWithToken.post(path);
    return res.data;
  } catch (err) {}
}

/** codeit DELETE /products/{productId}/favorite
  return : {
  "createdAt": "2024-09-27T06:34:57.646Z",
  "favoriteCount": 0,
  "ownerNickname": "string",
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
  "id": 1,
  "isFavorite": true
}
 */
export async function removeFavoriteProduct(productId) {
  const path = `/products/${productId}/favorite`;

  try {
    const res = await instanceWithToken.delete(path);
    return res.data;
  } catch (err) {}
}
