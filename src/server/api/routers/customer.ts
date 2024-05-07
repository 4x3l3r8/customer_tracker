import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const customerRouter = createTRPCRouter({
  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.customer.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { createdAt: "desc" },
      take: 4,
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email("Not a valid email"),
        phone: z.string(),
        address: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.customer.create({
        data: {
          address: input.address,
          name: input.name,
          User: { connect: { id: ctx.session.user.id } },
          email: input.email,
          phone: input.phone,
          lat: "0",
          lng: "0",
        },
      });
    }),
});
