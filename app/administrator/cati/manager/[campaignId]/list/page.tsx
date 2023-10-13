import getAllCampaign from '../../actions/getAllCampaign'
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
  const data = await prismadb.campaign.findUnique({
    where: {
      id,
    },
    select: {
      code: true,
      name: true,
      name_list: {
        select: {
          sort: true,
          phone_template: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })
  console.log(data)
  const campaignPhone: any =
    await prismadb.$queryRaw`select sort,template_name, count(*) as count from name_list join phone_template on name_list.phone_template_id = phone_template.id where campaign_id = ${id} group by sort,template_name;`
  if (!data) return null
  return data
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
        <div className="flex gap-2">
          <Link
            href={`/administrator/cati/manager/${campaignId}/activity`}
            className={cn(buttonVariants())}
          >
            活動管理
          </Link>

          <PrevButton />
        </div>
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
