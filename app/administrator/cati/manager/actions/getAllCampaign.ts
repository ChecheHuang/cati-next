import prismadb from '@/lib/prismadb'

export default async function getAllCampaign() {
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
