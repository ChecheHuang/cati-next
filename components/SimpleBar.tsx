'use client'

import SimpleBarReact from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

const SimpleBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <SimpleBarReact
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      <main className=" h-[calc(100vh-58px)] w-full flex-1 px-4 py-2">
        {children}
      </main>
    </SimpleBarReact>
  )
}

export default SimpleBar
