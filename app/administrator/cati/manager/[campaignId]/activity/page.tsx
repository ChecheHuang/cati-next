import getAllCampaign from '../../actions/getAllCampaign'
import getIssetCodeArray from '../../actions/getIssetCodeArray'
import Edit from './components/Edit'
import PrevButton from '@/components/PrevButton'
import { buttonVariants } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import prismadb from '@/lib/prismadb'
import { cn } from '@/lib/utils'
import { QuestionType } from '@/types/questions'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

interface ActivityPageProps {
  params: {
    campaignId: string
  }
}
export async function generateMetadata({
  params: { campaignId },
}: ActivityPageProps): Promise<Metadata> {
  const campaignData = await getCampaignById(parseInt(campaignId))

  return {
    title: campaignData?.name,
  }
}

const getCampaignById = async (id: number) => {
  const origin = await prismadb.campaign.findUnique({
    select: {
      code: true,
      name: true,
      questions: true,
      begin_date: true,
      end_date: true,
    },
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

async function ActivityPage({ params: { campaignId } }: ActivityPageProps) {
  const campaignData = await getCampaignById(parseInt(campaignId))
  if (campaignData === null) return notFound()
  const issetCodeArray = await getIssetCodeArray(campaignData?.code)
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Heading
          title="活動管理"
          description={
            (campaignData?.code || '') + '-' + (campaignData?.name || '')
          }
        />
        <div className="flex gap-2">
          <Link
            href={`/administrator/cati/manager/${campaignId}/list`}
            className={cn(buttonVariants())}
          >
            名單管理
          </Link>
          <PrevButton />
        </div>
      </div>
      <Separator />
      <Edit
        issetCodeArray={issetCodeArray}
        campaignData={campaignData}
        campaignId={campaignId}
      />
    </div>
  )
}

export async function generateStaticParams() {
  const allCampaign = await getAllCampaign()
  return allCampaign.map((campaign) => ({
    campaignId: campaign.id.toString(),
  }))
}

export default ActivityPage
