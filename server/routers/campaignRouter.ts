import { router, publicProcedure, privateProcedure } from '../trpc'
import prismadb from '@/lib/prismadb'
import { Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export const campaignRouter = router({
  options: publicProcedure.query(async () => {
    const data = await prismadb.campaign.findMany({
      select: {
        name: true,
      },
    })
    const options: { label: string; value: string }[] = data.map(
      ({ name }) => ({ label: name, value: name }),
    )
    return options
  }),
  changeActiveCampaign: publicProcedure
    .input(z.number())
    .mutation(async ({ input: id }) => {
      await prismadb.campaign.updateMany({
        data: {
          current_active: false,
        },
      })
      await prismadb.campaign.update({
        where: {
          id,
        },
        data: {
          current_active: true,
        },
      })
      revalidatePath('/administrator/cati/manager')

      return true
    }),
  createCampaign: privateProcedure
    .input(
      z.object({
        code: z.string(),
        name: z.string(),
        questions: z.array(
          z.object({
            question: z.string(),
            options: z.array(z.string()),
            type: z.enum(['單選', '多選', '填空']),
          }),
        ),
        begin_date: z.date(),
        end_date: z.date(),
      }),
    )
    .mutation(async ({ input }) => {
      const create = await prismadb.campaign.create({
        data: input,
      })
      revalidatePath('/administrator/cati/manager')
      revalidatePath('/administrator/cati/templatephone')

      return create.id
    }),
  updateCampaign: privateProcedure
    .input(
      z.object({
        campaignId: z.string(),
        code: z.string(),
        name: z.string(),
        questions: z.array(
          z.object({
            question: z.string(),
            options: z.array(z.string()),
            type: z.enum(['單選', '多選', '填空']),
          }),
        ),
        begin_date: z.date(),
        end_date: z.date(),
      }),
    )
    .mutation(async ({ input }) => {
      const { campaignId, ...data } = input
      await prismadb.campaign.update({
        where: { id: parseInt(campaignId) },
        data,
      })
      revalidatePath('/administrator/cati/manager')
      revalidatePath('/administrator/cati/templatephone')
      return
    }),
})
