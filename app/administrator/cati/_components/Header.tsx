'use client'

import { ThemeToggle } from '@/components/themeToggle'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <header className="flex h-[50px] w-full items-center justify-between  px-4 text-white  shadow-lg">
      <h1 className=" flex items-center text-xl font-[600] text-primary ">
        <Image
          src="/logo.jpg"
          alt="logo"
          width={40}
          height={40}
          priority={true}
          className=" mr-2 rounded-full"
        />
        鍾佩玲服務處電話訪問中心
      </h1>
      <div className="flex items-center gap-1">
        <ThemeToggle />
        <Button variant="primary" onClick={() => signOut()}>
          登出
        </Button>
      </div>
    </header>
  )
}

export default Header
