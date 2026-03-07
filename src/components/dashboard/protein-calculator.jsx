"use client"

import { useState } from "react"
import { Drumstick, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

const goalOptions = [
  { label: "Sedentary", multiplier: 0.8, desc: "Minimal exercise" },
  { label: "General Fitness", multiplier: 1.2, desc: "Regular exercise" },
  { label: "Muscle Building", multiplier: 1.6, desc: "Intense strength training" },
  { label: "Athlete", multiplier: 2.0, desc: "Professional training" },
  { label: "Weight Loss", multiplier: 1.4, desc: "High protein for fat loss" },
]

const proteinSources = [
  { name: "Chicken Breast", protein: 31, serving: "100g", emoji: "chicken" },
  { name: "Eggs", protein: 6, serving: "1 large", emoji: "egg" },
  { name: "Greek Yogurt", protein: 10, serving: "100g", emoji: "yogurt" },
  { name: "Salmon", protein: 25, serving: "100g", emoji: "fish" },
  { name: "Tofu", protein: 8, serving: "100g", emoji: "tofu" },
  { name: "Lentils", protein: 9, serving: "100g cooked", emoji: "lentils" },
  { name: "Whey Protein", protein: 25, serving: "1 scoop", emoji: "shake" },
  { name: "Cottage Cheese", protein: 11, serving: "100g", emoji: "cheese" },
]

export function ProteinCalculator() {
  const [weight, setWeight] = useState("")
  const [goalIdx, setGoalIdx] = useState(1)
  const [result, setResult] = useState(null)

  function calculate() {
    const w = parseFloat(weight)
    if (w > 0) {
      setResult(Math.round(w * goalOptions[goalIdx].multiplier))
    }
  }

  function reset() {
    setWeight("")
    setResult(null)
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-chart-5/10 flex items-center justify-center">
          <Drumstick className="w-5 h-5 text-chart-5" />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-mono text-foreground">Protein Requirement</h2>
          <p className="text-sm text-muted-foreground">Calculate your optimal daily protein intake</p>
        </div>
      </div>

      <div className="glass-card rounded-xl p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1.5">Body Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="70"
            className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">Fitness Goal</label>
          <div className="space-y-2">
            {goalOptions.map((goal, idx) => (
              <button
                key={goal.label}
                onClick={() => setGoalIdx(idx)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-all duration-200 border",
                  goalIdx === idx
                    ? "border-primary/40 bg-primary/10 text-foreground"
                    : "border-border bg-secondary/50 text-muted-foreground hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="font-medium">{goal.label}</span>
                  <span className="text-xs text-muted-foreground">{goal.desc}</span>
                </div>
                <span className="text-xs font-mono text-primary">{goal.multiplier}g/kg</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={calculate}
            className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Calculate Protein
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
        <div className="space-y-4 animate-scale-in">
          <div className="glass-card rounded-xl p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Daily Protein Requirement</p>
            <p className="text-5xl font-bold font-mono text-primary glow-text">{result}g</p>
            <p className="text-sm text-muted-foreground mt-2">
              Split across meals: ~<span className="text-foreground font-medium">{Math.round(result / 4)}g</span> per meal (4 meals)
            </p>
          </div>

          <div className="glass-card rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">Protein-Rich Foods</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {proteinSources.map((source) => {
                const servingsNeeded = (result / source.protein).toFixed(1)
                return (
                  <div
                    key={source.name}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-secondary/50 border border-border"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">{source.name}</p>
                      <p className="text-xs text-muted-foreground">{source.protein}g per {source.serving}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-chart-5">{servingsNeeded}</p>
                      <p className="text-[10px] text-muted-foreground">servings</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
