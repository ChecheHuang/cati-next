import { getAllTemplatePhone } from '../page'
import CreateForm from './_component/CreateForm'
import React from 'react'

async function Page() {
  const data = await getAllTemplatePhone()
  const newTemplateId = (
    parseInt(data[data.length - 1].templateId) + 1
  ).toString()
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
