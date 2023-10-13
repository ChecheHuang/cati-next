'use client'

import HeaderAction from './HeaderAction'
import { usePhoneModal } from './PhoneModal'
import { AlertModal } from '@/components/modals/alert-modal'
import { Button, buttonVariants } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import trpcClient from '@/lib/trpc/trpcClient'
import { cn } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ArrowUpDown } from 'lucide-react'
import { Edit, MoreHorizontal, TabletSmartphone, Trash } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

export type TemplatePhoneColumn = {
  templateId: number
  templateName: string
  count: number
  createdAt: Date
}
interface CellActionProps {
  data: TemplatePhoneColumn
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const phoneModal = usePhoneModal()

  const deleteByTemplateId =
    trpcClient.templatePhone.deleteByTemplateId.useMutation({
      onSuccess: () => {
        toast.success('刪除成功')
        router.refresh()
      },
      onSettled: () => setIsOpen(false),
      onError: () => toast.error('刪除失敗'),
    })

  const onConfirm = () => {
    try {
      deleteByTemplateId.mutate(data.templateId)
    } catch (error) {
      console.log(error)
    }
  }
  const handleDelete = () => setIsOpen(true)

  return (
    <div className="flex w-full justify-center ">
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onConfirm}
        isLoading={deleteByTemplateId.isLoading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>操作</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              phoneModal.onOpen([data.templateId])
            }}
          >
            <TabletSmartphone className="mr-2 h-4 w-4" /> 加到活動
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(
                `/administrator/cati/templatephone/${data.templateId}`,
              )
            }
          >
            <Edit className="mr-2 h-4 w-4" /> 修改
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete}>
            <Trash className="mr-2 h-4 w-4" /> 刪除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
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
  {
    id: 'actions',
    header: ({ table }) => {
      const selectedTemplateIdArray = table
        .getSelectedRowModel()
        .rows.map((row) => row.original.templateId)
      const selectReset = () => table.toggleAllPageRowsSelected(false)
      return (
        <>
          <HeaderAction
            selectReset={selectReset}
            selectedTemplateIdArray={selectedTemplateIdArray}
          />
        </>
      )
    },
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
