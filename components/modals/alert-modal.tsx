'use client'

import { Modal } from '@/components/modals/modal'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface AlertModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  loading: boolean
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  return (
    <Modal
      title="確認刪除嗎?"
      description="這個操作不可回復"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          取消
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          {loading && <Loader2 className="mr-2 h-6 w-6 animate-spin " />}
          刪除
        </Button>
      </div>
    </Modal>
  )
}
