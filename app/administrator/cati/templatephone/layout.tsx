import { PhoneModal } from './components/PhoneModal'
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
