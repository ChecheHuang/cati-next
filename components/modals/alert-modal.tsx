'use client'

import { Modal } from '@/components/modals/modal'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface AlertModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isLoading: boolean
  title?: string
  description?: string
  confirmButtonText?: string
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  title = '確認刪除嗎',
  description = '這個操作不可回復',
  confirmButtonText = '刪除',
}) => {
  return (
    <Modal
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button disabled={isLoading} variant="outline" onClick={onClose}>
          取消
        </Button>
        <Button disabled={isLoading} variant="destructive" onClick={onConfirm}>
          {isLoading && <Loader2 className="mr-2 h-6 w-6 animate-spin " />}
          {confirmButtonText}
        </Button>
      </div>
    </Modal>
  )
}
