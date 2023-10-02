self.onmessage = function (event) {
  const excelData = event.data.excelData

  const formatData = formatFn({ ...event.data })

  self.postMessage(excelData)
}

function formatFn(data: {
  templateId: string
  templateName: string
  excelData: Record<string, any>[]
}) {
  const { templateId, templateName, excelData } = data
  const row = Object.keys(excelData[0])
  const isHasTelCol = '電話' in excelData[0]
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
