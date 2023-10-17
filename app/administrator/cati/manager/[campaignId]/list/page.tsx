import ActionButton from './components/ActionButton'
import TotalPhoneList from './components/TotalPhoneList'
import {
  getAllCampaign,
  getCampaignById,
  getIssetTemplatePhoneByCampaignId,
} from '@/actions/campaign'
import { getAllTemplatePhone } from '@/actions/phone_template'
import PrevButton from '@/components/PrevButton'
import { buttonVariants } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

interface ListPageProps {
  params: {
    campaignId: string
  }
}
// export const revalidate = 0

export async function generateMetadata({
  params: { campaignId },
}: ListPageProps): Promise<Metadata> {
  const campaignData = await getCampaignById(parseInt(campaignId))

  return {
    title: campaignData?.name,
  }
}

async function ListPage({ params: { campaignId } }: ListPageProps) {
  const campaignData = await getCampaignById(parseInt(campaignId))
  const allTemplatePhone = await getAllTemplatePhone()
  const data = await getIssetTemplatePhoneByCampaignId(parseInt(campaignId))
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
          <ActionButton
            campaignId={parseInt(campaignId)}
            allTemplatePhone={allTemplatePhone}
          />
          <Link
            href={`/administrator/cati/manager/${campaignId}/activity`}
            className={cn(buttonVariants())}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            活動管理
          </Link>
          <PrevButton />
        </div>
      </div>
      <Separator />
      <TotalPhoneList totalPhoneList={campaignData?.totalPhoneList} />
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
