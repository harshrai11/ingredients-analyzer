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
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

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

export function Sidebar({ activeSection, onSectionChange, collapsed, onToggle }) {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ease-in-out",
        collapsed ? "w-[68px]" : "w-[260px]"
      )}
    >
      <Link to="/" className="flex items-center gap-3 p-4 border-b border-sidebar-border h-16 hover:opacity-80 transition-opacity">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 shrink-0">
          <Activity className="w-5 h-5 text-primary" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in-up">
            <h1 className="text-lg font-bold font-mono text-sidebar-foreground tracking-tight">FitPulse</h1>
          </div>
        )}
      </Link>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              style={{ animationDelay: `${index * 50}ms` }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 animate-slide-in-left group",
                isActive
                  ? "bg-primary/15 text-primary glow-border"
                  : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <Icon className={cn(
                "w-[18px] h-[18px] shrink-0 transition-all duration-200",
                isActive && "animate-float"
              )} />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          )
        })}
      </nav>

      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors text-sm"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  )
}
