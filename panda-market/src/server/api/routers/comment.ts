import { z } from "zod";
import {
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from "../../exceptions";
import { protectedProcedure, router } from "../trpc";

export const commentRouter = router({
  // 상품 댓글 작성
  createProductComment: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
        content: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { productId, content } = input;

      const product = await ctx.db.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        throw new NotFoundException("상품을 찾을 수 없습니다.");
      }

      try {
        return await ctx.db.comment.create({
          data: {
            content,
            productId,
            authorId: ctx.session.user.id,
          },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        });
      } catch (error) {
        throw new BadRequestException("댓글 작성에 실패했습니다.");
      }
    }),

  // 게시글 댓글 작성
  createPostComment: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
        content: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { postId, content } = input;

      const post = await ctx.db.post.findUnique({
        where: { id: postId },
      });

      if (!post) {
        throw new NotFoundException("게시글을 찾을 수 없습니다.");
      }

      try {
        return await ctx.db.comment.create({
          data: {
            content,
            postId,
            authorId: ctx.session.user.id,
          },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        });
      } catch (error) {
        throw new BadRequestException("댓글 작성에 실패했습니다.");
      }
    }),

  // 댓글 수정
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        content: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const comment = await ctx.db.comment.findUnique({
        where: { id: input.id },
      });

      if (!comment) {
        throw new NotFoundException("댓글을 찾을 수 없습니다.");
      }

      if (comment.authorId !== ctx.session.user.id) {
        throw new ForbiddenException("해당 댓글을 수정할 권한이 없습니다.");
      }

      try {
        return await ctx.db.comment.update({
          where: { id: input.id },
          data: { content: input.content },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        });
      } catch (error) {
        throw new BadRequestException("댓글 수정에 실패했습니다.");
      }
    }),

  // 댓글 삭제
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const comment = await ctx.db.comment.findUnique({
        where: { id: input },
      });

      if (!comment) {
        throw new NotFoundException("댓글을 찾을 수 없습니다.");
      }

      if (comment.authorId !== ctx.session.user.id) {
        throw new ForbiddenException("해당 댓글을 삭제할 권한이 없습니다.");
      }

      try {
        await ctx.db.comment.delete({
          where: { id: input },
        });
        return { success: true };
      } catch (error) {
        throw new BadRequestException("댓글 삭제에 실패했습니다.");
      }
    }),

  // 내가 작성한 댓글 목록
  getMyComments: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(50).default(20),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { page, limit } = input;
      const skip = (page - 1) * limit;
      const authorId = ctx.session.user.id;

      try {
        const [items, totalItems] = await Promise.all([
          ctx.db.comment.findMany({
            where: { authorId },
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
            include: {
              author: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
              product: {
                select: {
                  id: true,
                  title: true,
                },
              },
              post: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          }),
          ctx.db.comment.count({ where: { authorId } }),
        ]);

        return {
          items,
          totalItems,
          totalPages: Math.ceil(totalItems / limit),
          currentPage: page,
        };
      } catch (error) {
        throw new BadRequestException(
          "내 댓글 목록을 가져오는데 실패했습니다.",
        );
      }
    }),
});
