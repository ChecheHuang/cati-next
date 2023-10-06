'use client'

import { usePhoneModal } from './PhoneModal'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import trpcClient from '@/lib/trpc/trpcClient'
import { Loader2, MoreHorizontal, TabletSmartphone, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface HeaderActionProps {
  selectedTemplateIdArray: string[]
  selectReset: () => void
}

const HeaderAction: React.FC<HeaderActionProps> = ({
  selectedTemplateIdArray,
  selectReset,
}) => {
  const phoneModal = usePhoneModal()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const deleteByTemplateId =
    trpcClient.templatePhone.deleteByTemplateId.useMutation()
  const handleDelete = async () => {
    try {
      const promises = selectedTemplateIdArray.map((selectedTemplateId) =>
        deleteByTemplateId.mutateAsync(selectedTemplateId),
      )
      setIsLoading(true)
      await Promise.all(promises)
      toast.success('刪除成功')
      selectReset()
      router.refresh()
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="flex w-full justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            disabled={isLoading || selectedTemplateIdArray.length === 0}
            variant="primary"
            className="h-8 w-8 p-0 disabled:opacity-10"
          >
            <span className="sr-only">Open menu</span>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin " />
            ) : (
              <MoreHorizontal className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>操作</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              phoneModal.onOpen(selectedTemplateIdArray)
            }}
          >
            <TabletSmartphone className="mr-2 h-4 w-4" /> 加到活動
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleDelete}>
            <Trash className="mr-2 h-4 w-4" /> 刪除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default HeaderAction
