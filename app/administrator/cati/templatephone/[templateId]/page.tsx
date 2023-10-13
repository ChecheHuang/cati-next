import { getAllTemplatePhone } from '../page'
import DeleteButton from './components/DeleteButton'
import OpenAddActiveModalButton from './components/OpenAddActiveModalButton'
import UploadButton from './components/UploadButton'
import ValidSwitch from './components/ValidSwitch'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import prismadb from '@/lib/prismadb'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface TemplatePhoneByIdPageProps {
  params: {
    templateId: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

const getTemplatePhoneById = async ({
  templateId,
  page,
  size,
}: {
  templateId: number
  page?: number | undefined
  size?: number | undefined
}) => {
  let option
  if (page && size) {
    option = {
      skip: (page - 1) * size,
      take: size,
    }
  } else {
    option = {}
  }
  const data = await prismadb.phone_template.findMany({
    where: {
      template_id: templateId,
    },
    ...option,
  })
  const total = await prismadb.phone_template.count({
    where: {
      template_id: templateId,
    },
  })
  return { data, total }
}

export async function generateMetadata({
  params: { templateId },
  searchParams,
}: TemplatePhoneByIdPageProps): Promise<Metadata> {
  const page =
    typeof searchParams.page === 'string' ? Number(searchParams.page) : 1
  const size =
    typeof searchParams.size === 'string' ? Number(searchParams.size) : 5
  const { data } = await getTemplatePhoneById({
    templateId: parseInt(templateId),
    page,
    size,
  })

  if (data.length === 0) {
    return {
      title: '找不到電話簿',
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
  const { data, total } = await getTemplatePhoneById({
    templateId: parseInt(templateId),
    page,
    size,
  })
  const lastPage = Math.ceil(total / size)
  const firstPagePath = `/administrator/cati/templatephone/${templateId}?page=1`
  const lastPagePath = `/administrator/cati/templatephone/${templateId}?page=${lastPage}`
  const prevPagePath = `/administrator/cati/templatephone/${templateId}?page=${
    page > 1 ? page - 1 : 1
  }`
  const nextPagePath = `/administrator/cati/templatephone/${templateId}?page=${
    page + 1
  }`

  if (data.length === 0) return notFound()
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <Heading title={data[0]?.template_name} />

        <div className="flex gap-2">
          <OpenAddActiveModalButton templateId={parseInt(templateId)} />
          <UploadButton
            templateId={parseInt(templateId)}
            templateName={data[0]?.template_name}
            redirectPath={`${templateId}?page=${lastPage}`}
          />
        </div>
      </div>
      <Table>
        <TableCaption>
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              disabled={page <= 1}
              className="hidden h-8 w-8 p-0 lg:flex"
            >
              <Link href={firstPagePath}>
                <Icons.speedPrevious className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              disabled={page <= 1}
            >
              <Link href={prevPagePath}>
                <Icons.previous className="h-4 w-4" />
              </Link>
            </Button>
            <div className=" text-secondary">
              第{page}頁,共{lastPage}頁
            </div>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              disabled={page === lastPage}
            >
              <Link href={nextPagePath}>
                <Icons.next className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              disabled={page === lastPage}
            >
              <span className="sr-only">Go to last page</span>
              <Link href={lastPagePath}>
                <Icons.speedNext className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>編號</TableHead>
            <TableHead>姓名</TableHead>
            <TableHead>電話</TableHead>
            <TableHead>有效</TableHead>
            <TableHead>刪除</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(({ id, name, phone, valid }) => (
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{phone}</TableCell>
              <TableCell>
                <ValidSwitch id={id} checked={valid} />
              </TableCell>
              <TableCell>
                <DeleteButton
                  templateId={parseInt(templateId)}
                  id={id}
                  page={page}
                />
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
    templateId: templatePhone.templateId.toString(),
  }))
}

export default TemplatePhoneByIdPage
