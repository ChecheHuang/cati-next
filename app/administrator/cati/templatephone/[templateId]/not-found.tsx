import PrevButton from '@/components/PrevButton'
import React from 'react'

function notFound() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h2>沒有該電話簿</h2>
      <PrevButton />
    </div>
  )
}

export default notFound
