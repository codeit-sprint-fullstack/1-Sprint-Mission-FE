import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { db } from "@/server/db";
import { auth } from "@/server/auth/config";
import { CommonException } from "../exceptions";
import { UnauthorizedException } from "../exceptions";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await auth();

  return {
    db: db,
    session,
    headers: opts.headers,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    if (error.cause instanceof CommonException) {
      const commonError = error.cause;
      return {
        ...shape,
        data: {
          ...commonError.toJSON(),
          zodError: null,
          stack:
            process.env.NODE_ENV === "development" ? error.stack : undefined,
        },
      };
    }

    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

const isAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new UnauthorizedException();
  }
  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
      user: ctx.session.user,
    },
  });
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
export const middleware = t.middleware;
export const router = t.router;
export { t };
