import { router } from "../trpc";
import { authRouter } from "./auth";
import { productRouter } from "./product";
import { commentRouter } from "./comment";
import { uploadRouter } from "./upload";
import { postRouter } from "./post";
import { chatRouter } from "./chat";

export const appRouter = router({
  auth: authRouter,
  product: productRouter,
  comment: commentRouter,
  upload: uploadRouter,
  post: postRouter,
  chat: chatRouter,
});

export type AppRouter = typeof appRouter;
