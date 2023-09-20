'use client'

import { Button } from '@/components/ui/button'
import trpcClient from '@/lib/trpc/trpcClient'
import { useRouter } from 'next/navigation'

const Client: React.FC = () => {
  const router = useRouter()
  const create = trpcClient.templatePhone.create.useMutation({
    onSettled: () => {
      router.refresh()
      router.push('/administrator/cati/templatephone')
    },
  })
  const handleClick = () => {
    create.mutate()
  }
  return (
    <>
      <Button onClick={handleClick}>Client</Button>
    </>
  )
}

export default Client
