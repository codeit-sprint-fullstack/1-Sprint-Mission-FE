import { z } from "zod";
import {
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from "../../exceptions";
import { publicProcedure, protectedProcedure, router } from "../trpc";
import { Status, Prisma } from "@prisma/client";
import { type Product, type Like } from "@prisma/client";

type ProductWithRelations = Product & {
  seller: {
    id: string;
    name: string | null;
    image: string | null;
  };
  _count: {
    comments: number;
    likes: number;
  };
};

type LikeWithProduct = Like & {
  product: ProductWithRelations;
};

export const productRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).max(100),
        description: z.string(),
        price: z.number().positive(),
        images: z.array(z.string()),
        tags: z.array(z.string()).default([]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        console.log("Creating product with:", {
          title: input.title,
          price: input.price,
          imagesCount: input.images.length,
          userId: ctx.session.user.id,
          tags: z.array(z.string()),
        });

        const result = await ctx.db.product.create({
          data: {
            ...input,
            sellerId: ctx.session.user.id,
            status: "AVAILABLE",
          },
          include: {
            seller: {
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

        console.log("Product created:", {
          id: result.id,
          title: result.title,
          sellerId: result.sellerId,
        });

        return result;
      } catch (error) {
        if (error instanceof Error) {
          console.error("Product creation error:", {
            message: error.message,
            name: error.name,
          });
        } else {
          console.error("Unknown product creation error");
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2003") {
            throw new BadRequestException("해당 사용자를 찾을 수 없습니다.");
          }
        }

        throw new BadRequestException("상품 등록에 실패했습니다.");
      }
    }),

  list: publicProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(50).default(20),
        search: z.string().optional(),
        status: z.nativeEnum(Status).optional(),
        sellerId: z.string().optional(),
        sort: z.enum(["latest", "likes"]).default("latest"),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { page, limit, search, status, sellerId, sort } = input;
      const skip = (page - 1) * limit;

      const whereConditions: Prisma.ProductWhereInput = {};

      if (search) {
        whereConditions.OR = [
          {
            title: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            description: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
        ];
      }

      if (status) {
        whereConditions.status = status;
      }

      if (sellerId) {
        whereConditions.sellerId = sellerId;
      }

      const orderBy: Prisma.ProductOrderByWithRelationInput[] =
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
          : [
              {
                createdAt: "desc",
              },
            ];

      try {
        const [items, totalItems] = await Promise.all([
          ctx.db.product.findMany({
            where: whereConditions,
            skip,
            take: limit,
            orderBy,
            include: {
              seller: {
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
          ctx.db.product.count({ where: whereConditions }),
        ]);

        return {
          items,
          totalItems,
          totalPages: Math.ceil(totalItems / limit),
          currentPage: page,
        };
      } catch (error) {
        throw new BadRequestException("상품 목록을 가져오는데 실패했습니다.");
      }
    }),

  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const product = await ctx.db.product.findUnique({
      where: { id: input },
      include: {
        seller: {
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

    if (!product) {
      throw new NotFoundException("상품을 찾을 수 없습니다.");
    }

    try {
      // 조회수 증가
      await ctx.db.product.update({
        where: { id: input },
        data: { views: { increment: 1 } },
      });
    } catch (error) {
      // 조회수 증가 실패는 무시
      console.error("Failed to increment view count:", error);
    }

    return product;
  }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1).max(100).optional(),
        description: z.string().optional(),
        price: z.number().positive().optional(),
        images: z.array(z.string()).optional(),
        status: z.enum([Status.AVAILABLE, Status.SOLD]).optional(),
        tags: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;

      const product = await ctx.db.product.findUnique({
        where: { id },
      });

      if (!product) {
        throw new NotFoundException("상품을 찾을 수 없습니다.");
      }

      if (product.sellerId !== ctx.session.user.id) {
        throw new ForbiddenException("해당 상품을 수정할 권한이 없습니다.");
      }

      try {
        return await ctx.db.product.update({
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
        throw new BadRequestException("상품 수정에 실패했습니다.");
      }
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.db.product.findUnique({
        where: { id: input },
      });

      if (!product) {
        throw new NotFoundException("상품을 찾을 수 없습니다.");
      }

      if (product.sellerId !== ctx.session.user.id) {
        throw new ForbiddenException("해당 상품을 삭제할 권한이 없습니다.");
      }

      try {
        await ctx.db.product.delete({
          where: { id: input },
        });
        return { success: true };
      } catch (error) {
        throw new BadRequestException("상품 삭제에 실패했습니다.");
      }
    }),

  toggleLike: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input: productId }) => {
      const product = await ctx.db.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        throw new NotFoundException("상품을 찾을 수 없습니다.");
      }

      const userId = ctx.session.user.id;

      try {
        const existingLike = await ctx.db.like.findUnique({
          where: {
            userId_productId: {
              userId,
              productId,
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
              productId,
            },
          });
          return { liked: true };
        }
      } catch (error) {
        throw new BadRequestException("좋아요하기 처리에 실패했습니다.");
      }
    }),

  getLikeStatus: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { productId } = input;
      const userId = ctx.session.user.id;

      try {
        const like = await ctx.db.like.findUnique({
          where: {
            userId_productId: {
              userId,
              productId,
            },
          },
        });

        return { liked: !!like };
      } catch (error) {
        throw new Error("좋아요 상태를 확인하는데 실패했습니다.");
      }
    }),

  getLikedProducts: protectedProcedure
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
              productId: { not: null },
            },
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
            include: {
              product: {
                include: {
                  seller: {
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
          }) as Promise<LikeWithProduct[]>,
          ctx.db.like.count({
            where: {
              userId,
              productId: { not: null },
            },
          }),
        ]);

        const items = likes
          .filter((like): like is LikeWithProduct => like.product !== null)
          .map((like) => like.product);

        return {
          items,
          totalItems,
          totalPages: Math.ceil(totalItems / limit),
          currentPage: page,
        };
      } catch (error) {
        throw new BadRequestException(
          "좋아요한 상품 목록을 가져오는데 실패했습니다.",
        );
      }
    }),
});
