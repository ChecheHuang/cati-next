import './globals.css'
import { QueryProvider } from '@/components/providers/queryProvider'
import { SocketProvider } from '@/components/providers/socketProvider'
import { ThemeProvider } from '@/components/providers/themeProvider'
import ToastProvider from '@/components/providers/toastProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '鍾珮玲服務處',
  description: '電訪系統',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {/* <SocketProvider> */}
          <QueryProvider>
            {children}
            <ToastProvider />
          </QueryProvider>
          {/* </SocketProvider> */}
        </ThemeProvider>
      </body>
    </html>
  )
}
