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
import { QuestionType, QuestionTypeEnum } from '@/types/questions'
import { DragDropContext, Draggable, DropResult } from '@hello-pangea/dnd'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusCircle } from 'lucide-react'
import React, { useEffect } from 'react'
import { DayPickerRangeProps } from 'react-day-picker'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export type CampaignDataType = {
  code: string
  name: string
  dateRange: {
    from: Date
    to: Date
  }
  questions: QuestionType[]
}

interface ChangeCampaignProps {
  issetCodeArray: string[]
  initData: CampaignDataType
  isLoading?: boolean
  onSubmit: (data: CampaignDataType) => void
}

function ChangeCampaign({
  issetCodeArray,
  initData: { code, name, dateRange, questions: originQuestions },
  isLoading = false,
  onSubmit,
}: ChangeCampaignProps) {
  const [questions, setQuestions] =
    React.useState<QuestionType[]>(originQuestions)

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
      code,
      name,
      dateRange,
    },
  })
  const onValidate = (data: z.infer<typeof campaignSchema>) => {
    const { code, name, dateRange } = data
    const map = {} as AnyObject
    const newQuestions = questions.reduce((acc, cur) => {
      if (map[cur.question] || cur.question === '') return acc
      map[cur.question] = true
      const optionsMap = {} as AnyObject
      const newOptions = cur.options.filter((option) => {
        if (option === '') return false
        if (optionsMap[option]) {
          return false
        }
        optionsMap[option] = true
        return true
      })
      acc = [...acc, { ...cur, options: newOptions }]
      return acc
    }, [] as QuestionType[])
    onSubmit({ code, name, dateRange, questions: newQuestions })
  }
  useEffect(() => {
    form.setFocus('code')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onValidate)}
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
                    <Input
                      placeholder="請輸入活動代碼"
                      className=" w-[200px] "
                      {...field}
                    />
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
                    <Input
                      placeholder="請輸入活動名稱"
                      className=" w-[200px]"
                      {...field}
                    />
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
            disabled={isLoading}
            isLoading={isLoading}
            className="mt-4 w-full "
            type="submit"
          >
            送出
          </Button>
        </form>
      </Form>
    </>
  )
}

export default ChangeCampaign
