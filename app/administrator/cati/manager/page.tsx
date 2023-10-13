import getAllCampaign from './actions/getAllCampaign'
import { columns } from './components/columns'
import { buttonVariants } from '@/components/ui/button'
import DataTable from '@/components/ui/data-table'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Campaign } from '@prisma/client'
import { Plus } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const revalidate = 0
export const metadata: Metadata = {
  title: '活動狀態',
  description: '電訪系統活動狀態',
}

export type ManagerDataType = Pick<
  Campaign,
  'id' | 'code' | 'name' | 'begin_date' | 'end_date' | 'current_active'
>

async function Manager() {
  const data = await getAllCampaign()
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 ">
        <div className="flex items-center justify-between">
          <Heading title="活動狀態" description="Manage your campaign status" />
          <Link
            className={cn(buttonVariants())}
            href={`/administrator/cati/manager/new`}
          >
            <Plus className="mr-2 h-4 w-4" /> 新增活動
          </Link>
        </div>
        <Separator />
        <DataTable
          searchKey="name"
          placeholder="搜尋活動"
          columns={columns}
          data={data}
        />
      </div>
    </div>
  )
}

export default Manager
