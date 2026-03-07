"use client"

import { useState, useCallback } from "react"
import { Droplets, Plus, Minus, RotateCcw, GlassWater } from "lucide-react"
import { cn } from "@/lib/utils"

const presets = [
  { label: "Glass", amount: 250, icon: "250ml" },
  { label: "Bottle", amount: 500, icon: "500ml" },
  { label: "Large", amount: 750, icon: "750ml" },
  { label: "Liter", amount: 1000, icon: "1L" },
]

const tips = [
  "Drink a glass of water first thing in the morning",
  "Keep a water bottle at your desk throughout the day",
  "Set reminders to drink water every hour",
  "Drink water before each meal",
  "Eat water-rich fruits like watermelon and cucumber",
]

export function WaterIntake() {
  const [weight, setWeight] = useState("70")
  const [consumed, setConsumed] = useState(0)
  const [logs, setLogs] = useState([])

  const goal = Math.round(parseFloat(weight || "70") * 35)
  const percentage = Math.min((consumed / goal) * 100, 100)

  const addWater = useCallback((amount) => {
    setConsumed((prev) => prev + amount)
    setLogs((prev) => [
      { time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), amount },
      ...prev,
    ])
  }, [])

  const removeWater = useCallback(() => {
    if (logs.length > 0) {
      const lastLog = logs[0]
      setConsumed((prev) => Math.max(0, prev - lastLog.amount))
      setLogs((prev) => prev.slice(1))
    }
  }, [logs])

  const reset = useCallback(() => {
    setConsumed(0)
    setLogs([])
  }, [])

  const waveHeight = Math.min(percentage, 100)

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
          <Droplets className="w-5 h-5 text-chart-2" />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-mono text-foreground">Water Intake</h2>
          <p className="text-sm text-muted-foreground">Track your daily hydration</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-xl p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">
              Your Weight (kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              Recommended: <span className="text-foreground font-medium">{(goal / 1000).toFixed(1)}L</span> / day
            </p>
          </div>

          <div className="flex justify-center">
            <div className="relative w-40 h-52">
              <div className="absolute inset-0 rounded-2xl border-2 border-chart-2/30 overflow-hidden">
                <div
                  className="absolute bottom-0 left-0 right-0 bg-chart-2/20 transition-all duration-700 ease-out"
                  style={{ height: `${waveHeight}%` }}
                >
                  <div className="absolute inset-0 bg-chart-2/30 animate-pulse" />
                </div>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <GlassWater className="w-8 h-8 text-chart-2 mb-2" />
                <p className="text-3xl font-bold font-mono text-foreground">{Math.round(percentage)}%</p>
                <p className="text-xs text-muted-foreground">{consumed}ml / {goal}ml</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {presets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => addWater(preset.amount)}
                className="flex flex-col items-center gap-1 px-2 py-3 rounded-lg bg-secondary hover:bg-chart-2/15 hover:border-chart-2/30 border border-border transition-all duration-200 group"
              >
                <Plus className="w-3.5 h-3.5 text-muted-foreground group-hover:text-chart-2 transition-colors" />
                <span className="text-xs font-medium text-foreground">{preset.icon}</span>
                <span className="text-[10px] text-muted-foreground">{preset.label}</span>
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={removeWater}
              disabled={logs.length === 0}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-secondary text-muted-foreground hover:text-foreground transition-colors text-sm disabled:opacity-40"
            >
              <Minus className="w-4 h-4" />
              Undo Last
            </button>
            <button
              onClick={reset}
              className="px-4 py-2.5 rounded-lg bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass-card rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">Hydration Log</h3>
            {logs.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">No water logged yet. Start drinking!</p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {logs.map((log, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-secondary/50 text-sm animate-fade-in-up"
                    style={{ animationDelay: `${i * 30}ms` }}
                  >
                    <span className="text-muted-foreground">{log.time}</span>
                    <span className="font-medium text-chart-2">+{log.amount}ml</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="glass-card rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">Hydration Tips</h3>
            <ul className="space-y-2">
              {tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Droplets className="w-3.5 h-3.5 text-chart-2 mt-0.5 shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
