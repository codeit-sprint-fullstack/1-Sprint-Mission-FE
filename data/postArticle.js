import { PrismaClient } from "@prisma/client";
import {
  NotFoundException,
  CommonException,
  HttpStatus,
  ExceptionCode,
  ExceptionIdentifier,
} from "@/errors";

const prisma = new PrismaClient();

export async function getArticles(page = 0, limit = 10) {
  try {
    const articles = await prisma.article.findMany({
      skip: page * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: { writer: true },
    });
    return articles;
  } catch (error) {
    throw new CommonException({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      code: ExceptionCode.DATABASE_ERROR,
      message: `게시글 조회 중 오류가 발생했습니다: ${error.message}`,
      identifier: ExceptionIdentifier.SYSTEM_ERROR,
      origin: "getArticles",
      reason: "데이터베이스 쿼리 실행 중 오류",
    });
  }
}

export async function getTotalArticlesCount() {
  try {
    const count = await prisma.article.count();
    return count;
  } catch (error) {
    throw new CommonException({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      code: ExceptionCode.DATABASE_ERROR,
      message: `게시글 수 조회 중 오류가 발생했습니다: ${error.message}`,
      identifier: ExceptionIdentifier.SYSTEM_ERROR,
      origin: "getTotalArticlesCount",
      reason: "데이터베이스 쿼리 실행 중 오류",
    });
  }
}

export async function addArticle(articleData) {
  try {
    const article = await prisma.article.create({
      data: {
        title: articleData.title,
        content: articleData.content,
        writer: { connect: { id: articleData.userId } },
      },
    });
    return article;
  } catch (error) {
    throw new CommonException({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      code: ExceptionCode.DATABASE_ERROR,
      message: `게시글 추가 중 오류가 발생했습니다: ${error.message}`,
      identifier: ExceptionIdentifier.SYSTEM_ERROR,
      origin: "addArticle",
      reason: "데이터베이스 쿼리 실행 중 오류",
    });
  }
}

export async function getArticleById(id) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: Number(id) },
      include: { writer: true },
    });
    if (!article) {
      throw new NotFoundException("해당 게시글을 찾을 수 없습니다.");
    }
    return article;
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw error;
    }
    throw new CommonException({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      code: ExceptionCode.DATABASE_ERROR,
      message: `게시글 조회 중 오류가 발생했습니다: ${error.message}`,
      identifier: ExceptionIdentifier.SYSTEM_ERROR,
      origin: "getArticleById",
      reason: "데이터베이스 쿼리 실행 중 오류",
    });
  }
}

export async function updateArticle(id, articleData) {
  try {
    const article = await prisma.article.update({
      where: { id: Number(id) },
      data: {
        title: articleData.title,
        content: articleData.content,
      },
    });
    if (!article) {
      throw new NotFoundException("해당 게시글을 찾을 수 없습니다.");
    }
    return article;
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw error;
    }
    throw new CommonException({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      code: ExceptionCode.DATABASE_ERROR,
      message: `게시글 수정 중 오류가 발생했습니다: ${error.message}`,
      identifier: ExceptionIdentifier.SYSTEM_ERROR,
      origin: "updateArticle",
      reason: "데이터베이스 쿼리 실행 중 오류",
    });
  }
}

export async function deleteArticle(id) {
  try {
    await prisma.article.delete({
      where: { id: Number(id) },
    });
    return true;
  } catch (error) {
    throw new CommonException({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      code: ExceptionCode.DATABASE_ERROR,
      message: `게시글 삭제 중 오류가 발생했습니다: ${error.message}`,
      identifier: ExceptionIdentifier.SYSTEM_ERROR,
      origin: "deleteArticle",
      reason: "데이터베이스 쿼리 실행 중 오류",
    });
  }
}
