'use client'

import { columns } from './columns'
import { AlertModal } from '@/components/modals/alert-modal'
import { Modal } from '@/components/modals/modal'
import { Button } from '@/components/ui/button'
import DataTable, { useTable } from '@/components/ui/data-table'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import trpcClient from '@/lib/trpc/trpcClient'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface ActionButtonProps {
  campaignId: number
  templatePhones: {
    templateId: number
    templateName: string
    count: number
    createdAt: Date
  }[]
}

const ActionButton: React.FC<ActionButtonProps> = ({
  campaignId,
  templatePhones,
}) => {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(true)
  const router = useRouter()
  const { rowSelectArray, setRowSelectArray } = useTable()

  const [isOpen, setIsOpen] = useState(false)
  const { mutate: deleteMutate, isLoading } =
    trpcClient.nameList.deleteNameList.useMutation({
      onSuccess: () => {
        toast.success('刪除成功')
        setIsModalOpen(false)
        router.refresh()
      },
    })
  const handleAdd = () => {
    const transformData = rowSelectArray.map((ArrayIndex) => {
      return templatePhones[ArrayIndex]
    })
    console.log(transformData)
    setRowSelectArray([0, 2])
  }

  return (
    <>
      <Modal
        className="sm:max-w-[70vw]"
        title="新增電話"
        description=""
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <DataTable
          placeholder="搜尋電話簿"
          searchKey="templateName"
          columns={columns}
          data={templatePhones}
        />
        <div className="flex w-full items-center justify-end space-x-2 pt-6">
          <Button onClick={() => setIsModalOpen(false)} variant="outline">
            取消
          </Button>
          <Button disabled={rowSelectArray.length === 0} onClick={handleAdd}>
            新增
          </Button>
        </div>
      </Modal>
      <AlertModal
        isOpen={isAlertModalOpen}
        isLoading={isLoading}
        onClose={() => setIsAlertModalOpen(false)}
        onConfirm={() => {
          deleteMutate(campaignId)
          setIsAlertModalOpen(false)
        }}
      />
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button onClick={() => setIsOpen(true)}>操作</Button>
        </PopoverTrigger>
        <PopoverContent className="w-30">
          <div className="flex flex-col gap-2">
            <Button
              onClick={() => {
                setIsAlertModalOpen(true)
              }}
            >
              清空名單
            </Button>
            <Button onClick={() => setIsModalOpen(true)}>新增電話</Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default ActionButton
