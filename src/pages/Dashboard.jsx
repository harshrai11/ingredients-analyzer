"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { Overview } from "@/components/dashboard/overview"
import { BMICalculator } from "@/components/dashboard/bmi-calculator"
import { CalorieCalculator } from "@/components/dashboard/calorie-calculator"
import { WaterIntake } from "@/components/dashboard/water-intake"
import { ProteinCalculator } from "@/components/dashboard/protein-calculator"
import { MealGenerator } from "@/components/dashboard/meal-generator"
import { GroceryList } from "@/components/dashboard/grocery-list"
import { ProgressTracker } from "@/components/dashboard/progress-tracker"
import { cn } from "@/lib/utils"

const sections = {
  dashboard: Overview,
  bmi: BMICalculator,
  calories: CalorieCalculator,
  water: WaterIntake,
  protein: ProteinCalculator,
  meals: MealGenerator,
  grocery: GroceryList,
  progress: ProgressTracker,
}

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const ActiveComponent = sections[activeSection] || Overview

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Mobile Nav */}
      <MobileNav activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Main Content */}
      <main
        className={cn(
          "transition-all duration-300 min-h-screen pt-14 lg:pt-0",
          sidebarCollapsed ? "lg:ml-[68px]" : "lg:ml-[260px]"
        )}
      >
        <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
          <ActiveComponent onNavigate={setActiveSection} />
        </div>
      </main>

      {/* Background glow effect */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  )
}
