'use client'

import { ManagerDataType } from '../page'
import { columns } from './columns'
import { buttonVariants } from '@/components/ui/button'
import DataTable from '@/components/ui/data-table'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'
import Link from 'next/link'

interface ManagerClientProps {
  data: ManagerDataType[]
}

const ManagerClient: React.FC<ManagerClientProps> = ({ data }) => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 ">
        <div className="flex items-center justify-between">
          <Heading
            title="活動管理"
            description="Manage your campaign activity"
          />
          <Link
            className={cn(buttonVariants())}
            href={`/administrator/cati/manager/new`}
          >
            <Plus className="mr-2 h-4 w-4" /> 新增活動
          </Link>
        </div>
        <Separator />
        <DataTable searchKey="name" columns={columns} data={data} />
      </div>
    </div>
  )
}

export default ManagerClient
