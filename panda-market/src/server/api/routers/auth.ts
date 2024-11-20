import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import {
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
} from "@/server/exceptions";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email("올바른 이메일 형식이 아닙니다"),
        password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다"),
        name: z.string().min(2, "이름은 2자 이상이어야 합니다"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const existingUser = await ctx.db.user.findUnique({
          where: {
            email: input.email,
          },
        });

        if (existingUser) {
          const error = new ConflictException("이미 존재하는 이메일입니다");
          throw new TRPCError({
            code: "CONFLICT",
            messad: error.message,
            cause: error,
          });
        }

        const hashedPassword = await bcrypt.hash(input.password, 10);

        const user = await ctx.db.user.create({
          data: {
            email: input.email,
            password: hashedPassword,
            name: input.name,
          },
          select: {
            id: true,
            email: true,
            name: true,
          },
        });

        return {
          success: true as const,
          user,
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }

        if (error instanceof Error) {
          if (error.name === "PrismaClientKnownRequestError") {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "잘못된 데이터 형식입니다",
              cause: new BadRequestException(error.message),
            });
          }
        }

        const serverError = new InternalServerErrorException(
          "회원가입 중 오류가 발생했습니다",
        );
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: serverError.message,
          cause: serverError,
        });
      }
    }),
});
