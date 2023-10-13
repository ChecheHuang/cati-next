'use client'

import { Button } from '@/components/ui/button'
import trpcClient from '@/lib/trpc/trpcClient'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

interface DeleteButtonProps {
  id: number
  page: number
  templateId: number
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  id,
  page,
  templateId,
}) => {
  const router = useRouter()

  const deleteMutate = trpcClient.templatePhone.delete.useMutation({
    onSuccess: ({ redirectPage }) => {
      router.push(`?page=${redirectPage}`)
      router.refresh()
      toast.success('刪除成功')
    },
  })

  return (
    <Button
      disabled={deleteMutate.isLoading}
      onClick={() => deleteMutate.mutate({ id, page, templateId })}
      variant="primary"
      size="sm"
    >
      <Trash />
    </Button>
  )
}

export default DeleteButton
