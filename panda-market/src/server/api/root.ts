import { createTRPCRouter, t } from "@/server/api/trpc";
import { authRouter } from "@/server/api/routers/auth";
import { productRouter } from "./routers/product";
import { commentRouter } from "./routers/comment";
import { uploadRouter } from "./routers/upload";
import { postRouter } from "./routers/post";
import { chatRouter } from "./routers/chat";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  product: productRouter,
  comment: commentRouter,
  upload: uploadRouter,
  post: postRouter,
  chat: chatRouter,
});

export type AppRouter = typeof appRouter;
export const createCaller = t.createCallerFactory(appRouter);
