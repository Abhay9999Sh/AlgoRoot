"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { LayoutDashboard, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out transform md:relative md:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-bold">App Logo</h2>
        <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="md:hidden">
          <X className="h-5 w-5" />
          <span className="sr-only">Close sidebar</span>
        </Button>
      </div>

      <nav className="p-4 space-y-2">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-gray-100 text-gray-900"
        >
          <LayoutDashboard className="h-5 w-5" />
          Details
        </Link>
      </nav>
    </div>
  )
}

