'use client'

import Question from './Question'
import { DatePickerWithRange } from '@/components/DateRangePicker'
import StrictModeDroppable from '@/components/StrictModeDroppable'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import trpcClient from '@/lib/trpc/trpcClient'
import { QuestionType, QuestionTypeEnum } from '@/types/questions'
import { DragDropContext, Draggable, DropResult } from '@hello-pangea/dnd'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { DayPickerRangeProps } from 'react-day-picker'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as z from 'zod'

interface AddProps {
  newId: number
  issetCodeArray: string[]
}

function Add({ newId, issetCodeArray }: AddProps) {
  const router = useRouter()
  const [questions, setQuestions] = React.useState<QuestionType[]>([
    {
      question: '',
      options: [],
      type: QuestionTypeEnum.fill,
    },
  ])

  const campaignSchema = z.object({
    code: z
      .string()
      .min(1, '請輸入活動代碼')
      .refine((value) => !issetCodeArray.includes(value), '活動代碼已存在'),
    name: z.string().min(1, '請輸入活動名稱'),
    dateRange: z.object({
      from: z.date(),
      to: z.date(),
    }),
  })
  const form = useForm<z.infer<typeof campaignSchema>>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      code: newId.toString(),
      name: '活動' + newId.toString(),
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
    },
  })
  const createCampaign = trpcClient.campaign.createCampaign.useMutation({
    onSuccess: (id) => {
      toast.success('新增成功')
      router.refresh()
      router.push(`/administrator/cati/manager/${id.toString()}/list`)
    },
  })
  const onSubmit = (data: z.infer<typeof campaignSchema>) => {
    const {
      code,
      name,
      dateRange: { from: begin_date, to: end_date },
    } = data
    createCampaign.mutate({ code, name, begin_date, end_date, questions })
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="  w-full flex-col gap-2 "
        >
          <div className="mb-6 flex flex-wrap gap-2 ">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" font-bold">活動代碼</FormLabel>
                  <FormControl>
                    <Input className=" w-[200px] " {...field} />
                  </FormControl>
                  <div className=" h-1">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" font-bold">活動名稱</FormLabel>
                  <FormControl>
                    <Input className=" w-[200px]" {...field} />
                  </FormControl>
                  <div className=" h-1">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" font-bold">活動區間</FormLabel>
                  <FormControl>
                    <div>
                      <DatePickerWithRange
                        date={field.value}
                        setDate={
                          field.onChange as DayPickerRangeProps['onSelect']
                        }
                      />
                    </div>
                  </FormControl>
                  <div className=" h-1">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
          <DragDropContext
            onDragEnd={(result: DropResult) => {
              if (!result.destination) return
              const items = Array.from(questions)
              const [reorderedItem] = items.splice(result.source.index, 1)
              items.splice(result.destination.index, 0, reorderedItem)
              setQuestions(items)
            }}
          >
            <StrictModeDroppable droppableId="questions">
              {(provided) => (
                <div
                  className="mb-4 space-y-4"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {questions.map((_, questionIndex) => (
                    <Draggable
                      key={questionIndex}
                      draggableId={questionIndex.toString()}
                      index={questionIndex}
                    >
                      {(provided) => (
                        <Question
                          questionIndex={questionIndex}
                          questions={questions}
                          setQuestions={setQuestions}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </StrictModeDroppable>
          </DragDropContext>
          <div className="flex w-full justify-center">
            <Button
              onClick={() => {
                setQuestions([
                  ...questions,
                  { question: '', type: QuestionTypeEnum.fill, options: [] },
                ])
              }}
              type="button"
              variant="primary"
            >
              <PlusCircle className="mr-1" />
              增加問題
            </Button>
          </div>
          <Button
            disabled={createCampaign.isLoading}
            className="mt-4 w-full "
            type="submit"
          >
            {createCampaign.isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin " />
            )}
            送出
          </Button>
        </form>
      </Form>
    </>
  )
}

export default Add
