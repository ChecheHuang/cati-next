'use client'

import { CellAction } from './CellAction'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import Link from 'next/link'

export type TemplatePhoneColumn = {
  templateId: string
  templateName: string
  count: number
  createdAt: Date
}

export const columns: ColumnDef<TemplatePhoneColumn>[] = [
  {
    accessorKey: 'templateId',
    header: 'ID',
  },
  {
    accessorKey: 'templateName',
    header: '電話簿名稱',
    cell: ({ row }) => {
      return (
        <Link
          className={cn(buttonVariants({ variant: 'link' }))}
          href={`/administrator/cati/templatephone/${row.original.templateId}`}
        >
          {row?.original?.templateName}
        </Link>
      )
    },
  },
  {
    accessorKey: 'count',
    header: '電話數量',
  },
  {
    header: '日期',
    cell: ({ row }) => {
      const show = format(
        new Date(row.original.createdAt),
        'yyyy-MM-dd HH:mm:ss',
      )
      return <>{show}</>
    },
  },
  {
    id: 'actions',
    header: '操作',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
