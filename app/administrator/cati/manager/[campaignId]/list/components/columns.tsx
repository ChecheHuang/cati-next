'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ArrowUpDown } from 'lucide-react'
import Link from 'next/link'

export type TemplatePhoneColumn = {
  templateId: number
  templateName: string
  count: number
  createdAt: Date
}

export const columns: ColumnDef<TemplatePhoneColumn>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        onCheckedChange={(value) => {
          table.toggleAllRowsSelected(!!value)
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'templateId',
    header: ({ column }) => {
      return (
        <Button
          className="w-full"
          variant="ghost"
          onClick={() => {
            const isSorted = column.getIsSorted()
            if (!isSorted) return column.toggleSorting(true)
            column.toggleSorting(isSorted === 'asc')
          }}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className=" text-center">{row.getValue('templateId')}</div>
    ),
  },
  {
    accessorKey: 'templateName',
    header: '電話簿名稱',
    cell: ({ row }) => {
      return (
        <Link
          className={cn(buttonVariants({ variant: 'primary' }))}
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
    accessorKey: 'createdAt',
    header: '日期',
    cell: ({ row }) => {
      const show = format(
        new Date(row.original.createdAt),
        'yyyy-MM-dd HH:mm:ss',
      )
      return <>{show}</>
    },
  },
]
