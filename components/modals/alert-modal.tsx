'use client'

import { Modal } from '@/components/modals/modal'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

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
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

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
          刪除
        </Button>
      </div>
    </Modal>
  )
}
