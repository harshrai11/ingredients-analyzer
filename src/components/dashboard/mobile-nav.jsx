"use client"

import {
  Activity,
  Calculator,
  Flame,
  Droplets,
  Drumstick,
  Sparkles,
  ShoppingCart,
  TrendingUp,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useState } from "react"

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "bmi", label: "BMI Calculator", icon: Calculator },
  { id: "calories", label: "Calorie Calculator", icon: Flame },
  { id: "water", label: "Water Intake", icon: Droplets },
  { id: "protein", label: "Protein Requirement", icon: Drumstick },
  { id: "meals", label: "AI Meal Generator", icon: Sparkles },
  { id: "grocery", label: "Grocery List", icon: ShoppingCart },
  { id: "progress", label: "Progress Tracker", icon: TrendingUp },
]

export function MobileNav({ activeSection, onSectionChange }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-sidebar/95 backdrop-blur-md border-b border-sidebar-border flex items-center justify-between px-4 lg:hidden">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
            <Activity className="w-4 h-4 text-primary" />
          </div>
          <h1 className="text-base font-bold font-mono text-foreground">FitMint</h1>
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <nav className="absolute top-14 left-0 right-0 bg-sidebar border-b border-sidebar-border p-3 space-y-1 animate-fade-in-up">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSectionChange(item.id)
                    setOpen(false)
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
                  )}
                >
                  <Icon className="w-[18px] h-[18px]" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>
      )}
    </>
  )
}
