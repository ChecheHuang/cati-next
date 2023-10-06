'use client'

import { TemplatePhoneColumn, columns } from './columns'
import { buttonVariants } from '@/components/ui/button'
import DataTable from '@/components/ui/data-table'
// import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'
import Link from 'next/link'

interface TemplatePhoneProps {
  data: TemplatePhoneColumn[]
}

const TemplatePhone: React.FC<TemplatePhoneProps> = ({ data }) => {
  return (
    <div className=" space-y-2">
      <div className="flex items-center justify-between">
        <Heading title="電話簿管理" description="Manage your phone book" />
        <Link
          className={cn(buttonVariants())}
          href={`/administrator/cati/templatephone/new`}
        >
          <Plus className="mr-2 h-4 w-4" /> 新增電話簿
        </Link>
      </div>
      <Separator />
      <DataTable
        placeholder="搜尋電話簿"
        searchKey="templateName"
        columns={columns}
        data={data}
      />
    </div>
  )
}

export default TemplatePhone
