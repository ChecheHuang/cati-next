import TemplatePhoneClient from './components/TemplatePhone'
import prismadb from '@/lib/prismadb'
import type { Metadata } from 'next'

export const revalidate = 0

export const getAllTemplatePhone = async () => {
  const data = await prismadb.phone_template.groupBy({
    by: ['template_id', 'template_name'],
    _count: true,
    _min: {
      created_at: true,
    },
    orderBy: {
      template_id: 'asc',
    },
  })
  return data.map((item) => ({
    templateId: item.template_id,
    templateName: item.template_name,
    count: item._count,
    createdAt: item._min.created_at as Date,
  }))
}

export const metadata: Metadata = {
  title: '電話簿管理',
  description: '電訪系統電話簿管理',
}

const TemplatePhone = async () => {
  const data = await getAllTemplatePhone()
  return <TemplatePhoneClient data={data} />
}

export default TemplatePhone
