import React from 'react'

interface TemplatePhoneByIdPageProps {
  params: {
    templateId: string
  }
}
function TemplatePhoneByIdPage({
  params: { templateId },
}: TemplatePhoneByIdPageProps) {
  return <div>{templateId}</div>
}

export default TemplatePhoneByIdPage
