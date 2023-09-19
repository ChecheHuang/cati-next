'use client'

import { TemplatePhoneColumn, columns } from './columns'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface TemplatePhoneProps {
  data: TemplatePhoneColumn[]
}

const TemplatePhone: React.FC<TemplatePhoneProps> = ({ data }) => {
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="電話簿管理" description="Manage your phone book" />
        <Button
          onClick={() => router.push(`/administrator/cati/templatephone/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> 新增電話簿
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="templateName" columns={columns} data={data} />
    </>
  )
}

export default TemplatePhone
