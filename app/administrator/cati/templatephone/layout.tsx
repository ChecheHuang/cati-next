import { PhoneModal } from './_components/phone-modal'
import React from 'react'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <PhoneModal />
    </>
  )
}

export default Layout
