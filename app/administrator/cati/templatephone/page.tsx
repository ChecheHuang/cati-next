import TemplatePhoneClient from './components/TemplatePhone'
import trpcServer from '@/lib/trpc/trpcServer'
import type { Metadata } from 'next'

// export const revalidate = 1

export const getAllTemplatePhone = async () =>
  await trpcServer.templatePhone.get()

export const metadata: Metadata = {
  title: '電話簿管理',
  description: '電訪系統電話簿管理',
}

const TemplatePhone = async () => {
  const data = await getAllTemplatePhone()
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <TemplatePhoneClient data={data} />
      </div>
    </div>
  )
}

export default TemplatePhone
