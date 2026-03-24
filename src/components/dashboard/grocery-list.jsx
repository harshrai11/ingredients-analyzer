"use client"

import { useState, useCallback, useEffect } from "react"
import { ShoppingCart, Plus, Trash2, Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

const categories = [
  "Proteins",
  "Vegetables",
  "Fruits",
  "Grains",
  "Dairy",
  "Snacks",
  "Beverages",
  "Other",
]

const categoryColors = {
  Proteins: "bg-chart-5/20 text-chart-5",
  Vegetables: "bg-chart-3/20 text-chart-3",
  Fruits: "bg-chart-4/20 text-chart-4",
  Grains: "bg-chart-4/20 text-chart-4",
  Dairy: "bg-chart-2/20 text-chart-2",
  Snacks: "bg-chart-1/20 text-chart-1",
  Beverages: "bg-chart-2/20 text-chart-2",
  Other: "bg-muted text-muted-foreground",
}

const suggestedItems = [
  { name: "Chicken Breast", category: "Proteins" },
  { name: "Salmon Fillet", category: "Proteins" },
  { name: "Eggs (dozen)", category: "Proteins" },
  { name: "Greek Yogurt", category: "Dairy" },
  { name: "Broccoli", category: "Vegetables" },
  { name: "Spinach", category: "Vegetables" },
  { name: "Sweet Potatoes", category: "Vegetables" },
  { name: "Brown Rice", category: "Grains" },
  { name: "Quinoa", category: "Grains" },
  { name: "Oats", category: "Grains" },
  { name: "Bananas", category: "Fruits" },
  { name: "Blueberries", category: "Fruits" },
  { name: "Almonds", category: "Snacks" },
  { name: "Whey Protein", category: "Other" },
  { name: "Olive Oil", category: "Other" },
  { name: "Almond Milk", category: "Beverages" },
]

export function GroceryList() {
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Other")
  const [filterCategory, setFilterCategory] = useState("All")
  const [isLoading, setIsLoading] = useState(true)

  // Fetch items on mount
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem('fitnessApp_groceries');
      if (savedItems) {
        setItems(JSON.parse(savedItems) || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addItem = useCallback((name, category) => {
    if (!name.trim()) return;
    
    setItems((prev) => {
      const tempId = Date.now().toString();
      const tempItem = { id: tempId, name: name.trim(), category, checked: false };
      const newItems = [...prev, tempItem];
      localStorage.setItem('fitnessApp_groceries', JSON.stringify(newItems));
      return newItems;
    });
    setNewItem("");
  }, []);

  const toggleItem = useCallback((id) => {
    setItems((prev) => {
      const newItems = prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item));
      localStorage.setItem('fitnessApp_groceries', JSON.stringify(newItems));
      return newItems;
    });
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => {
      const newItems = prev.filter((item) => item.id !== id);
      localStorage.setItem('fitnessApp_groceries', JSON.stringify(newItems));
      return newItems;
    });
  }, []);

  const clearChecked = useCallback(() => {
    setItems((prev) => {
      const newItems = prev.filter((item) => !item.checked);
      localStorage.setItem('fitnessApp_groceries', JSON.stringify(newItems));
      return newItems;
    });
  }, []);

  const filteredItems = filterCategory === "All" ? items : items.filter((i) => i.category === filterCategory)
  const checkedCount = items.filter((i) => i.checked).length
  const totalCount = items.length

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
          <ShoppingCart className="w-5 h-5 text-chart-3" />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-mono text-foreground">Grocery List</h2>
          <p className="text-sm text-muted-foreground">Manage your shopping list</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card rounded-xl p-5 space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addItem(newItem, selectedCategory)}
                placeholder="Add an item..."
                className="flex-1 px-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2.5 rounded-lg bg-input border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <button
                onClick={() => addItem(newItem, selectedCategory)}
                className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setFilterCategory("All")}
                  className={cn(
                    "px-3 py-1 rounded-md text-xs font-medium transition-all",
                    filterCategory === "All" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                  )}
                >
                  All ({totalCount})
                </button>
                {categories.filter((c) => items.some((i) => i.category === c)).map((c) => (
                  <button
                    key={c}
                    onClick={() => setFilterCategory(c)}
                    className={cn(
                      "px-3 py-1 rounded-md text-xs font-medium transition-all",
                      filterCategory === c ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
              {checkedCount > 0 && (
                <button
                  onClick={clearChecked}
                  className="text-xs text-destructive hover:text-destructive/80 transition-colors"
                >
                  Clear checked ({checkedCount})
                </button>
              )}
            </div>
          </div>

          {filteredItems.length === 0 ? (
            <div className="glass-card rounded-xl p-8 text-center">
              <ShoppingCart className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Your grocery list is empty.</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Add items above or use quick-add suggestions.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "glass-card rounded-lg px-4 py-3 flex items-center gap-3 transition-all duration-200 animate-fade-in-up",
                    item.checked && "opacity-50"
                  )}
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className={cn(
                      "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all shrink-0",
                      item.checked ? "bg-primary border-primary" : "border-border hover:border-primary/50"
                    )}
                  >
                    {item.checked && <Check className="w-3 h-3 text-primary-foreground" />}
                  </button>
                  <span className={cn(
                    "flex-1 text-sm font-medium transition-all",
                    item.checked ? "line-through text-muted-foreground" : "text-foreground"
                  )}>
                    {item.name}
                  </span>
                  <span className={cn("px-2 py-0.5 rounded text-[10px] font-medium", categoryColors[item.category])}>
                    {item.category}
                  </span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="glass-card rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-1">Progress</h3>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-3xl font-bold font-mono text-primary">{checkedCount}</span>
              <span className="text-sm text-muted-foreground">/ {totalCount} items</span>
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${totalCount > 0 ? (checkedCount / totalCount) * 100 : 0}%` }}
              />
            </div>
          </div>

          <div className="glass-card rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">Quick Add</h3>
            <div className="flex flex-wrap gap-1.5">
              {suggestedItems.map((suggestion) => {
                const alreadyAdded = items.some(
                  (i) => i.name.toLowerCase() === suggestion.name.toLowerCase()
                )
                return (
                  <button
                    key={suggestion.name}
                    onClick={() => !alreadyAdded && addItem(suggestion.name, suggestion.category)}
                    disabled={alreadyAdded}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-medium transition-all border",
                      alreadyAdded
                        ? "border-primary/30 bg-primary/10 text-primary/60"
                        : "border-border bg-secondary text-muted-foreground hover:text-foreground hover:border-primary/30"
                    )}
                  >
                    {alreadyAdded && <Check className="w-3 h-3 inline mr-1" />}
                    {suggestion.name}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
