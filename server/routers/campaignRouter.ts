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
})
