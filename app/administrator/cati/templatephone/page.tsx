import TemplatePhoneClient from './components/TemplatePhone'
import prismadb from '@/lib/prismadb'
import type { Metadata } from 'next'

// export const revalidate = 1

export const getAllTemplatePhone = async () => {
  const data = await prismadb.phone_template.groupBy({
    by: ['template_id', 'template_name', 'created_at'],
    _count: true,
    where: {
      valid: true,
    },
    orderBy: {
      created_at: 'asc',
    },
  })
  return data.map((item) => ({
    id: item.template_id,
    templateName: item.template_name,
    count: item._count,
    createdAt: item.created_at,
  }))
}

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
