import TemplatePhoneClient from './components/TemplatePhoneClient'
import prismadb from '@/lib/prismadb'

const serverQuery = async () => {
  const data = await prismadb.phone_template.groupBy({
    by: ['template_id', 'template_name', 'created_at'],
    _count: true,
    where: {
      valid: true,
    },
  })
  return data.map((item) => ({
    id: item.template_id,
    templateName: item.template_name,
    count: item._count,
    createdAt: item.created_at,
  }))
}

const TemplatePhone = async () => {
  const data = await serverQuery()
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <TemplatePhoneClient data={data} />
      </div>
    </div>
  )
}

export default TemplatePhone
