import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const chatRouter = router({
  getMessages: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        limit: z.number().min(1).max(100).optional(),
        cursor: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const { userId } = input;

      const messages = await ctx.db.message.findMany({
        take: limit + 1,
        where: {
          OR: [
            {
              AND: [{ senderId: ctx.user.id }, { recipientId: userId }],
            },
            {
              AND: [{ senderId: userId }, { recipientId: ctx.user.id }],
            },
          ],
        },
        orderBy: {
          createdAt: "asc",
        },
        cursor: input.cursor ? { id: input.cursor } : undefined,
        include: {
          sender: true,
          recipient: true,
        },
      });

      let nextCursor: typeof input.cursor | undefined = undefined;
      if (messages.length > limit) {
        const nextItem = messages.pop();
        nextCursor = nextItem!.id;
      }

      return {
        messages,
        nextCursor,
      };
    }),

  sendMessage: protectedProcedure
    .input(
      z.object({
        recipientId: z.string(),
        content: z.string().min(1, "Message cannot be empty"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        if (!ctx.session?.user?.id) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Not authenticated",
          });
        }

        // 받는 사람이 존재하는지 확인
        const recipient = await ctx.db.user.findUnique({
          where: { id: input.recipientId },
        });

        if (!recipient) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Recipient not found",
          });
        }

        // 메시지 생성
        const message = await ctx.db.message.create({
          data: {
            content: input.content,
            senderId: ctx.session.user.id,
            recipientId: input.recipientId,
          },
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
            recipient: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        });

        return {
          id: message.id,
          content: message.content,
          createdAt: message.createdAt,
          senderId: message.senderId,
          recipientId: message.recipientId,
          sender: message.sender,
          recipient: message.recipient,
        };
      } catch (error) {
        console.error("Send message error:", error);

        if (error instanceof TRPCError) {
          throw error;
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to send message",
        });
      }
    }),

  markAsRead: protectedProcedure
    .input(
      z.object({
        messageIds: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.message.updateMany({
        where: {
          id: { in: input.messageIds },
          recipientId: ctx.user.id,
        },
        data: {
          read: true,
        },
      });
    }),

  getRecentChats: protectedProcedure.query(async ({ ctx }) => {
    try {
      if (!ctx.session?.user?.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to view chats",
        });
      }

      const messages = await ctx.db.message.findMany({
        where: {
          OR: [
            { senderId: ctx.session.user.id },
            { recipientId: ctx.session.user.id },
          ],
        },
        orderBy: { createdAt: "desc" },
        distinct: ["senderId", "recipientId"],
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          recipient: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });

      if (!messages.length) {
        return [];
      }

      return messages.map((message) => {
        const otherUser =
          message.senderId === ctx.session.user.id
            ? message.recipient
            : message.sender;

        return {
          user: {
            id: otherUser.id,
            name: otherUser.name ?? "Unknown User",
            image: otherUser.image,
          },
          lastMessage: {
            id: message.id,
            content: message.content,
            createdAt: message.createdAt,
            senderId: message.senderId,
            read: message.read,
          },
        };
      });
    } catch (error) {
      console.error("Chat router error:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch chats",
        cause: error,
      });
    }
  }),
});
