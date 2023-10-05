'use client'

import { usePhoneModal } from './PhoneModal'
import { TemplatePhoneColumn } from './columns'
import { AlertModal } from '@/components/modals/alert-modal'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import trpcClient from '@/lib/trpc/trpcClient'
import { Edit, MoreHorizontal, TabletSmartphone, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface CellActionProps {
  data: TemplatePhoneColumn
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
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
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onConfirm}
        loading={deleteByTemplateId.isLoading}
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
    </>
  )
}
