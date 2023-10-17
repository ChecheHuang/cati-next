import prismadb from '@/lib/prismadb'

export const getAllCampaign = async () => {
  const data = await prismadb.campaign.findMany({
    select: {
      id: true,
      code: true,
      name: true,
      begin_date: true,
      end_date: true,
      current_active: true,
    },
  })
  return data
}

export const getCampaignById = async (id: number) => {
  const data = await prismadb.campaign.findUnique({
    where: {
      id,
    },
    select: {
      code: true,
      name: true,
    },
  })
  if (!data) return null
  const totalPhoneList: {
    campaign_id: string
    template_id: number
    template_name: string
    sort: number
    count: string
    answered_count: string
  }[] = await prismadb.$queryRaw`
  select ${id.toString()} as campaign_id,sort,phone_template.template_id, template_name, CAST(count(*) AS CHAR) as count, CAST(SUM(CASE WHEN answers IS NOT NULL THEN 1 ELSE 0 END) AS CHAR) AS answered_count
  from name_list
  join phone_template on name_list.phone_template_id = phone_template.id
  where campaign_id = ${id}
  group by sort, template_name,template_id;
`
  return {
    ...data,
    totalPhoneList: totalPhoneList.map((item) => ({
      ...item,
      campaign_id: parseInt(item.campaign_id),
    })),
  }
}

export default async function getIssetCodeArray(currentCode?: string) {
  let filter = {}
  if (currentCode) {
    filter = {
      where: {
        code: {
          not: currentCode,
        },
      },
    }
  }

  return (
    await prismadb.campaign.findMany({
      select: {
        code: true,
      },
      ...filter,
    })
  ).map((campaign) => campaign.code)
}

export const getIssetTemplatePhoneByCampaignId = async (id: number) => {
  const data = await prismadb.campaign.findUnique({
    where: {
      id,
    },
    select: {
      name_list: {
        select: {
          template_id: true,
        },
      },
    },
  })
  const map: AnyObject = {}
  const result = data?.name_list.reduce((acc, { template_id }) => {
    if (!map[template_id]) {
      map[template_id] = true
      acc.push(template_id)
    }
    return acc
  }, [] as number[])
  return result
}
