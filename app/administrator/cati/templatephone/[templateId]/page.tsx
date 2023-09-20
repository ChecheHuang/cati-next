import { getAllTemplatePhone } from '../page'
import Client from './Client'
import prismadb from '@/lib/prismadb'
import { Metadata } from 'next'

interface TemplatePhoneByIdPageProps {
  params: {
    templateId: string
  }
}

const getTemplatePhoneById = async (templateId: string) =>
  await prismadb.phone_template.findMany({
    where: {
      template_id: templateId,
    },
  })

export async function generateMetadata({
  params: { templateId },
}: TemplatePhoneByIdPageProps): Promise<Metadata> {
  const data = await getTemplatePhoneById(templateId)

  if (data.length === 0) {
    return {
      title: '新增電話簿',
    }
  }

  return {
    title: data[0].name,
  }
}
async function TemplatePhoneByIdPage({
  params: { templateId },
}: TemplatePhoneByIdPageProps) {
  const data = await getTemplatePhoneById(templateId)

  return (
    <div>
      <Client />
      {JSON.stringify(data)}
    </div>
  )
}

export async function generateStaticParams() {
  const totalTemplatePhoneData = await getAllTemplatePhone()

  return totalTemplatePhoneData.map((templatePhone) => ({
    templateId: templatePhone.id.toString(),
  }))
}

export default TemplatePhoneByIdPage
