import Add from './components/Add'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import prismadb from '@/lib/prismadb'
import React from 'react'

async function NewCampaignPage() {
  const lastRecord = await prismadb.campaign.findFirst({
    select: {
      id: true,
    },
    orderBy: {
      id: 'desc',
    },
  })
  const issetCodeArray = (
    await prismadb.campaign.findMany({
      select: {
        code: true,
      },
    })
  ).map((campaign) => campaign.code)
  return (
    <div className="space-y-4">
      <Heading title="新增活動" description="Add your new campaign " />
      <Separator />
      <Add newId={(lastRecord?.id || 0) + 1} issetCodeArray={issetCodeArray} />
    </div>
  )
}

export default NewCampaignPage
