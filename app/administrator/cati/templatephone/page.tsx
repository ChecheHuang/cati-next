import TemplatePhoneClient from './components/TemplatePhone'
import { getAllTemplatePhone } from '@/actions/phone_template'
import type { Metadata } from 'next'

export const revalidate = 0

export const metadata: Metadata = {
  title: '電話簿管理',
  description: '電訪系統電話簿管理',
}

const TemplatePhone = async () => {
  const data = await getAllTemplatePhone()
  return <TemplatePhoneClient data={data} />
}

export default TemplatePhone
