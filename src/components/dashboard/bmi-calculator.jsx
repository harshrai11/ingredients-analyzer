"use client"

import { useState } from "react"
import { Calculator, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

const categories = [
  { label: "Underweight", range: "< 18.5", color: "text-chart-2", bg: "bg-chart-2" },
  { label: "Normal", range: "18.5 - 24.9", color: "text-chart-1", bg: "bg-chart-1" },
  { label: "Overweight", range: "25 - 29.9", color: "text-chart-4", bg: "bg-chart-4" },
  { label: "Obese", range: ">= 30", color: "text-destructive", bg: "bg-destructive" },
]

function getCategory(bmi) {
  if (bmi < 18.5) return { label: "Underweight", color: "text-chart-2", advice: "Consider increasing your caloric intake with nutrient-dense foods." }
  if (bmi < 25) return { label: "Normal", color: "text-chart-1", advice: "Great job! Maintain your current healthy lifestyle." }
  if (bmi < 30) return { label: "Overweight", color: "text-chart-4", advice: "Consider increasing physical activity and monitoring caloric intake." }
  return { label: "Obese", color: "text-destructive", advice: "Consult a healthcare provider for personalized guidance." }
}

export function BMICalculator() {
  const [unit, setUnit] = useState("metric")
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [feet, setFeet] = useState("")
  const [inches, setInches] = useState("")
  const [result, setResult] = useState(null)

  function calculate() {
    const w = parseFloat(weight)
    if (unit === "metric") {
      const h = parseFloat(height) / 100
      if (w > 0 && h > 0) {
        const bmi = w / (h * h)
        setResult({ bmi, category: getCategory(bmi) })
      }
    } else {
      const totalInches = parseFloat(feet) * 12 + parseFloat(inches || "0")
      if (w > 0 && totalInches > 0) {
        const bmi = (w * 703) / (totalInches * totalInches)
        setResult({ bmi, category: getCategory(bmi) })
      }
    }
  }

  function reset() {
    setWeight("")
    setHeight("")
    setFeet("")
    setInches("")
    setResult(null)
  }

  const barPosition = result ? Math.min(Math.max(((result.bmi - 10) / 30) * 100, 0), 100) : 0

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
          <Calculator className="w-5 h-5 text-chart-1" />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-mono text-foreground">BMI Calculator</h2>
          <p className="text-sm text-muted-foreground">Calculate your Body Mass Index</p>
        </div>
      </div>

      <div className="glass-card rounded-xl p-6 space-y-5">
        <div className="flex gap-2">
          {["metric", "imperial"].map((u) => (
            <button
              key={u}
              onClick={() => { setUnit(u); reset() }}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                unit === u ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              {u === "metric" ? "Metric (kg/cm)" : "Imperial (lb/ft)"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">
              Weight ({unit === "metric" ? "kg" : "lbs"})
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={unit === "metric" ? "70" : "154"}
              className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
            />
          </div>
          {unit === "metric" ? (
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="175"
                className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
              />
            </div>
          ) : (
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Feet</label>
                <input
                  type="number"
                  value={feet}
                  onChange={(e) => setFeet(e.target.value)}
                  placeholder="5"
                  className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Inches</label>
                <input
                  type="number"
                  value={inches}
                  onChange={(e) => setInches(e.target.value)}
                  placeholder="9"
                  className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={calculate}
            className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Calculate BMI
          </button>
          <button
            onClick={reset}
            className="px-4 py-2.5 rounded-lg bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {result && (
        <div className="glass-card rounded-xl p-6 space-y-5 animate-scale-in">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Your BMI</p>
            <p className={cn("text-5xl font-bold font-mono", result.category.color)}>
              {result.bmi.toFixed(1)}
            </p>
            <p className={cn("text-lg font-semibold mt-1", result.category.color)}>
              {result.category.label}
            </p>
          </div>

          <div className="space-y-2">
            <div className="relative h-3 rounded-full bg-secondary overflow-hidden">
              <div className="absolute inset-0 flex">
                <div className="w-[21.25%] bg-chart-2/60" />
                <div className="w-[16.25%] bg-chart-1/60" />
                <div className="w-[12.5%] bg-chart-4/60" />
                <div className="flex-1 bg-destructive/60" />
              </div>
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-foreground border-2 border-background shadow-lg transition-all duration-500"
                style={{ left: `calc(${barPosition}% - 8px)` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>10</span>
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>40</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">{result.category.advice}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categories.map((cat) => (
              <div
                key={cat.label}
                className={cn(
                  "rounded-lg p-3 border border-border text-center",
                  result.category.label === cat.label && "border-primary/40 bg-primary/5"
                )}
              >
                <div className={cn("w-2 h-2 rounded-full mx-auto mb-1.5", cat.bg)} />
                <p className="text-xs font-medium text-foreground">{cat.label}</p>
                <p className="text-[10px] text-muted-foreground">{cat.range}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
