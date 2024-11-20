import { v2 as cloudinary } from "cloudinary";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const outputSchema = z.object({
  timestamp: z.number(),
  signature: z.string(),
  cloudName: z.string(),
  apiKey: z.string(),
});

export const uploadRouter = createTRPCRouter({
  getSignature: protectedProcedure.output(outputSchema).mutation(async () => {
    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
        folder: "product-images",
      },
      process.env.CLOUDINARY_API_SECRET!,
    );

    return {
      timestamp,
      signature,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
      apiKey: process.env.CLOUDINARY_API_KEY!,
    };
  }),
});
