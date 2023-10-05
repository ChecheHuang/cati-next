'use client'

import { usePhoneModal } from '../../components/PhoneModal'
import { Loader } from '@/components/loader'
import { Modal } from '@/components/modals/modal'
import { Button, buttonVariants } from '@/components/ui/button'
import DataTable from '@/components/ui/data-table'
import trpcClient from '@/lib/trpc/trpcClient'
import { cn, exportExcel, readExcel } from '@/lib/utils'
import { Phone_template } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import React from 'react'
import { toast } from 'react-toastify'

type InsertDataType = Pick<
  Phone_template,
  'template_id' | 'template_name' | 'phone' | 'name'
>

function UploadButton({
  templateId,
  templateName,
  disabled = false,
  redirectPath,
}: {
  templateId: string
  templateName: string
  disabled?: boolean
  redirectPath?: string
}) {
  const { onOpen } = usePhoneModal()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [data, setData] = useState<InsertDataType[]>([])
  const isDisabled = data.length === 0
  const router = useRouter()

  const create = trpcClient.templatePhone.create.useMutation({
    onSuccess: (result) => {
      const lastPage = result?.lastPage
      toast.success('修改成功')
      setIsModalOpen(false)
      if (redirectPath) router.push(redirectPath)
      router.push(`${templateId}?page=${lastPage}`)
    },
    onError: (err) => {
      toast.error('新增失敗')
    },
  })

  useEffect(() => {
    if (!isModalOpen) setData([])
  }, [isModalOpen])

  async function handleReadExcel(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files === null) return
    const file = e.target.files[0]
    const isExcelFile =
      file.name.endsWith('.xlsx') || file.name.endsWith('.xls')
    const isCSVFile = file.name.endsWith('.csv')
    if (!isExcelFile && !isCSVFile) {
      return toast.error('請選擇 Excel 檔或 CSV 檔')
    }

    setIsModalOpen(true)
    const excelData = await readExcel(file)
    const worker = new Worker(new URL('./worker.ts', import.meta.url))
    worker.postMessage({ templateId, templateName, excelData })
    worker.onmessage = (event) => {
      const result = event.data
      if (result.length === 0) return toast.error('沒有符合條件的電話')
      setData(result)
    }
    worker.onerror = function (event) {
      // console.log(event.fileName, event.lineo, event.message)
    }

    e.target.value = ''
  }

  const handleSubmit = () => {
    create.mutate(data)
  }
  const columns: ColumnDef<InsertDataType>[] = [
    {
      accessorKey: 'name',
      header: '姓名',
    },
    {
      accessorKey: 'phone',
      header: '電話',
    },
    {
      id: 'actions',
      header: '操作',
      cell: ({ row }) => (
        <Button
          onClick={() =>
            setData((prev) => {
              const newData = prev.filter((item) => {
                return item.phone !== row.original.phone
              })
              if (newData.length === 0) setIsModalOpen(false)
              return newData
            })
          }
        >
          <Trash className="mr-2 h-4 w-4" /> 刪除
        </Button>
      ),
    },
  ]
  return (
    <>
      <Modal
        title="增加電話"
        description={`點擊確認將以下電話增加至${templateName}，若電話重複則會取代原本的電話`}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="sm:max-w-[625px]"
        footer={
          <div className=" space-x-2">
            <Button onClick={() => setIsModalOpen(false)} variant="ghost">
              取消
            </Button>
            <Button onClick={handleSubmit} disabled={isDisabled}>
              確認
            </Button>
          </div>
        }
      >
        {!isDisabled ? (
          <DataTable
            placeholder="搜尋電話"
            searchKey="phone"
            columns={columns}
            data={data}
          />
        ) : (
          <div className="flex h-40 w-full items-center justify-center">
            <Loader />
          </div>
        )}
      </Modal>
      <div className="flex gap-2">
        <Button
          onClick={() => {
            onOpen([templateId])
          }}
        >
          加到活動
        </Button>
        <input
          onChange={handleReadExcel}
          id="upload"
          type="file"
          className=" hidden"
          disabled={disabled}
        />
        <label
          htmlFor="upload"
          className={cn(buttonVariants({ className: ' cursor-pointer' }))}
        >
          增加電話
        </label>
        <Button variant="outline" onClick={handleOnExport}>
          下載範例
        </Button>
      </div>
    </>
  )
}

export default UploadButton

function handleOnExport() {
  const exampleData = [
    { 姓名: '空號1', 電話: '0936254072' },
    { 姓名: '空號2', 電話: '0921950654' },
  ]
  exportExcel(exampleData, '匯入範例', '匯入範例')
}
