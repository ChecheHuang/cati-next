'use client'

import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import Link from 'next/link'

export type TemplatePhoneColumn = {
  id: string
  templateName: string
  count: number
  createdAt: Date
}

export const columns: ColumnDef<TemplatePhoneColumn>[] = [
  {
    accessorKey: 'templateName',
    header: '電話簿名稱',
    cell: ({ row }) => {
      return (
        <Link
          className="text-primary"
          href={`/administrator/cati/templatephone/${row.original.id}`}
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
    cell: ({ row }) => {
      // console.log(row)
      return <></>
    },
  },
]
