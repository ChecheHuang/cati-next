'use client'

import { Switch } from '@/components/ui/switch'
import trpcClient from '@/lib/trpc/trpcClient'
import { useRouter } from 'next/navigation'

interface ClientSwitchProps {
  id: number
  checked: boolean
}

const ClientSwitch: React.FC<ClientSwitchProps> = ({ id, checked }) => {
  const router = useRouter()
  const changeValid = trpcClient.templatePhone.update.useMutation({
    onSettled: () => {
      router.refresh()
    },
  })

  return (
    <Switch
      onCheckedChange={(e: boolean) => {
        changeValid.mutate({
          id,
          valid: e,
        })
      }}
      checked={checked}
      disabled={changeValid.isLoading}
    />
  )
}

export default ClientSwitch
