import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const reelRouter = createTRPCRouter({
  getUserReels: publicProcedure
    .input(
      z.object({
        clerkId: z.string().min(1),
      }),
    )
    .query(async ({ input, ctx }) => {
      const userReels = await ctx.db.user.findUnique({
        where: { clerkId: input.clerkId },
        include: {
          reels: {
            select: {
              id: true,
            },
          },
        },
      });
      if (userReels?.reels.length === 0) return { reels: [] };
      if (!userReels) {
        return { reels: [] };
      }
      return { reels: userReels.reels };
    }),
});
