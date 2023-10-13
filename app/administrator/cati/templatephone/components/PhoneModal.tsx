'use client'

import AutoCompleteSelect from '@/components/AutoCompleteSelect'
import { Modal } from '@/components/modals/modal'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import trpcClient from '@/lib/trpc/trpcClient'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { create } from 'zustand'

interface usePhoneModalStore {
  isOpen: boolean
  onOpen: (templateIdArray: number[]) => void
  onClose: () => void
  setCampaignId: (campaign_id: string) => void
  campaign_id: string
  phone_template_id: number[]
}

export const usePhoneModal = create<usePhoneModalStore>((set) => ({
  isOpen: false,
  onOpen: (templateIdArray) =>
    set({ isOpen: true, phone_template_id: templateIdArray }),
  onClose: () => set({ isOpen: false, campaign_id: '', phone_template_id: [] }),
  setCampaignId: (campaign_id) => set({ campaign_id }),
  campaign_id: '',
  phone_template_id: [],
}))

const formSchema = z.object({
  campaign_id: z.string().min(1),
})

export const PhoneModal = () => {
  const { onClose, setCampaignId, campaign_id, isOpen, phone_template_id } =
    usePhoneModal()

  const { data: options = [] } = trpcClient.campaign.options.useQuery()

  const [loading, setLoading] = useState(false)

  type FormType = z.infer<typeof formSchema>

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      campaign_id: '',
    },
  })

  const onSubmit = ({ campaign_id }: FormType) => {
    try {
      setLoading(true)
      setCampaignId(campaign_id)
    } catch (error) {
      console.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (!campaign_id || !phone_template_id) return
    console.log('campaign_id', campaign_id)
    console.log('phone_template_id', phone_template_id)
    onClose()
    form.setValue('campaign_id', '')
  }, [campaign_id])

  return (
    <Modal
      title="加到活動"
      description="選擇該電話簿要加到的活動中"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex w-full  flex-wrap items-center justify-end gap-2 ">
                  <AutoCompleteSelect<FormType>
                    form={form}
                    label="選擇活動"
                    options={options}
                    name="campaign_id"
                    placeholder="選擇活動"
                    commandPlaceholder="尋找活動"
                    commandEmpty="沒有該活動"
                    className="w-full "
                    optionsClassName="w-[470px]"
                  />
                  <Button
                    disabled={loading}
                    variant="outline"
                    onClick={onClose}
                  >
                    取消
                  </Button>
                  <Button disabled={loading} type="submit">
                    確認
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  )
}
