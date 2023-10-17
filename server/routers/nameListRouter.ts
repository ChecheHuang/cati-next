import { router, publicProcedure, privateProcedure } from '../trpc'
import prismadb from '@/lib/prismadb'
import { Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export const nameListRouter = router({
  changeNameListSort: privateProcedure
    .input(
      z.array(
        z.object({
          campaign_id: z.number(),
          template_id: z.number(),
          sort: z.number(),
        }),
      ),
    )
    .mutation(async ({ input: newNameListArr }) => {
      const id = newNameListArr[0].campaign_id.toString()
      for (const { campaign_id, template_id, sort } of newNameListArr) {
        await prismadb.name_list.updateMany({
          where: {
            campaign_id,
            template_id,
          },
          data: {
            sort,
          },
        })
      }
      revalidatePath(`/administrator/cati/manager/[campaignId]/list`, 'page')
      return true
    }),
  deleteNameList: publicProcedure
    .input(z.number())
    .mutation(async ({ input: campaign_id }) => {
      const deleteNameListById = await prismadb.name_list.deleteMany({
        where: {
          campaign_id,
        },
      })
      return true
    }),
})
