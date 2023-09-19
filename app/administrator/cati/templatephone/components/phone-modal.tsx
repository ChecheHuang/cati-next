'use client'

import { usePhoneModal } from '@/app/administrator/cati/templatephone/hooks/use-phone-modal'
import AutoCompleteSelect from '@/components/AutoCompleteSelect'
import { Modal } from '@/components/modals/modal'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  name: z.string().min(1),
})

export const PhoneModal = () => {
  const phoneModal = usePhoneModal()

  const [loading, setLoading] = useState(false)

  type FormType = z.infer<typeof formSchema>

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = async (values: FormType) => {
    try {
      setLoading(true)
      phoneModal.onClose()
      console.log(values)
      // const response = await axios.post('/api/stores', values)
      // window.location.assign(`/${response.data.id}`)
    } catch (error) {
      console.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title="加到活動"
      description="選擇該電話簿要加到的活動中"
      isOpen={phoneModal.isOpen}
      onClose={phoneModal.onClose}
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
                    options={['活動1', '活動2', '活動3']}
                    name="name"
                    placeholder="選擇活動"
                    commandPlaceholder="尋找活動"
                    commandEmpty="沒有該活動"
                    className="w-full "
                    optionsClassName="w-[470px]"
                  />
                  <Button
                    disabled={loading}
                    variant="outline"
                    onClick={phoneModal.onClose}
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
