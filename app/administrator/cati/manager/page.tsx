import ManagerClient from './components/ManagerClient'
import prismadb from '@/lib/prismadb'
import { Campaign } from '@prisma/client'
import type { Metadata } from 'next'
import React from 'react'

export const revalidate = 0
export const metadata: Metadata = {
  title: '活動管理',
  description: '電訪系統活動管理',
}

enum QuestionTypeEnum {
  single = '單選',
  multiple = '多選',
  fill = '填空',
}

interface QuestionType {
  question: string
  options: string[] | undefined
  type: QuestionTypeEnum
}

export type ManagerDataType = Override<Campaign, { questions: QuestionType }>

export const getAllCampaign = async () => {
  const data = await prismadb.campaign.findMany()
  return data as unknown as ManagerDataType[]
}

async function Manager() {
  const data = await getAllCampaign()
  // console.log(data)
  return <ManagerClient data={data} />
}

export default Manager
