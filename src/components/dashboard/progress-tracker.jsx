"use client"

import { useState, useCallback } from "react"
import { TrendingUp, Plus, Trash2, Scale, Ruler, Target } from "lucide-react"
import { cn } from "@/lib/utils"

export function ProgressTracker() {
  const [entries, setEntries] = useState([
  
  ])

  const [showForm, setShowForm] = useState(false)
  const [formDate, setFormDate] = useState("")
  const [formWeight, setFormWeight] = useState("")
  const [formBodyFat, setFormBodyFat] = useState("")
  const [formWaist, setFormWaist] = useState("")
  const [formNotes, setFormNotes] = useState("")

  const addEntry = useCallback(() => {
    const w = parseFloat(formWeight)
    if (!formDate || w <= 0) return

    const newEntry = {
      id: Date.now().toString(),
      date: formDate,
      weight: w,
      bodyFat: formBodyFat ? parseFloat(formBodyFat) : undefined,
      waist: formWaist ? parseFloat(formWaist) : undefined,
      notes: formNotes,
    }

    setEntries((prev) => [...prev, newEntry].sort((a, b) => a.date.localeCompare(b.date)))
    setFormDate("")
    setFormWeight("")
    setFormBodyFat("")
    setFormWaist("")
    setFormNotes("")
    setShowForm(false)
  }, [formDate, formWeight, formBodyFat, formWaist, formNotes])

  const removeEntry = useCallback((id) => {
    setEntries((prev) => prev.filter((e) => e.id !== id))
  }, [])

  const latest = entries[entries.length - 1]
  const first = entries[0]
  const weightChange = latest && first ? (latest.weight - first.weight).toFixed(1) : "0"
  const fatChange = latest?.bodyFat && first?.bodyFat ? (latest.bodyFat - first.bodyFat).toFixed(1) : null
  const waistChange = latest?.waist && first?.waist ? (latest.waist - first.waist).toFixed(1) : null

  const maxWeight = Math.max(...entries.map((e) => e.weight)) + 2
  const minWeight = Math.min(...entries.map((e) => e.weight)) - 2
  const weightRange = maxWeight - minWeight || 1

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-chart-1" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-mono text-foreground">Progress Tracker</h2>
            <p className="text-sm text-muted-foreground">Monitor your fitness journey</p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Log Entry</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Scale className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Weight Change</span>
          </div>
          <p className={cn("text-3xl font-bold font-mono", parseFloat(weightChange) <= 0 ? "text-chart-1" : "text-chart-4")}>
            {parseFloat(weightChange) > 0 ? "+" : ""}{weightChange} kg
          </p>
          {latest && (
            <p className="text-xs text-muted-foreground mt-1">Current: {latest.weight} kg</p>
          )}
        </div>
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Body Fat</span>
          </div>
          <p className={cn("text-3xl font-bold font-mono", fatChange && parseFloat(fatChange) <= 0 ? "text-chart-1" : "text-chart-4")}>
            {fatChange ? (parseFloat(fatChange) > 0 ? "+" : "") + fatChange + "%" : "N/A"}
          </p>
          {latest?.bodyFat && (
            <p className="text-xs text-muted-foreground mt-1">Current: {latest.bodyFat}%</p>
          )}
        </div>
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Ruler className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Waist</span>
          </div>
          <p className={cn("text-3xl font-bold font-mono", waistChange && parseFloat(waistChange) <= 0 ? "text-chart-1" : "text-chart-4")}>
            {waistChange ? (parseFloat(waistChange) > 0 ? "+" : "") + waistChange + " cm" : "N/A"}
          </p>
          {latest?.waist && (
            <p className="text-xs text-muted-foreground mt-1">Current: {latest.waist} cm</p>
          )}
        </div>
      </div>

      {showForm && (
        <div className="glass-card rounded-xl p-6 space-y-4 animate-scale-in">
          <h3 className="text-sm font-semibold text-foreground">New Log Entry</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Date</label>
              <input
                type="date"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Weight (kg) *</label>
              <input
                type="number"
                value={formWeight}
                onChange={(e) => setFormWeight(e.target.value)}
                placeholder="79"
                step="0.1"
                className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Body Fat %</label>
              <input
                type="number"
                value={formBodyFat}
                onChange={(e) => setFormBodyFat(e.target.value)}
                placeholder="20"
                step="0.1"
                className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Waist (cm)</label>
              <input
                type="number"
                value={formWaist}
                onChange={(e) => setFormWaist(e.target.value)}
                placeholder="84"
                step="0.1"
                className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Notes</label>
            <input
              type="text"
              value={formNotes}
              onChange={(e) => setFormNotes(e.target.value)}
              placeholder="How are you feeling?"
              className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={addEntry}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Save Entry
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-lg bg-secondary text-muted-foreground text-sm hover:text-foreground transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {entries.length >= 2 && (
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Weight Trend</h3>
          <div className="relative h-48">
            <div className="absolute left-0 top-0 bottom-6 w-10 flex flex-col justify-between text-[10px] text-muted-foreground">
              <span>{maxWeight.toFixed(0)}</span>
              <span>{((maxWeight + minWeight) / 2).toFixed(0)}</span>
              <span>{minWeight.toFixed(0)}</span>
            </div>
            <div className="ml-12 h-full relative">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="border-t border-border/30 w-full" />
                ))}
              </div>
              <svg className="absolute inset-0 w-full h-[calc(100%-24px)]" preserveAspectRatio="none">
                <polyline
                  fill="none"
                  stroke="oklch(0.75 0.18 165)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={entries
                    .map((e, i) => {
                      const x = entries.length === 1 ? 50 : (i / (entries.length - 1)) * 100
                      const y = 100 - ((e.weight - minWeight) / weightRange) * 100
                      return `${x}%,${y}%`
                    })
                    .join(" ")}
                />
                <polygon
                  fill="oklch(0.75 0.18 165 / 0.1)"
                  points={[
                    ...entries.map((e, i) => {
                      const x = entries.length === 1 ? 50 : (i / (entries.length - 1)) * 100
                      const y = 100 - ((e.weight - minWeight) / weightRange) * 100
                      return `${x}%,${y}%`
                    }),
                    `100%,100%`,
                    `0%,100%`,
                  ].join(" ")}
                />
                {entries.map((e, i) => {
                  const x = entries.length === 1 ? 50 : (i / (entries.length - 1)) * 100
                  const y = 100 - ((e.weight - minWeight) / weightRange) * 100
                  return (
                    <circle
                      key={e.id}
                      cx={`${x}%`}
                      cy={`${y}%`}
                      r="4"
                      fill="oklch(0.75 0.18 165)"
                      stroke="oklch(0.15 0.008 260)"
                      strokeWidth="2"
                    />
                  )
                })}
              </svg>
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-muted-foreground">
                {entries.map((e, i) => (
                  <span key={e.id} className={entries.length > 7 && i % 2 !== 0 ? "hidden sm:inline" : ""}>
                    {new Date(e.date).toLocaleDateString("en", { month: "short", day: "numeric" })}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="glass-card rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Log History</h3>
        </div>
        {entries.length === 0 ? (
          <div className="p-8 text-center">
            <TrendingUp className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No entries yet. Start logging your progress!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-5 py-2.5 text-xs text-muted-foreground font-medium">Date</th>
                  <th className="text-left px-5 py-2.5 text-xs text-muted-foreground font-medium">Weight</th>
                  <th className="text-left px-5 py-2.5 text-xs text-muted-foreground font-medium hidden sm:table-cell">Body Fat</th>
                  <th className="text-left px-5 py-2.5 text-xs text-muted-foreground font-medium hidden sm:table-cell">Waist</th>
                  <th className="text-left px-5 py-2.5 text-xs text-muted-foreground font-medium hidden md:table-cell">Notes</th>
                  <th className="w-10" />
                </tr>
              </thead>
              <tbody>
                {[...entries].reverse().map((entry, index) => (
                  <tr
                    key={entry.id}
                    className="border-b border-border/50 hover:bg-secondary/30 transition-colors animate-fade-in-up"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <td className="px-5 py-2.5 font-medium text-foreground">
                      {new Date(entry.date).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-5 py-2.5 text-foreground font-mono">{entry.weight} kg</td>
                    <td className="px-5 py-2.5 text-muted-foreground font-mono hidden sm:table-cell">
                      {entry.bodyFat ? `${entry.bodyFat}%` : "-"}
                    </td>
                    <td className="px-5 py-2.5 text-muted-foreground font-mono hidden sm:table-cell">
                      {entry.waist ? `${entry.waist} cm` : "-"}
                    </td>
                    <td className="px-5 py-2.5 text-muted-foreground hidden md:table-cell">{entry.notes || "-"}</td>
                    <td className="px-3 py-2.5">
                      <button
                        onClick={() => removeEntry(entry.id)}
                        className="text-muted-foreground/40 hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
