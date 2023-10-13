'use client'

import { usePhoneModal } from '../../components/PhoneModal'
import { Button } from '@/components/ui/button'

interface OpenAddActiveModalButtonProps {
  templateId: number
}

const OpenAddActiveModalButton: React.FC<OpenAddActiveModalButtonProps> = ({
  templateId,
}) => {
  const { onOpen } = usePhoneModal()
  return (
    <Button
      onClick={() => {
        onOpen([templateId])
      }}
    >
      加到活動
    </Button>
  )
}

export default OpenAddActiveModalButton
