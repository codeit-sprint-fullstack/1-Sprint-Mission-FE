import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  try {
    // 사용자 생성
    const user1 = await prisma.user.create({
      data: {
        email: "user1@example.com",
        password: await bcrypt.hash("password123", 10),
        nickname: "사용자1",
      },
    });

    const user2 = await prisma.user.create({
      data: {
        email: "user2@example.com",
        password: await bcrypt.hash("password123", 10),
        nickname: "사용자2",
      },
    });

    // 제품 생성
    const product1 = await prisma.product.create({
      data: {
        name: "제품 1",
        description: "이것은 제품 1의 설명입니다.",
        price: 10000,
        images: [
          "https://example.com/image1.jpg",
          "https://example.com/image2.jpg",
        ],
        tags: ["전자제품", "신제품"],
        ownerId: user1.id,
      },
    });

    const product2 = await prisma.product.create({
      data: {
        name: "제품 2",
        description: "이것은 제품 2의 설명입니다.",
        price: 20000,
        images: ["https://example.com/image3.jpg"],
        tags: ["가구", "인테리어"],
        ownerId: user2.id,
      },
    });

    // 게시글 생성
    const article1 = await prisma.article.create({
      data: {
        title: "첫 번째 게시글",
        content: "이것은 첫 번째 게시글의 내용입니다.",
        image: "https://example.com/article1.jpg",
        writerId: user1.id,
      },
    });

    const article2 = await prisma.article.create({
      data: {
        title: "두 번째 게시글",
        content: "이것은 두 번째 게시글의 내용입니다.",
        writerId: user2.id,
      },
    });

    // 댓글 생성
    await prisma.comment.create({
      data: {
        content: "제품 1에 대한 댓글입니다.",
        writerId: user2.id,
        productId: product1.id,
      },
    });

    await prisma.comment.create({
      data: {
        content: "게시글 1에 대한 댓글입니다.",
        writerId: user2.id,
        articleId: article1.id,
      },
    });

    // 즐겨찾기 추가
    await prisma.product.update({
      where: { id: product1.id },
      data: {
        favoritedBy: {
          connect: { id: user2.id },
        },
        favoriteCount: {
          increment: 1,
        },
      },
    });

    console.log("시드완");
  } catch (error) {
    console.error("시딩중오류:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
