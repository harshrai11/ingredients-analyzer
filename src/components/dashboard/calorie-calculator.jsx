"use client"

import { useState } from "react"
import { Flame, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

const activityLevels = [
  { label: "Sedentary", value: 1.2, desc: "Little or no exercise" },
  { label: "Light", value: 1.375, desc: "Light exercise 1-3 days/week" },
  { label: "Moderate", value: 1.55, desc: "Moderate exercise 3-5 days/week" },
  { label: "Active", value: 1.725, desc: "Hard exercise 6-7 days/week" },
  { label: "Very Active", value: 1.9, desc: "Very hard exercise, physical job" },
]

const goals = [
  { label: "Lose Weight", modifier: -500, color: "text-chart-2" },
  { label: "Maintain", modifier: 0, color: "text-chart-1" },
  { label: "Gain Weight", modifier: 500, color: "text-chart-4" },
]

export function CalorieCalculator() {
  const [gender, setGender] = useState("male")
  const [age, setAge] = useState("")
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [activity, setActivity] = useState(1.55)
  const [result, setResult] = useState(null)

  function calculate() {
    const a = parseFloat(age)
    const w = parseFloat(weight)
    const h = parseFloat(height)
    if (a > 0 && w > 0 && h > 0) {
      let bmr
      if (gender === "male") {
        bmr = 10 * w + 6.25 * h - 5 * a + 5
      } else {
        bmr = 10 * w + 6.25 * h - 5 * a - 161
      }
      setResult(Math.round(bmr * activity))
    }
  }

  function reset() {
    setAge("")
    setWeight("")
    setHeight("")
    setResult(null)
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
          <Flame className="w-5 h-5 text-chart-4" />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-mono text-foreground">Calorie Calculator</h2>
          <p className="text-sm text-muted-foreground">Estimate your daily caloric needs</p>
        </div>
      </div>

      <div className="glass-card rounded-xl p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">Gender</label>
          <div className="flex gap-2">
            {["male", "female"].map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={cn(
                  "flex-1 px-4 py-2.5 rounded-lg text-sm font-medium capitalize transition-all duration-200",
                  gender === g ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                )}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="25"
              className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="70"
              className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
            />
          </div>
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
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">Activity Level</label>
          <div className="space-y-2">
            {activityLevels.map((level) => (
              <button
                key={level.value}
                onClick={() => setActivity(level.value)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-all duration-200 border",
                  activity === level.value
                    ? "border-primary/40 bg-primary/10 text-foreground"
                    : "border-border bg-secondary/50 text-muted-foreground hover:text-foreground hover:border-border"
                )}
              >
                <span className="font-medium">{level.label}</span>
                <span className="text-xs">{level.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={calculate}
            className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Calculate Calories
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
            <p className="text-sm text-muted-foreground mb-1">Daily Caloric Needs</p>
            <p className="text-5xl font-bold font-mono text-primary glow-text">
              {result.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground mt-1">calories / day</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {goals.map((goal) => (
              <div key={goal.label} className="rounded-lg border border-border p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">{goal.label}</p>
                <p className={cn("text-xl font-bold font-mono", goal.color)}>
                  {(result + goal.modifier).toLocaleString()}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">cal/day</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-border p-3 text-center">
              <p className="text-xs text-muted-foreground mb-0.5">Protein</p>
              <p className="text-lg font-bold text-foreground">{Math.round(result * 0.3 / 4)}g</p>
              <p className="text-[10px] text-muted-foreground">30%</p>
            </div>
            <div className="rounded-lg border border-border p-3 text-center">
              <p className="text-xs text-muted-foreground mb-0.5">Carbs</p>
              <p className="text-lg font-bold text-foreground">{Math.round(result * 0.4 / 4)}g</p>
              <p className="text-[10px] text-muted-foreground">40%</p>
            </div>
            <div className="rounded-lg border border-border p-3 text-center">
              <p className="text-xs text-muted-foreground mb-0.5">Fats</p>
              <p className="text-lg font-bold text-foreground">{Math.round(result * 0.3 / 9)}g</p>
              <p className="text-[10px] text-muted-foreground">30%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
