'use client'

import { ManagerDataType } from '../page'
import { Badge } from '@/components/ui/badge'
import trpcClient from '@/lib/trpc/trpcClient'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export const columns: ColumnDef<ManagerDataType>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'code',
    header: '活動代碼',
  },
  {
    accessorKey: 'name',
    header: '活動名稱',
  },
  {
    header: '開始時間',
    cell: ({ row }) => {
      const show = format(new Date(row.original.begin_date), 'yyyy-MM-dd')
      return <>{show}</>
    },
  },
  {
    header: '結束時間',
    cell: ({ row }) => {
      const show = format(new Date(row.original.end_date), 'yyyy-MM-dd')
      return <>{show}</>
    },
  },
  {
    header: '狀態',
    cell: ({ row }) => {
      const begin = row.original.begin_date
      const end = row.original.end_date
      const today = new Date()
      const isActive = today >= begin && today <= end
      return (
        <>
          {isActive ? (
            <Badge className="whitespace-nowrap">活動中</Badge>
          ) : (
            <Badge className="whitespace-nowrap" variant="outline">
              已結束
            </Badge>
          )}
        </>
      )
    },
  },
  {
    id: 'actions',

    cell: ({ row }) => <CellAction data={row.original} />,
  },
]

const CellAction = ({ data }: { data: ManagerDataType }) => {
  const router = useRouter()

  const changeActiveCampaign =
    trpcClient.campaign.changeActiveCampaign.useMutation({
      onSettled: () => router.refresh(),
    })

  return (
    <div className="flex items-center gap-2 ">
      {data.current_active ? (
        <Badge variant="default" className="text-md cursor-pointer">
          當前活動
        </Badge>
      ) : (
        <Badge
          onClick={() => changeActiveCampaign.mutate(data.id)}
          variant="outline"
          className="text-md cursor-pointer whitespace-nowrap"
        >
          設為當前活動
        </Badge>
      )}

      <Badge
        variant="outline"
        className="text-md cursor-pointer whitespace-nowrap  text-yellow-300 hover:text-yellow-600 dark:hover:text-yellow-200"
      >
        <Link href={`/administrator/cati/manager/${data.code}/activity`}>
          管理活動
        </Link>
      </Badge>
      <Badge
        variant="outline"
        className="text-md cursor-pointer whitespace-nowrap  text-blue-600 hover:text-blue-800 dark:hover:text-blue-400"
      >
        <Link href={`/administrator/cati/manager/${data.code}/list`}>
          管理名單
        </Link>
      </Badge>
    </div>
  )
}
