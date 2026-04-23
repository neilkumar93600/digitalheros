"use client"

import {
  Trophy,
  Target,
  History,
  Heart,
  CreditCard,
  LayoutDashboard,
  Settings,
  LogOut,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Users,
  BarChart3,
  Zap,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  useSidebar,
} from "@/components/ui/sidebar"
import { useAuth } from "@/lib/contexts/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    group: "Main",
  },
  { name: "My Scores", icon: Target, href: "/dashboard/scores", group: "Main" },
  {
    name: "Weekly Draws",
    icon: Trophy,
    href: "/dashboard/draws",
    group: "Main",
    badge: "Live",
  },
  { name: "Charity", icon: Heart, href: "/dashboard/charity", group: "Giving" },
  {
    name: "Impact History",
    icon: History,
    href: "/dashboard/impact",
    group: "Giving",
  },
  {
    name: "Billing",
    icon: CreditCard,
    href: "/dashboard/billing",
    group: "Insights",
  },
  {
    name: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
    group: "Insights",
  },
]

const adminItems = [
  { name: "Admin Panel", icon: ShieldCheck, href: "/admin", group: "Admin" },
  { name: "Manage Users", icon: Users, href: "/admin/users", group: "Admin" },
  { name: "Manage Draws", icon: Trophy, href: "/admin/draws", group: "Admin" },
  {
    name: "Manage Charities",
    icon: Heart,
    href: "/admin/charities",
    group: "Admin",
  },
]

export function DashboardSidebar() {
  const { user, profile, signOut, isAdmin } = useAuth()
  const pathname = usePathname()
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  const groupedItems = navItems.reduce(
    (acc: Record<string, typeof navItems>, item) => {
      if (!acc[item.group]) acc[item.group] = []
      acc[item.group].push(item)
      return acc
    },
    {} as Record<string, typeof navItems>
  )

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-[#3d3a39]/30 bg-[#050507]"
    >
      <SidebarHeader className="flex h-20 items-center justify-center border-b border-[#3d3a39]/20">
        <Link href="/dashboard" className="group flex items-center gap-3 px-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#00d992] to-[#00ffaa] shadow-[0_0_20px_rgba(0,217,146,0.2)] transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(0,217,146,0.4)]">
            <Trophy className="h-5 w-5 text-[#050507]" />
          </div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <span className="font-instrument-serif block text-xl leading-none text-[#f2f2f2]">
                Digital
              </span>
              <span className="text-xs font-bold tracking-[0.2em] text-[#00d992] uppercase">
                Heroes
              </span>
            </motion.div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="scrollbar-hide py-6">
        {Object.entries(groupedItems).map(([group, items]) => (
          <SidebarGroup key={group}>
            {!isCollapsed && (
              <SidebarGroupLabel className="mb-4 px-6 text-[10px] font-bold tracking-[0.3em] text-[#8b949e]/40 uppercase">
                {group}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu className="gap-1 px-3">
                {items.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.name}
                        className={`group relative h-12 rounded-xl transition-all duration-300 ${
                          isActive
                            ? "bg-[#00d992]/10 text-[#00d992]"
                            : "text-[#8b949e] hover:bg-[#101010] hover:text-[#f2f2f2]"
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

                          {!isCollapsed && item.badge && (
                            <SidebarMenuBadge className="ml-auto animate-pulse rounded-full bg-[#00d992] px-1.5 py-0.5 text-[9px] font-bold text-[#050507]">
                              {item.badge}
                            </SidebarMenuBadge>
                          )}

                          {isActive && (
                            <motion.div
                              layoutId="active-pill"
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

        {isAdmin && (
          <SidebarGroup className="mt-4 border-t border-[#3d3a39]/10 pt-4">
            {!isCollapsed && (
              <SidebarGroupLabel className="mb-4 px-6 text-[10px] font-bold tracking-[0.3em] text-[#00d992]/60 uppercase">
                Admin Control
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu className="gap-1 px-3">
                {adminItems.map((item) => {
                  const isActive = pathname.startsWith(item.href)
                  return (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.name}
                        className={`group relative h-12 rounded-xl transition-all duration-300 ${
                          isActive
                            ? "bg-[#00d992]/10 text-[#00d992]"
                            : "text-[#8b949e] hover:bg-[#101010] hover:text-[#00d992]/80"
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
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-[#3d3a39]/20 p-3">
        <div
          className={`overflow-hidden rounded-2xl border border-[#3d3a39]/30 bg-[#101010]/50 backdrop-blur-sm transition-all duration-500 ${isCollapsed ? "p-2" : "p-4"} `}
        >
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <Avatar className="h-10 w-10 border-2 border-[#3d3a39] transition-colors hover:border-[#00d992]">
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-[#1a1a1a] font-bold text-[#00d992]">
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
                  {user?.user_metadata?.full_name || "Golf Hero"}
                </p>
                <p className="truncate font-mono text-[10px] tracking-wider text-[#8b949e] uppercase">
                  {profile?.role === "admin" ? "Admin Access" : "Pro Member"}
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
                <div className="mt-4 h-[1px] bg-[#3d3a39]/30" />
                <button
                  onClick={() => signOut()}
                  className="mt-4 flex w-full items-center justify-between rounded-xl bg-[#050507] px-3 py-2.5 text-xs font-medium text-[#8b949e] transition-all duration-300 hover:bg-[#1a1a1a] hover:text-red-400"
                >
                  Sign Out
                  <LogOut size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {isCollapsed && (
            <button
              onClick={() => signOut()}
              className="mt-2 flex w-full items-center justify-center rounded-lg p-2 text-[#8b949e] transition-all duration-300 hover:bg-red-400/10 hover:text-red-400"
            >
              <LogOut size={18} />
            </button>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
