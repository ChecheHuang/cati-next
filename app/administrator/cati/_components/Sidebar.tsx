'use client'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Activity, PhoneCall, FileAudio2, FileAudio } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}
export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  const sidebar = [
    {
      title: '分機管理',
      items: [
        {
          label: '分機狀態',
          icon: Activity,
          href: '/administrator/cati/status',
        },
      ],
    },
    {
      title: '活動管理',
      items: [
        {
          label: '活動管理',
          icon: FileAudio,
          href: '/administrator/cati/manager',
        },
        {
          label: '活動成效',
          icon: FileAudio2,
          href: '/administrator/cati/view',
        },
      ],
    },
    {
      title: '電話管理',
      items: [
        {
          label: '電話簿管理',
          icon: PhoneCall,
          href: '/administrator/cati/templatephone',
        },
      ],
    },
  ]

  return (
    <aside
      className={cn(
        ' hidden h-full w-[220px] overflow-auto border-e border-primary/50 px-4 py-2 md:block',
        className,
      )}
    >
      {sidebar.map(({ title, items }, i) => {
        return (
          <div key={i}>
            <h2 className="label-pink-900 mb-1 font-semibold tracking-tight">
              {title}
            </h2>
            <div className="space-y-1">
              {items.map(({ label, icon: Icon, href }, i) => {
                const currentVariant = pathname?.includes(href)
                  ? 'secondary'
                  : 'ghost'
                return (
                  <Link
                    key={i}
                    href={href}
                    className={cn(
                      buttonVariants({ variant: currentVariant, size: 'sm' }),
                      'w-full justify-start',
                    )}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {label}
                  </Link>
                )
              })}
            </div>
          </div>
        )
      })}
    </aside>
  )
}
