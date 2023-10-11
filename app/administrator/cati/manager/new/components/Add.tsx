'use client'

import { DatePickerWithRange } from './DateRangePicker'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { QuestionType, QuestionTypeEnum } from '@/types/questions'
import { zodResolver } from '@hookform/resolvers/zod'
import { addMonths } from 'date-fns'
import { PlusCircle, X } from 'lucide-react'
import React from 'react'
import { DayPickerRangeProps } from 'react-day-picker'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

interface AddProps {
  newId: number
  issetCodeArray: string[]
}

function Add({ newId, issetCodeArray }: AddProps) {
  const [questions, setQuestions] = React.useState<QuestionType[]>([
    {
      question: '你最喜歡的電視劇類型是什麼？',
      options: ['劇情', '懸疑'],
      type: QuestionTypeEnum.multiple,
    },
    {
      question: '你最喜歡的運動員是誰？',
      type: QuestionTypeEnum.fill,
    },

    {
      question: '你最喜歡的節日是哪個？',
      options: ['春節'],
      type: QuestionTypeEnum.single,
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
        from: new Date(),
        to: addMonths(new Date(), 1),
      },
    },
  })
  const onSubmit = (data: z.infer<typeof campaignSchema>) => {
    console.log(data)
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="  w-full flex-col gap-2 "
        >
          <div className="flex flex-wrap gap-2 ">
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
          <div className=" flex flex-wrap   gap-4 ">
            {questions.map((item, questionIndex) => {
              return (
                <Card
                  key={questionIndex}
                  className="relative h-full  w-[500px] p-4"
                >
                  <div className="absolute -left-1 -top-1 h-6 w-6 rounded-full border bg-primary text-center text-secondary">
                    {questionIndex + 1}
                  </div>
                  問題
                  <div className="flex gap-2">
                    <Input
                      onChange={(e) => {
                        setQuestions((prev) => {
                          const newQuestions = [...prev]
                          newQuestions[questionIndex].question = e.target.value
                          return newQuestions
                        })
                      }}
                      value={item.question}
                    />
                    <Select
                      onValueChange={(value: QuestionTypeEnum) => {
                        setQuestions((prev) => {
                          const newItem = [...prev]
                          newItem[questionIndex].type = value
                          if (
                            newItem[questionIndex].type !==
                            QuestionTypeEnum.fill
                          ) {
                            console.log(newItem[questionIndex])
                          }

                          return newItem
                        })
                      }}
                      value={item.type}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="選擇題目類型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value={QuestionTypeEnum.fill}>
                            {QuestionTypeEnum.fill}
                          </SelectItem>
                          <SelectItem value={QuestionTypeEnum.multiple}>
                            {QuestionTypeEnum.multiple}
                          </SelectItem>
                          <SelectItem value={QuestionTypeEnum.single}>
                            {QuestionTypeEnum.single}
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  {/* <div className=" mt-2 space-y-2">
                    {item.type !== QuestionTypeEnum.fill &&
                      item.options.map((option, optionIndex) => {
                        return (
                          <div
                            className="flex items-center gap-2"
                            key={optionIndex}
                          >
                            <Input
                              onChange={(e) => {
                                const value = e.target.value
                                setQuestions((prev) => {
                                  const newQuestions = [...prev]
                                  return newQuestions
                                })
                              }}
                              value={option}
                            />
                            <Button type="button" size="icon">
                              <X />
                            </Button>
                          </div>
                        )
                      })}
                    {item.type !== QuestionTypeEnum.fill && (
                      <Button
                        className="w-full"
                        type="button"
                        size="icon"
                        variant="primary"
                      >
                        <PlusCircle />
                      </Button>
                    )}
                  </div> */}
                </Card>
              )
            })}
            <div className="flex min-h-[200px] w-[500px] items-center justify-center">
              <Button type="button" size="icon" variant="primary">
                <PlusCircle />
              </Button>
            </div>
          </div>
          <Button
            variant="secondary"
            className="mt-4 w-full bg-[#f7deb5]"
            type="submit"
          >
            送出
          </Button>
        </form>
      </Form>
    </>
  )
}

export default Add
