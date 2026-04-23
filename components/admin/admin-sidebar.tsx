"use client"

import {
  ShieldCheck,
  Users,
  Trophy,
  Heart,
  LayoutDashboard,
  LogOut,
  Settings,
  ChevronRight,
  Sparkles,
  BarChart3,
  DollarSign,
  UserCheck,
  Gift,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  useSidebar,
} from "@/components/ui/sidebar"
import { useAuth } from "@/lib/contexts/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

const adminNavItems = [
  {
    name: "Overview",
    icon: LayoutDashboard,
    href: "/admin",
    group: "Main",
  },
  {
    name: "Users",
    icon: Users,
    href: "/admin/users",
    group: "Management",
  },
  {
    name: "Draws",
    icon: Trophy,
    href: "/admin/draws",
    group: "Management",
  },
  {
    name: "Charities",
    icon: Heart,
    href: "/admin/charities",
    group: "Management",
  },
]

const adminStatsItems = [
  { name: "Analytics", icon: BarChart3, href: "/admin/analytics", group: "Insights" },
  { name: "Payouts", icon: DollarSign, href: "/admin/payouts", group: "Insights" },
]

export function AdminSidebar() {
  const { user, profile, signOut } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  const allItems = [...adminNavItems, ...adminStatsItems]
  const groupedItems = allItems.reduce(
    (acc, item) => {
      if (!acc[item.group]) acc[item.group] = []
      acc[item.group].push(item)
      return acc
    },
    {} as Record<string, typeof allItems>
  )

  const handleSignOut = async () => {
    await signOut()
    router.push("/login")
  }

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-[#00d992]/20 bg-gradient-to-b from-[#050507] to-[#0a0a0a]"
    >
      <SidebarHeader className="flex h-20 items-center justify-center border-b border-[#00d992]/10">
        <Link href="/admin" className="group flex items-center gap-3 px-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#00d992] to-[#00ffaa] shadow-[0_0_20px_rgba(0,217,146,0.3)] transition-all duration-500 group-hover:shadow-[0_0_35px_rgba(0,217,146,0.5)]">
            <ShieldCheck className="h-5 w-5 text-[#050507]" />
          </div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <span className="font-instrument-serif block text-xl leading-none text-[#f2f2f2]">
                Admin
              </span>
              <span className="text-xs font-bold tracking-[0.2em] text-[#00d992] uppercase">
                Portal
              </span>
            </motion.div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="scrollbar-hide py-6">
        {Object.entries(groupedItems).map(([group, items]) => (
          <SidebarGroup key={group}>
            {!isCollapsed && (
              <SidebarGroupLabel className="mb-4 px-6 text-[10px] font-bold tracking-[0.3em] text-[#00d992]/40 uppercase">
                {group}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu className="gap-1 px-3">
                {items.map((item) => {
                  const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
                  return (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.name}
                        className={`group relative h-12 rounded-xl transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-[#00d992]/20 to-[#00d992]/5 text-[#00d992] border border-[#00d992]/30"
                            : "text-[#8b949e] hover:bg-[#101010] hover:text-[#f2f2f2] border border-transparent"
                        } `}
                      >
                        <Link
                          href={item.href}
                          className="flex w-full items-center"
                        >
                          <item.icon
                            className={`h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-[#00d992]" : "text-inherit"}`}
                          />
                          {!isCollapsed && (
                            <span className="ml-3 text-sm font-medium tracking-tight">
                              {item.name}
                            </span>
                          )}

                          {isActive && (
                            <motion.div
                              layoutId="admin-active-pill"
                              className="absolute left-0 h-6 w-1 rounded-r-full bg-[#00d992]"
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                              }}
                            />
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-[#00d992]/10 p-3">
        <div
          className={`overflow-hidden rounded-2xl border border-[#00d992]/10 bg-gradient-to-b from-[#101010] to-[#0a0a0a] backdrop-blur-sm transition-all duration-500 ${isCollapsed ? "p-2" : "p-4"} `}
        >
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <Avatar className="h-10 w-10 border-2 border-[#00d992]/30 transition-colors hover:border-[#00d992]">
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-gradient-to-br from-[#00d992]/20 to-[#00d992]/10 font-bold text-[#00d992]">
                  {user?.email?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#050507] bg-[#00d992]">
                <Sparkles size={8} className="text-[#050507]" />
              </div>
            </div>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="min-w-0 flex-1"
              >
                <p className="truncate text-sm leading-tight font-semibold text-[#f2f2f2]">
                  {profile?.full_name || "Admin"}
                </p>
                <p className="truncate font-mono text-[10px] tracking-wider text-[#00d992] uppercase">
                  Super Admin
                </p>
              </motion.div>
            )}
          </div>

          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 h-[1px] bg-gradient-to-r from-[#00d992]/30 via-[#00d992]/5 to-transparent" />
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#050507] px-3 py-2.5 text-xs font-medium text-[#8b949e] transition-all duration-300 hover:bg-[#1a1a1a] hover:text-[#f2f2f2]"
                  >
                    <UserCheck size={14} />
                    User View
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center justify-center rounded-xl bg-red-500/10 px-3 py-2.5 text-xs font-medium text-red-400 transition-all duration-300 hover:bg-red-500/20"
                  >
                    <LogOut size={14} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {isCollapsed && (
            <div className="mt-2 flex flex-col gap-2">
              <button
                onClick={() => router.push("/dashboard")}
                className="flex w-full items-center justify-center rounded-lg p-2 text-[#8b949e] transition-all duration-300 hover:bg-[#00d992]/10 hover:text-[#00d992]"
              >
                <UserCheck size={18} />
              </button>
              <button
                onClick={handleSignOut}
                className="flex w-full items-center justify-center rounded-lg p-2 text-[#8b949e] transition-all duration-300 hover:bg-red-500/10 hover:text-red-400"
              >
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}