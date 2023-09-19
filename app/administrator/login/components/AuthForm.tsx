'use client'

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
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as z from 'zod'

const FormSchema = z.object({
  name: z.string().min(1, '請輸入使用者名稱'),
  password: z.string().min(1, '請輸入密碼'),
})
function AuthForm() {
  const [isLoading, setIsLoading] = useState(false)
  const session = useSession()
  const router = useRouter()
  useEffect(() => {
    if (session?.status === 'authenticated') {
      //  router.push('/administrator/cati')
      console.log('已登入')
    }
  }, [session?.status, router])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: 'name',
      password: 'password',
    },
  })
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true)
    try {
      const callback = await signIn('credentials', {
        ...data,
        redirect: false,
      })
      if (callback?.error) return toast.error('身分驗證失敗')

      if (callback?.ok) {
        router.push('/administrator/cati/status')
      }
    } catch (err) {
      toast.error('登入失敗')
    } finally {
      setIsLoading(false)
    }

    console.log(data)
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-[285px] w-[300px] flex-col justify-around rounded-3xl bg-[#e1b8bf] p-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" font-bold">使用者</FormLabel>
              <FormControl>
                <Input
                  className=" bg-transparent"
                  autoComplete="name"
                  placeholder="輸入使用者"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" font-bold">密碼</FormLabel>
              <FormControl>
                <Input
                  className=" bg-transparent"
                  autoComplete="current-password"
                  type="password"
                  placeholder="輸入密碼"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isLoading}
          variant="secondary"
          className="w-full bg-[#f7deb5] "
          type="submit"
        >
          登入
        </Button>
      </form>
    </Form>
  )
}

export default AuthForm
