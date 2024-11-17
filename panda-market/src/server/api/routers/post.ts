import { z } from "zod";
import {
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from "../../exceptions";
import { publicProcedure, protectedProcedure, router } from "../trpc";
import { Prisma } from "@prisma/client";
import { type Post, type Like } from "@prisma/client";

type PostWithRelations = Post & {
  author: {
    id: string;
    name: string | null;
    image: string | null;
  };
  _count: {
    comments: number;
    likes: number;
  };
};

type LikeWithPost = Like & {
  post: PostWithRelations;
};

export const postRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).max(100),
        content: z.string(),
        images: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        console.log("Creating post with:", {
          title: input.title,
          imagesCount: input.images.length,
          userId: ctx.session.user.id,
        });

        const result = await ctx.db.post.create({
          data: {
            ...input,
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
            _count: {
              select: {
                comments: true,
                likes: true,
              },
            },
          },
        });

        console.log("Post created:", {
          id: result.id,
          title: result.title,
          authorId: result.authorId,
        });

        return result;
      } catch (error) {
        if (error instanceof Error) {
          console.error("Post creation error:", {
            message: error.message,
            name: error.name,
          });
        } else {
          console.error("Unknown post creation error");
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2003") {
            throw new BadRequestException("해당 사용자를 찾을 수 없습니다.");
          }
        }

        throw new BadRequestException("게시글 등록에 실패했습니다.");
      }
    }),

  list: publicProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(50).default(20),
        search: z.string().optional(),
        authorId: z.string().optional(),
        sort: z.enum(["latest", "likes", "views"]).default("latest"),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { page, limit, search, authorId, sort } = input;
      const skip = (page - 1) * limit;

      const whereConditions: Prisma.PostWhereInput = {};

      if (search) {
        whereConditions.OR = [
          {
            title: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            content: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
        ];
      }

      if (authorId) {
        whereConditions.authorId = authorId;
      }

      const orderBy: Prisma.PostOrderByWithRelationInput[] =
        sort === "likes"
          ? [
              {
                likes: {
                  _count: "desc",
                },
              },
              {
                createdAt: "desc",
              },
            ]
          : sort === "views"
            ? [
                {
                  views: "desc",
                },
                {
                  createdAt: "desc",
                },
              ]
            : [
                {
                  createdAt: "desc",
                },
              ];

      try {
        const [items, totalItems] = await Promise.all([
          ctx.db.post.findMany({
            where: whereConditions,
            skip,
            take: limit,
            orderBy,
            include: {
              author: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
              _count: {
                select: {
                  comments: true,
                  likes: true,
                },
              },
            },
          }),
          ctx.db.post.count({ where: whereConditions }),
        ]);

        return {
          items,
          totalItems,
          totalPages: Math.ceil(totalItems / limit),
          currentPage: page,
        };
      } catch (error) {
        throw new BadRequestException("게시글 목록을 가져오는데 실패했습니다.");
      }
    }),

  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const post = await ctx.db.post.findUnique({
      where: { id: input },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });

    if (!post) {
      throw new NotFoundException("게시글을 찾을 수 없습니다.");
    }

    try {
      // 조회수 증가
      await ctx.db.post.update({
        where: { id: input },
        data: { views: { increment: 1 } },
      });
    } catch (error) {
      // 조회수 증가 실패는 무시
      console.error("Failed to increment view count:", error);
    }

    return post;
  }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1).max(100).optional(),
        content: z.string().optional(),
        images: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;

      const post = await ctx.db.post.findUnique({
        where: { id },
      });

      if (!post) {
        throw new NotFoundException("게시글을 찾을 수 없습니다.");
      }

      if (post.authorId !== ctx.session.user.id) {
        throw new ForbiddenException("해당 게시글을 수정할 권한이 없습니다.");
      }

      try {
        return await ctx.db.post.update({
          where: { id },
          data: updateData,
          include: {
            _count: {
              select: {
                comments: true,
                likes: true,
              },
            },
          },
        });
      } catch (error) {
        throw new BadRequestException("게시글 수정에 실패했습니다.");
      }
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db.post.findUnique({
        where: { id: input },
      });

      if (!post) {
        throw new NotFoundException("게시글을 찾을 수 없습니다.");
      }

      if (post.authorId !== ctx.session.user.id) {
        throw new ForbiddenException("해당 게시글을 삭제할 권한이 없습니다.");
      }

      try {
        await ctx.db.post.delete({
          where: { id: input },
        });
        return { success: true };
      } catch (error) {
        throw new BadRequestException("게시글 삭제에 실패했습니다.");
      }
    }),

  toggleLike: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input: postId }) => {
      const post = await ctx.db.post.findUnique({
        where: { id: postId },
      });

      if (!post) {
        throw new NotFoundException("게시글을 찾을 수 없습니다.");
      }

      const userId = ctx.session.user.id;

      try {
        const existingLike = await ctx.db.like.findUnique({
          where: {
            userId_postId: {
              userId,
              postId,
            },
          },
        });

        if (existingLike) {
          await ctx.db.like.delete({
            where: { id: existingLike.id },
          });
          return { liked: false };
        } else {
          await ctx.db.like.create({
            data: {
              userId,
              postId,
            },
          });
          return { liked: true };
        }
      } catch (error) {
        throw new BadRequestException("좋아요하기 처리에 실패했습니다.");
      }
    }),

  getLikedPosts: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(50).default(20),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { page, limit } = input;
      const skip = (page - 1) * limit;
      const userId = ctx.session.user.id;

      try {
        const [likes, totalItems] = await Promise.all([
          ctx.db.like.findMany({
            where: {
              userId,
              postId: { not: null },
            },
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
            include: {
              post: {
                include: {
                  author: {
                    select: {
                      id: true,
                      name: true,
                      image: true,
                    },
                  },
                  _count: {
                    select: {
                      comments: true,
                      likes: true,
                    },
                  },
                },
              },
            },
          }) as Promise<LikeWithPost[]>,
          ctx.db.like.count({
            where: {
              userId,
              postId: { not: null },
            },
          }),
        ]);

        const items = likes
          .filter((like): like is LikeWithPost => like.post !== null)
          .map((like) => like.post);

        return {
          items,
          totalItems,
          totalPages: Math.ceil(totalItems / limit),
          currentPage: page,
        };
      } catch (error) {
        throw new BadRequestException(
          "좋아요한 게시글 목록을 가져오는데 실패했습니다.",
        );
      }
    }),

  getLikeStatus: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      try {
        const like = await ctx.db.like.findUnique({
          where: {
            userId_postId: {
              userId,
              postId: input.postId,
            },
          },
        });

        return { liked: !!like };
      } catch (error) {
        throw new BadRequestException("좋아요 상태를 확인하는데 실패했습니다.");
      }
    }),
});
