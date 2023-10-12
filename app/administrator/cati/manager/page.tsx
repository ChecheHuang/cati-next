import ManagerClient from './components/ManagerClient'
import prismadb from '@/lib/prismadb'
import { QuestionType } from '@/types/questions'
import { Campaign } from '@prisma/client'
import type { Metadata } from 'next'
import React from 'react'

export const revalidate = 0
export const metadata: Metadata = {
  title: '活動管理',
  description: '電訪系統活動管理',
}

export type ManagerDataType = Pick<
  Campaign,
  'id' | 'code' | 'name' | 'begin_date' | 'end_date' | 'current_active'
>

const getAllCampaign = async () => {
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

async function Manager() {
  const data = await getAllCampaign()
  // console.log(data)
  return <ManagerClient data={data} />
}

export default Manager
