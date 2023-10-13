import getAllCampaign from '../../actions/getAllCampaign'
import PrevButton from '@/components/PrevButton'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import prismadb from '@/lib/prismadb'
import { QuestionType } from '@/types/questions'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

interface ListPageProps {
  params: {
    campaignId: string
  }
}
export async function generateMetadata({
  params: { campaignId },
}: ListPageProps): Promise<Metadata> {
  const campaignData = await getCampaignById(parseInt(campaignId))

  return {
    title: campaignData?.name,
  }
}

const getCampaignById = async (id: number) => {
  const origin = await prismadb.campaign.findUnique({
    where: {
      id,
    },
  })
  if (!origin) return null
  const { code, name, questions, begin_date, end_date } = origin
  return {
    code,
    name,
    dateRange: {
      from: begin_date,
      to: end_date,
    },
    questions: questions as QuestionType[],
  }
}

async function ListPage({ params: { campaignId } }: ListPageProps) {
  const campaignData = await getCampaignById(parseInt(campaignId))
  if (campaignData === null) return notFound()
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Heading
          title="名單管理"
          description={
            (campaignData?.code || '') + '-' + (campaignData?.name || '')
          }
        />
        <PrevButton />
      </div>
      <Separator />
    </div>
  )
}

export async function generateStaticParams() {
  const allCampaign = await getAllCampaign()
  return allCampaign.map((campaign) => ({
    campaignId: campaign.id.toString(),
  }))
}

export default ListPage
