import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUserData: publicProcedure
    .input(
      z.object({
        clerkId: z.string().min(1),
      }),
    )
    .query(async ({ input, ctx }) => {
      const user = await ctx.db.user.findUnique({
        where: { clerkId: input.clerkId },
      });
      if (!user) {
        await ctx.db.user.create({
          data: {
            clerkId: input.clerkId,
          },
        });
      }
      if (!user?.name) {
        return { user: null, redirect: true };
      }
      return { user, redirect: false };
    }),
  updateName: publicProcedure
    .input(z.object({ name: z.string().min(1), clerkId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.db.user.findUnique({
        where: { clerkId: input.clerkId },
      });
      if (!user) {
        return { user: null };
      }
      const updatedUser = await ctx.db.user.update({
        where: { clerkId: input.clerkId },
        data: {
          name: input.name,
        },
      });
      return { user: updatedUser };
    }),
});
