import { PrismaClient } from "@prisma/client";
import { NotFoundException } from "@/errors/CustomExceptions";

const prisma = new PrismaClient();

export async function getProducts(
  page = 1,
  limit = 10,
  orderBy = "recent",
  keyword = ""
) {
  try {
    const where = keyword
      ? {
          OR: [
            { name: { contains: keyword, mode: "insensitive" } },
            { description: { contains: keyword, mode: "insensitive" } },
          ],
        }
      : {};

    const orderByClause =
      orderBy === "favorite"
        ? { favoriteCount: "desc" }
        : { createdAt: "desc" };

    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: orderByClause,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          owner: {
            select: { id: true, nickname: true },
          },
        },
      }),
      prisma.product.count({ where }),
    ]);

    console.log("DB에서온:", products);

    return {
      products,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      hasNextPage: page * limit < totalCount,
    };
  } catch (error) {
    console.error("Error in getProducts:", error);
    throw new Error("상품을 가져오는 중 오류가 발생했습니다.");
  }
}

export async function getTotalProductsCount(keyword = "") {
  const where = keyword
    ? {
        OR: [
          { name: { contains: keyword, mode: "insensitive" } },
          { description: { contains: keyword, mode: "insensitive" } },
        ],
      }
    : {};

  return prisma.product.count({ where });
}

export async function addProduct(productData) {
  return prisma.product.create({
    data: {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      owner: { connect: { id: Number(productData.user_id) } },
    },
    include: { owner: true },
  });
}

export async function getProductById(id) {
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
    include: { owner: true },
  });
  if (!product) {
    throw new NotFoundException("해당 제품을 찾을 수 없습니다.");
  }
  return product;
}

export async function updateProduct(id, productData) {
  const product = await prisma.product.update({
    where: { id: Number(id) },
    data: {
      name: productData.name,
      description: productData.description,
      price: productData.price,
    },
    include: { owner: true },
  });
  if (!product) {
    throw new NotFoundException("해당 제품을 찾을 수 없습니다.");
  }
  return product;
}

export async function deleteProduct(id) {
  await prisma.product.delete({
    where: { id: Number(id) },
  });
  return true;
}

export async function addToFavorites(userId, productId) {
  return prisma.user.update({
    where: { id: Number(userId) },
    data: {
      favorites: {
        connect: { id: Number(productId) },
      },
    },
  });
}

export async function removeFromFavorites(userId, productId) {
  const user = await prisma.user.update({
    where: { id: Number(userId) },
    data: {
      favorites: {
        disconnect: { id: Number(productId) },
      },
    },
  });
  if (!user) {
    throw new NotFoundException("해당 즐겨찾기 항목을 찾을 수 없습니다.");
  }
  return true;
}
