import { Phone_template } from '@prisma/client'

type InsertDataType = Pick<
  Phone_template,
  'template_id' | 'template_name' | 'phone' | 'name'
>

self.onmessage = function (event) {
  self.postMessage(formatFn({ ...event.data }))
}

function formatFn(data: {
  templateId: string
  templateName: string
  excelData: Record<string, any>[]
}) {
  const { templateId, templateName, excelData } = data
  const row = Object.keys(excelData[0])
  const isHasTelCol = '電話' in excelData[0]
  const mapObject: Record<string, InsertDataType> = {}
  const returnData = excelData.reduce((acc: InsertDataType[], cur) => {
    const phone = isHasTelCol
      ? formatAsPhoneNumber(cur['電話'])
      : formatAsPhoneNumber(cur[row[0]])
    if (!phone) return acc
    if (mapObject[phone]) return acc
    mapObject[phone] = {
      template_id: templateId,
      template_name: templateName,
      phone,
      name: cur['姓名'] ? cur['姓名'] : cur['名字'] ? cur['名字'] : phone,
    }
    acc.push(mapObject[phone])
    return acc
  }, [])
  return returnData
}

function formatAsPhoneNumber(phone: string) {
  if (!phone) return false
  const reg = /^(03|04|05|06|07|08)\d{7,8}$|^(09|02)\d{8}$/
  const regex = /[^\d]/g
  const formatPhone = phone
    .toString()
    .replace(regex, '')
    .replace(/^(?!0)/, '0')
    .substring(0, 10)
  return reg.test(formatPhone) ? formatPhone : false
}
