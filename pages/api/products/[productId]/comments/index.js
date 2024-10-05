import { PrismaClient } from "@prisma/client";
import { authenticateToken } from "@/lib/auth";
import { NotFoundException } from "@/errors/CustomExceptions";

const prisma = new PrismaClient();

async function getComments(req, res) {
  const { productId } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const comments = await prisma.comment.findMany({
      where: { productId: Number(productId) },
      include: {
        user: {
          select: { id: true, nickname: true },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalCount = await prisma.comment.count({
      where: { productId: Number(productId) },
    });

    res.status(200).json({
      comments,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      hasNextPage: page * limit < totalCount,
    });
  } catch (error) {
    console.error("Error in getComments:", error);
    res
      .status(500)
      .json({ message: "댓글을 가져오는 중 오류가 발생했습니다." });
  }
}

async function addComment(req, res) {
  const { productId } = req.query;
  const { content } = req.body;
  const userId = req.user.id;

  try {
    const newComment = await prisma.comment.create({
      data: {
        content,
        product: { connect: { id: Number(productId) } },
        user: { connect: { id: Number(userId) } },
      },
      include: {
        user: {
          select: { id: true, nickname: true },
        },
      },
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error in addComment:", error);
    res
      .status(500)
      .json({ message: "댓글을 추가하는 중 오류가 발생했습니다." });
  }
}

async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      await getComments(req, res);
      break;
    case "POST":
      await authenticateToken(addComment)(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default handler;
