import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function saveImage(imageUrl, entityType, entityId) {
  return prisma.image.create({
    data: {
      url: imageUrl,
      entityType,
      entityId: Number(entityId),
    },
  });
}

export async function getImagesByEntity(entityType, entityId) {
  return prisma.image.findMany({
    where: {
      entityType,
      entityId: Number(entityId),
    },
  });
}

export async function deleteImage(id) {
  await prisma.image.delete({
    where: { id: Number(id) },
  });
  return true;
}
