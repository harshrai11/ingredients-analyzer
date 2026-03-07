"use client"

import {
  Calculator,
  Flame,
  Droplets,
  Drumstick,
  Sparkles,
  ShoppingCart,
  TrendingUp,
  ArrowRight,
} from "lucide-react"

const features = [
  {
    id: "bmi",
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index and understand your health category",
    icon: Calculator,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
    borderColor: "border-chart-1/20",
  },
  {
    id: "calories",
    title: "Calorie Calculator",
    description: "Estimate your daily caloric needs based on your activity level",
    icon: Flame,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
    borderColor: "border-chart-4/20",
  },
  {
    id: "water",
    title: "Water Intake",
    description: "Track daily hydration and meet your water consumption goals",
    icon: Droplets,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
    borderColor: "border-chart-2/20",
  },
  {
    id: "protein",
    title: "Protein Requirement",
    description: "Calculate optimal protein intake for your fitness goals",
    icon: Drumstick,
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
    borderColor: "border-chart-5/20",
  },
  {
    id: "meals",
    title: "AI Meal Generator",
    description: "Get personalized meal suggestions powered by smart algorithms",
    icon: Sparkles,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
  },
  {
    id: "grocery",
    title: "Grocery List",
    description: "Manage your shopping list based on your meal plans",
    icon: ShoppingCart,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
    borderColor: "border-chart-3/20",
  },
  {
    id: "progress",
    title: "Progress Tracker",
    description: "Monitor your fitness journey with visual charts and insights",
    icon: TrendingUp,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
    borderColor: "border-chart-1/20",
  },
]

export function Overview({ onNavigate }) {
  return (
    <div className="space-y-8">
      <div className="animate-fade-in-up">
        <h2 className="text-3xl font-bold font-mono tracking-tight text-foreground text-balance">
          Welcome to <span className="text-primary glow-text">FitPulse</span>
        </h2>
        <p className="mt-2 text-muted-foreground leading-relaxed max-w-xl">
          Your all-in-one health and fitness companion. Track your nutrition, monitor your progress, and reach your goals.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <button
              key={feature.id}
              onClick={() => onNavigate(feature.id)}
              style={{ animationDelay: `${index * 80}ms` }}
              className="animate-fade-in-up glass-card rounded-xl p-5 text-left group hover:border-primary/30 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg ${feature.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${feature.color}`} />
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">{feature.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
