import CreateForm from './components/CreateForm'
import { getAllTemplatePhone } from '@/actions/phone_template'
import React from 'react'

export const revalidate = 0

async function Page() {
  const data = await getAllTemplatePhone()
  const newTemplateId = data[data.length - 1].templateId + 1
  const rejectNameArray = data.map(({ templateName }) => templateName)
  return (
    <div>
      <CreateForm
        templateId={newTemplateId}
        rejectNameArray={rejectNameArray}
      />
    </div>
  )
}

export default Page
