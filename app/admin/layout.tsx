"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="relative flex min-h-screen w-full overflow-hidden bg-[#050507] text-[#f2f2f2] selection:bg-[#00d992]/30">
        {/* Advanced Background Effects */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] h-[50%] w-[50%] animate-pulse rounded-full bg-[#00d992]/5 blur-[140px]" />
          <div
            className="absolute left-[-10%] bottom-[-10%] h-[40%] w-[40%] animate-pulse rounded-full bg-[#00ffaa]/3 blur-[140px]"
            style={{ animationDelay: "2s" }}
          />
          <div className="bg-grid-[#f2f2f2]/[0.02] mask-image-radial-gradient absolute top-1/2 left-1/2 h-[100%] w-[100%] -translate-x-1/2 -translate-y-1/2" />
        </div>

        <AdminSidebar />

        <SidebarInset className="relative z-10 flex flex-col bg-transparent overflow-y-auto">
          {/* Admin Header */}
          <header className="border-b border-[#00d992]/10 bg-[#050507]/80 backdrop-blur-md sticky top-0 z-50">
            <div className="flex h-16 items-center justify-between px-6">
              <div className="flex items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#00d992] to-[#00ffaa]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#050507]">
                    <path d="M12 2L2 22h20L12 2z" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-[#f2f2f2]">Admin Portal</h2>
                  <p className="text-xs text-[#8b949e]">System Administration</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 rounded-full bg-[#00d992]/10 px-3 py-1.5">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-[#00d992]" />
                  <span className="text-xs font-medium text-[#00d992]">System Online</span>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}