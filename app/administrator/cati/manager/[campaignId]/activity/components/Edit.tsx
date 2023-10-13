'use client'

import ChangeCampaign, {
  CampaignDataType,
} from '../../../components/ChangeCampaign'
import { AlertModal } from '@/components/modals/alert-modal'
import trpcClient from '@/lib/trpc/trpcClient'
import { QuestionType } from '@/types/questions'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface EditProps {
  campaignData: CampaignDataType
  issetCodeArray: string[]
  campaignId: string
}

const Edit: React.FC<EditProps> = ({
  issetCodeArray,
  campaignData,
  campaignId,
}) => {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false)
  const [submitData, setSubmitData] = useState<{
    campaignId: string
    begin_date: Date
    end_date: Date
    code: string
    name: string
    questions: QuestionType[]
  } | null>(null)
  const router = useRouter()
  const { mutate: editMutate, isLoading } =
    trpcClient.campaign.updateCampaign.useMutation({
      onSuccess: () => {
        toast.success('修改成功')
        router.refresh()
        router.push(`/administrator/cati/manager`)
      },
    })

  return (
    <>
      <AlertModal
        title="確認修改嗎"
        confirmButtonText="確認"
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        isLoading={isLoading}
        onConfirm={() => {
          if (submitData) {
            editMutate(submitData)
          }
        }}
      />
      <ChangeCampaign
        initData={campaignData}
        issetCodeArray={issetCodeArray}
        onSubmit={(data) => {
          const {
            dateRange: { from: begin_date, to: end_date },
            ...rest
          } = data
          const submitData = {
            ...rest,
            campaignId,
            begin_date,
            end_date,
          }
          setSubmitData(submitData)
          setIsAlertModalOpen(true)
        }}
      />
    </>
  )
}

export default Edit
