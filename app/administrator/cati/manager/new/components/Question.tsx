'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { QuestionType, QuestionTypeEnum } from '@/types/questions'
import { PlusCircle, X } from 'lucide-react'
import React, { forwardRef, HTMLAttributes } from 'react'

interface QuestionProps extends HTMLAttributes<HTMLDivElement> {
  questionIndex: number
  questions: QuestionType[]
  setQuestions: React.Dispatch<React.SetStateAction<QuestionType[]>>
}

const Wrap: React.ForwardRefRenderFunction<HTMLDivElement, QuestionProps> = (
  { questionIndex, questions, setQuestions, ...props },
  ref,
) => {
  return (
    <Card
      ref={ref}
      {...props}
      className="relative max-w-7xl bg-transparent/10 p-4"
    >
      <div className="absolute -left-1 -top-1 h-6 w-6 rounded-full border bg-primary text-center text-secondary">
        {questionIndex + 1}
      </div>
      <X
        className="absolute right-1 top-1 h-5 w-5 cursor-pointer text-secondary-foreground"
        onClick={() => {
          const newQuestions = [...questions].filter(
            (_, index) => index !== questionIndex,
          )
          setQuestions(newQuestions)
        }}
      />
      問題
      <div className="flex gap-2">
        <Input
          placeholder="輸入您的問題"
          onChange={(e) => {
            setQuestions((prev) => {
              const newQuestions = [...prev]
              newQuestions[questionIndex].question = e.target.value
              return newQuestions
            })
          }}
          value={questions[questionIndex].question}
        />
        <Select
          onValueChange={(value: QuestionTypeEnum) => {
            setQuestions((prev) => {
              const newItem = [...prev]
              newItem[questionIndex].type = value
              if (value === QuestionTypeEnum.fill) {
                newItem[questionIndex].options = []
              }
              return newItem
            })
          }}
          value={questions[questionIndex].type}
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
      <div className=" mt-2 space-y-2">
        {questions[questionIndex].type !== QuestionTypeEnum.fill &&
          questions[questionIndex].options &&
          questions[questionIndex].options.map((option, optionIndex) => {
            return (
              <div className="flex items-center gap-2" key={optionIndex}>
                <Input
                  placeholder="輸入您的選項"
                  onChange={(e) => {
                    setQuestions((prev) => {
                      const newQuestions = [...prev]
                      newQuestions[questionIndex].options[optionIndex] =
                        e.target.value

                      return newQuestions
                    })
                  }}
                  value={option}
                />
                <Button
                  onClick={() => {
                    const newQuestions = [...questions]
                    newQuestions[questionIndex].options = newQuestions[
                      questionIndex
                    ].options.filter((_, index) => index !== optionIndex)
                    setQuestions(newQuestions)
                  }}
                  type="button"
                  size="icon"
                >
                  <X />
                </Button>
              </div>
            )
          })}
        {questions[questionIndex].type !== QuestionTypeEnum.fill && (
          <Button
            onClick={() => {
              const newQuestions = [...questions]
              newQuestions[questionIndex].options = [
                ...newQuestions[questionIndex].options,
                '',
              ]
              setQuestions(newQuestions)
            }}
            className="w-full"
            type="button"
            size="icon"
            variant="primary"
          >
            <PlusCircle />
            增加選項
          </Button>
        )}
      </div>
    </Card>
  )
}

const Question = forwardRef<HTMLDivElement, QuestionProps>(Wrap)

export default Question
