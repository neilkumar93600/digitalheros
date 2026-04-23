"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="relative flex min-h-screen w-full overflow-hidden bg-[#050507] text-[#f2f2f2] selection:bg-[#00d992]/30">
        {/* Advanced Background Effects */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] h-[60%] w-[60%] animate-pulse rounded-full bg-[#00d992]/5 blur-[140px]" />
          <div
            className="absolute right-[-10%] bottom-[-10%] h-[50%] w-[50%] animate-pulse rounded-full bg-[#00ffaa]/5 blur-[140px]"
            style={{ animationDelay: "2s" }}
          />
          <div className="bg-grid-[#f2f2f2]/[0.02] mask-image-radial-gradient absolute top-1/2 left-1/2 h-[100%] w-[100%] -translate-x-1/2 -translate-y-1/2" />
        </div>

        <DashboardSidebar />

        <SidebarInset className="relative z-10 flex flex-col bg-transparent overflow-y-auto">
          <DashboardHeader />
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
