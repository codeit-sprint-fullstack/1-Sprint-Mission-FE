import { PrismaClient } from "@prisma/client";
import { NotFoundException } from "@/errors/CustomExceptions";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function getUserById(id) {
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  });
  if (!user) {
    throw new NotFoundException("사용자를 찾을 수 없습니다.");
  }
  return user;
}

export async function updateUser(id, userData) {
  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: {
      nickname: userData.nickname,
    },
  });
  if (!user) {
    throw new NotFoundException("사용자를 찾을 수 없습니다.");
  }
  return user;
}

export async function updateUserPassword(id, newPassword) {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: {
      password: hashedPassword,
    },
    select: { id: true },
  });
  if (!user) {
    throw new NotFoundException("사용자를 찾을 수 없습니다.");
  }
  return user;
}

export async function getUserProducts(userId) {
  return prisma.product.findMany({
    where: { ownerId: Number(userId) },
    orderBy: { createdAt: "desc" },
  });
}

export async function getUserFavorites(userId) {
  return prisma.product.findMany({
    where: {
      favoritedBy: {
        some: { id: Number(userId) },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}
