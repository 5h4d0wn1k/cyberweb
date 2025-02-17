"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Shield, LayoutDashboard, Users, Bell, Settings, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

export function Sidebar() {
  const pathname = usePathname()

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Alerts", href: "/admin/alerts", icon: Bell },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]

  return (
    <div className="flex flex-col w-64 bg-card">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-8">
          <Shield className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl">Shadownik</span>
        </div>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-primary/5"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="mt-auto p-4">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => signOut()}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}