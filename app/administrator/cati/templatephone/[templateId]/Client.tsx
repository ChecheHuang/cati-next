'use client'

import { Button } from '@/components/ui/button'
import trpcClient from '@/lib/trpc/trpcClient'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const Client: React.FC = () => {
  const router = useRouter()
  const create = trpcClient.templatePhone.create.useMutation({
    onSettled: () => {
      router.refresh()
      // router.push('/administrator/cati/templatephone')
    },
    onSuccess: () => toast.success('新增成功'),
    onError: () => toast.error('新增失敗'),
  })
  const handleClick = () => create.mutate()

  return (
    <>
      <Button disabled={create.isLoading} onClick={handleClick}>
        {create.isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin bg-primary" />
        ) : null}
        Client
      </Button>
    </>
  )
}

export default Client
