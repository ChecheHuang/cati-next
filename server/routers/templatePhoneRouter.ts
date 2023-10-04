import { router, publicProcedure, privateProcedure } from '../trpc'
import prismadb from '@/lib/prismadb'
import { Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export const templatePhoneRouter = router({
  options: publicProcedure.query(() => {
    return [
      { label: '活動123', value: '活動123' },
      { label: '活動2', value: '活動2' },
      { label: '活動3', value: '活動3' },
    ]
  }),
  create: publicProcedure
    .input(
      z.array(
        z.object({
          template_id: z.string(),
          template_name: z.string(),
          phone: z.string(),
          name: z.string(),
        }),
      ),
    )
    .mutation(async ({ input }) => {
      try {
        for (const { template_id, template_name, phone, name } of input) {
          await prismadb.phone_template.upsert({
            where: {
              template_id_phone: { template_id, phone },
            },
            create: {
              template_id,
              template_name,
              phone,
              name,
            },
            update: {
              name,
              template_name,
            },
          })
        }
        const lastPage = Math.ceil(
          (await prismadb.phone_template.count({
            where: { template_id: input[0].template_id },
          })) / 5,
        )
        revalidatePath('/administrator/cati/templatephone')
        return { lastPage: lastPage.toString() }
      } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({ code: 'CONFLICT' })
        }
      }
    }),
  update: publicProcedure
    .input(z.object({ id: z.number(), valid: z.boolean() }))
    .mutation(async ({ input }) => {
      await prismadb.phone_template.update({
        where: {
          id: input.id,
        },
        data: {
          valid: input.valid,
        },
      })
      revalidatePath('/administrator/cati/templatephone')
    }),
  delete: privateProcedure
    .input(
      z.object({ id: z.number(), page: z.number(), templateId: z.string() }),
    )
    .mutation(async ({ input: { id, page, templateId } }) => {
      await prismadb.phone_template.delete({
        where: {
          id,
        },
      })
      const lastPage = Math.ceil(
        (await prismadb.phone_template.count({
          where: {
            template_id: templateId,
          },
        })) / 5,
      )
      const redirectPage =
        page > lastPage ? lastPage.toString() : page.toString()
      revalidatePath('/administrator/cati/templatephone')
      return { redirectPage }
    }),
  deleteByTemplateId: privateProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      await prismadb.phone_template.deleteMany({
        where: {
          template_id: input,
        },
      })
      revalidatePath('/administrator/cati/templatephone')
    }),
})
