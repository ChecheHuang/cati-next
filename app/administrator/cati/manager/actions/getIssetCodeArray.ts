import prismadb from '@/lib/prismadb'

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
