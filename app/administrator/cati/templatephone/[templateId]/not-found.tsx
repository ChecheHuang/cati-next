import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

function notFound() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h2>沒有該電話簿</h2>
      <Link
        className={cn(buttonVariants())}
        href="/administrator/cati/templatephone"
      >
        回電話簿管理
      </Link>
    </div>
  )
}

export default notFound
