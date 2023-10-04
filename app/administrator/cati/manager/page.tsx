import ManagerClient from './components/ManagerClient'
import prismadb from '@/lib/prismadb'
import type { Metadata } from 'next'
import React from 'react'

export const revalidate = 0
export const metadata: Metadata = {
  title: '活動管理',
  description: '電訪系統活動管理',
}

export const getAllCampaign = async () => {
  const data = await prismadb.campaign.findMany()
  return data
}

async function Manager() {
  const data = await getAllCampaign()
  console.log(data)
  return <ManagerClient data={data} />
}

export default Manager
