'use client'

import StrictModeDroppable from '@/components/StrictModeDroppable'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import trpcClient from '@/lib/trpc/trpcClient'
import { DragDropContext, Draggable, DropResult } from '@hello-pangea/dnd'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

interface TotalPhoneListProps {
  totalPhoneList: {
    campaign_id: number
    template_id: number
    template_name: string
    sort: number
    count: string
    answered_count: string
  }[]
}

const TotalPhoneList: React.FC<TotalPhoneListProps> = ({ totalPhoneList }) => {
  const router = useRouter()
  const [data, setData] = useState<TotalPhoneListProps['totalPhoneList']>([])
  const { mutate: changeCampaignSortmutate, isLoading } =
    trpcClient.nameList.changeNameListSort.useMutation({
      onSuccess: () => {
        toast.success('更新成功')
        router.refresh()
      },
    })
  const handleChangeSort = () => {
    const sendData = data.map((data, index) => {
      const { template_name, count, answered_count, ...sendData } = data
      sendData.sort = index + 1
      return sendData
    })
    changeCampaignSortmutate(sendData)
  }
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const items = Array.from(data)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setData(items)
  }
  useEffect(() => {
    setData(totalPhoneList)
  }, [totalPhoneList])

  return (
    <>
      <Table>
        <TableCaption>
          <Button
            isLoading={isLoading}
            disabled={isLoading || data.length === 0}
            onClick={handleChangeSort}
          >
            更新排序
          </Button>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>電話簿名稱</TableHead>
            <TableHead>號碼數量</TableHead>
            <TableHead>已取號數量</TableHead>
            <TableHead>取號順序</TableHead>
          </TableRow>
        </TableHeader>
        {data.length > 0 ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <StrictModeDroppable droppableId="droppableId">
              {(provided) => (
                <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                  {data
                    // .sort((a, b) => a.sort - b.sort)
                    .map(
                      (
                        {
                          template_id,
                          template_name,
                          sort,
                          count,
                          answered_count,
                        },
                        index,
                      ) => (
                        <Draggable
                          key={template_id.toString()}
                          draggableId={template_id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <TableRow
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TableCell>{template_name}</TableCell>
                              <TableCell>{count.toString()}</TableCell>
                              <TableCell>{answered_count.toString()}</TableCell>
                              <TableCell>{sort.toString()}</TableCell>
                            </TableRow>
                          )}
                        </Draggable>
                      ),
                    )}
                  {provided.placeholder}
                </TableBody>
              )}
            </StrictModeDroppable>
          </DragDropContext>
        ) : (
          <TableBody>
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </>
  )
}

export default TotalPhoneList
