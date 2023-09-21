import { router, publicProcedure  } from '../trpc'
import prismadb from '@/lib/prismadb'
import { fakerZH_TW } from '@faker-js/faker'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const templatePhoneProcedure = publicProcedure.input(
  z.object({ name: z.string() }),
)

export const templatePhoneRouter = router({
  get: publicProcedure.query(async () => {
    const data = await prismadb.phone_template.groupBy({
      by: ['template_id', 'template_name', 'created_at'],
      _count: true,
      where: {
        valid: true,
      },
      orderBy: {
        created_at: 'asc',
      },
    })
    return data.map((item) => ({
      id: item.template_id,
      templateName: item.template_name,
      count: item._count,
      createdAt: item.created_at,
    }))
  }),
  options: publicProcedure.query(() => {
    return ['活動123', '活動2', '活動3']
  }),
  create: publicProcedure.mutation(async ({ input }) => {
    const lastData = await prismadb.phone_template.findFirst({
      select: {
        template_id: true,
      },
      orderBy: {
        id: 'desc',
      },
    })
    const template_id = (
      parseInt(lastData?.template_id as string) + 1
    ).toString()
    const template_name = fakerZH_TW.company.name()
    const name = fakerZH_TW.person.fullName()
    const phone = fakerZH_TW.phone.number()

    const create = await prismadb.phone_template.create({
      data: {
        template_id,
        template_name,
        name,
        phone,
      },
    })
    revalidatePath('/administrator/cati/templatephone')

    return create
  }),
})
