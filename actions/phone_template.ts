import prismadb from '@/lib/prismadb'

export const getAllTemplatePhone = async () => {
  const data = await prismadb.phone_template.groupBy({
    by: ['template_id', 'template_name'],
    _count: true,
    _min: {
      created_at: true,
    },
    orderBy: {
      template_id: 'asc',
    },
  })
  return data.map((item) => ({
    templateId: item.template_id,
    templateName: item.template_name,
    count: item._count,
    createdAt: item._min.created_at as Date,
  }))
}

export const getTemplatePhoneById = async ({
  templateId,
  page,
  size,
}: {
  templateId: number
  page?: number | undefined
  size?: number | undefined
}) => {
  let option
  if (page && size) {
    option = {
      skip: (page - 1) * size,
      take: size,
    }
  } else {
    option = {}
  }
  const data = await prismadb.phone_template.findMany({
    where: {
      template_id: templateId,
    },
    ...option,
  })
  const total = await prismadb.phone_template.count({
    where: {
      template_id: templateId,
    },
  })
  return { data, total }
}
