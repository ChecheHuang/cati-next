'use client'

import girl from './assets/girl.png'
import phone from './assets/phone.png'
import AuthForm from './components/AuthForm'
import useHover3d from '@/hooks/useHover3d'
import Image from 'next/image'
import { useRef } from 'react'

function Login() {
  const divRef = useRef<HTMLDivElement>(null)

  const imageHover = useHover3d(divRef)
  return (
    <div
      ref={divRef}
      className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-pink-100 to-white"
    >
      <h1 className="mb-10 text-2xl">鍾珮玲服務處</h1>
      <div className="relative flex h-[400px] w-[350px] flex-col items-center rounded-3xl bg-[hsl(350,30%,49.8%)] ">
        <Image
          className="absolute -left-24 bottom-0  z-10 w-[131px]"
          src={girl}
          alt=""
          priority={true}
          style={{
            transform: imageHover.transform,
          }}
        />
        <Image
          className="absolute -right-24 bottom-0  z-10 w-[131px]"
          src={phone}
          alt=""
          priority={true}
          style={{
            transform: imageHover.transform,
          }}
        />
        <h1 className="p-8 text-2xl text-white">管理者登入</h1>
        <AuthForm />
      </div>
    </div>
  )
}

export default Login
