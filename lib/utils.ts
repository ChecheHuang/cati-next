import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import * as XLSX from 'xlsx'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const wait = (time: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, time)
  })
export const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

export const readExcel = (file: File) =>
  new Promise((resolve, reject) => {
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

export const exportExcel = (
  data: Record<string, any>[],
  fileName = 'file',
  sheetName = 'sheet',
) => {
  const wb = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(data)
  XLSX.utils.book_append_sheet(wb, ws, sheetName)
  XLSX.writeFile(wb, `${fileName}.xlsx`)
}
