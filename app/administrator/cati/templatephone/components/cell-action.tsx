'use client'

import { TemplatePhoneColumn } from './columns'
import { usePhoneModal } from '@/app/administrator/cati/templatephone/hooks/use-phone-modal'
import { AlertModal } from '@/components/modals/alert-modal'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import axios from 'axios'
import { Edit, MoreHorizontal, TabletSmartphone, Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

interface CellActionProps {
  data: TemplatePhoneColumn
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const phoneModal = usePhoneModal()

  const onConfirm = () => {
    try {
      setLoading(true)
      router.refresh()
    } catch (error) {
      console.log(error)
    } finally {
      setOpen(false)
      setLoading(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
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
              phoneModal.onOpen()
            }}
          >
            <TabletSmartphone className="mr-2 h-4 w-4" /> 加到活動
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/administrator/cati/templatephone/${data.id}`)
            }
          >
            <Edit className="mr-2 h-4 w-4" /> 修改
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> 刪除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
