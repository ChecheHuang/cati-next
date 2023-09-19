import Header from './components/Header'
import { Sidebar } from './components/Sidebar'
import React from 'react'

export const metadata = {
  title: '電訪系統',
  description: '電訪系統',
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-secondary to-primary">
      <Header />
      <div className="flex h-[calc(100vh-58px)]   ">
        <Sidebar />
        <main className="h-full w-full flex-1 overflow-auto px-4 py-2">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
