import { getAllTemplatePhone } from '../page'
import Client from './Client'
import ClientSwitch from './_components/ClientSwitch'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import trpcServer from '@/lib/trpc/trpcServer'
import { Metadata } from 'next'
import Link from 'next/link'

interface TemplatePhoneByIdPageProps {
  params: {
    templateId: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

const getTemplatePhoneById = async (input: {
  templateId: string
  page?: number | undefined
  size?: number | undefined
}) => await trpcServer.templatePhone.getByTemplateId(input)

export async function generateMetadata({
  params: { templateId },
  searchParams,
}: TemplatePhoneByIdPageProps): Promise<Metadata> {
  const page =
    typeof searchParams.page === 'string' ? Number(searchParams.page) : 1
  const size =
    typeof searchParams.size === 'string' ? Number(searchParams.size) : 10
  const data = await getTemplatePhoneById({ templateId, page, size })

  if (data.length === 0) {
    return {
      title: '新增電話簿',
    }
  }

  return {
    title: data[0].template_name,
  }
}
async function TemplatePhoneByIdPage({
  params: { templateId },
  searchParams,
}: TemplatePhoneByIdPageProps) {
  const page =
    typeof searchParams.page === 'string' ? Number(searchParams.page) : 1
  const size =
    typeof searchParams.size === 'string' ? Number(searchParams.size) : 5
  const data = await getTemplatePhoneById({ templateId, page, size })

  return (
    <div>
      <Client />

      <Table>
        <TableCaption className="space-x-2">
          <Button disabled={page <= 1}>
            <Link
              href={`/administrator/cati/templatephone//${templateId}?page=${
                page > 1 ? page - 1 : 1
              }`}
            >
              上一頁
            </Link>
          </Button>
          <Button disabled={data.length < size}>
            <Link
              href={`/administrator/cati/templatephone//${templateId}?page=${
                page + 1
              }`}
            >
              下一頁
            </Link>
          </Button>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>編號</TableHead>
            <TableHead>名字</TableHead>
            <TableHead>電話</TableHead>
            <TableHead>有效</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(({ id, name, phone, valid }) => (
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{phone}</TableCell>
              <TableCell>
                <ClientSwitch id={id} checked={valid} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
