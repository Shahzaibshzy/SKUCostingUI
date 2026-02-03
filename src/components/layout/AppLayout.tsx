import type { ReactNode } from 'react'
import { AppHeader } from './AppHeader'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#f3f4f6]">
      <AppHeader />
      <main className="flex-1 p-4 transition-all duration-300 ease-in-out sm:p-5 md:p-6 lg:p-8">
        <div className="animate-in-fade mx-auto w-full max-w-[1920px] px-0">
          {children}
        </div>
      </main>
    </div>
  )
}
