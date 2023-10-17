import Add from './components/Add'
import getIssetCodeArray from '@/actions/campaign'
import PrevButton from '@/components/PrevButton'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import React from 'react'

async function NewCampaignPage() {
  const issetCodeArray = await getIssetCodeArray()
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Heading title="新增活動" description="Add new campaign " />
        <PrevButton />
      </div>
      <Separator />
      <Add issetCodeArray={issetCodeArray} />
    </div>
  )
}

export default NewCampaignPage
