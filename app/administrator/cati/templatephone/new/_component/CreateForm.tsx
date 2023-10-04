'use client'

import UploadButton from '../../[templateId]/components/UploadButton'
import { Heading } from '@/components/ui/heading'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMemo, useState } from 'react'

function CreateForm({
  templateId,
  rejectNameArray,
}: {
  templateId: string
  rejectNameArray: string[]
}) {
  const [newTemplateName, setNewTemplateName] = useState<string>('')
  const errorMessage = useMemo(() => {
    if (rejectNameArray.includes(newTemplateName)) return '電話簿名稱重複'
    return false
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newTemplateName])

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <Heading title="新增電話簿" />
        <UploadButton
          disabled={!!errorMessage}
          templateId={templateId}
          templateName={newTemplateName}
        />
      </div>
      <div className=" flex h-[400px] w-full items-center justify-center">
        <div className="w-1/2 space-y-2">
          <Label htmlFor="templateName">新電話簿名稱</Label>
          <Input
            value={newTemplateName}
            onChange={(e) => setNewTemplateName(e.target.value)}
            id="templateName"
            placeholder="新電話簿..."
          />
          <div className="h-20 text-destructive">{errorMessage}</div>
        </div>
      </div>
    </div>
  )
}

export default CreateForm
