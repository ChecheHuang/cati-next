'use client'

import { Loader } from '@/components/loader'
import { Modal } from '@/components/modals/modal'
import { Button, buttonVariants } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { cn } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { Trash } from 'lucide-react'
import { ChangeEvent, useState } from 'react'
import React from 'react'
import { toast } from 'react-toastify'
import * as XLSX from 'xlsx'

type AddPhoneTableColumn = {
  name: string
  phone: string
}

const initData = [
  {
    name: 'test1',
    phone: '0912343233',
  },
  {
    name: 'test2',
    phone: '09123432334',
  },
]

function UploadButton({
  templateId,
  templateName,
}: {
  templateId: string
  templateName: string
}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true)
  const [data, setData] = useState<AddPhoneTableColumn[]>(initData)

  async function handleReadExcel(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files === null) return
    const file = e.target.files[0]
    const isExcelFile =
      file.name.endsWith('.xlsx') || file.name.endsWith('.xls')
    const isCSVFile = file.name.endsWith('.csv')
    if (!isExcelFile && !isCSVFile) {
      return toast.error('請選擇 Excel 檔或 CSV 檔')
    }
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(file)
      fileReader.onload = (e) => {
        const bufferArray = e.target?.result
        const wb = XLSX.read(bufferArray, { type: 'buffer' })
        const wsName = wb.SheetNames[0]
        const ws = wb.Sheets[wsName]
        const data = XLSX.utils.sheet_to_json(ws)
        resolve(data)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
    const excelData = await promise
    const worker = new Worker(new URL('./worker.ts', import.meta.url))
    worker.postMessage({ templateId, templateName, excelData })
    worker.onmessage = function (event) {
      const result = event.data
      //   console.log(result)
    }
    worker.onerror = function (event) {
      // console.log(event.fileName, event.lineo, event.message)
    }

    e.target.value = ''
  }
  const columns: ColumnDef<AddPhoneTableColumn>[] = [
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
          onClick={() => {
            console.log(row.original)
            setData((prev) => {
              return prev.filter((item) => {
                return item.phone !== row.original.phone
              })
            })
          }}
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
        description={`將以下電話增加至${templateName}`}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="sm:max-w-[825px]"
        footer={
          <div className=" space-x-2">
            <Button onClick={() => setIsModalOpen(false)} variant="ghost">
              取消
            </Button>
            <Button>確認</Button>
          </div>
        }
      >
        {data.length > 0 ? (
          <DataTable searchKey="phone" columns={columns} data={data} />
        ) : (
          <div className="flex h-40 w-full items-center justify-center">
            <Loader />
          </div>
        )}
      </Modal>
      <input
        onChange={handleReadExcel}
        id="upload"
        type="file"
        className=" hidden"
      />
      <label
        htmlFor="upload"
        className={cn(buttonVariants({ className: ' cursor-pointer' }))}
      >
        增加電話
      </label>
    </>
  )
}

export default UploadButton
