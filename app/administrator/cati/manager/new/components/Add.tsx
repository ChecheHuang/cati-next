'use client'

import ChangeCampaign from '../../components/ChangeCampaign'
import trpcClient from '@/lib/trpc/trpcClient'
import { QuestionTypeEnum } from '@/types/questions'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'

interface AddProps {
  issetCodeArray: string[]
}

function Add({ issetCodeArray }: AddProps) {
  const router = useRouter()
  const createCampaign = trpcClient.campaign.createCampaign.useMutation({
    onSuccess: (id) => {
      toast.success('新增成功')
      router.refresh()
      router.push(`/administrator/cati/manager/${id.toString()}/list`)
    },
  })

  const initData = {
    code: '',
    name: '',
    dateRange: {
      from: (() => {
        const date = new Date()
        date.setHours(0, 0, 0)
        return date
      })(),
      to: (() => {
        const date = new Date()
        date.setHours(23, 59, 59)
        date.setMonth(date.getMonth() + 1)
        return date
      })(),
    },
    questions: [
      {
        question: '',
        options: [],
        type: QuestionTypeEnum.fill,
      },
    ],
  }

  return (
    <>
      <ChangeCampaign
        initData={initData}
        issetCodeArray={issetCodeArray}
        onSubmit={(data) => {
          const {
            dateRange: { from: begin_date, to: end_date },
            ...rest
          } = data
          createCampaign.mutate({
            ...rest,
            begin_date,
            end_date,
          })
        }}
        isLoading={createCampaign.isLoading}
      />
    </>
  )
}

export default Add
