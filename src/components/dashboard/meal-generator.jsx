"use client"

import { useState, useCallback } from "react"
import { Sparkles, RefreshCw, Clock, Flame as FlameIcon, Drumstick, Wheat, Droplet } from "lucide-react"
import { cn } from "@/lib/utils"

const mealDatabase = [
  {
    name: "Grilled Chicken & Quinoa Bowl",
    type: "Lunch",
    calories: 520,
    protein: 42,
    carbs: 48,
    fats: 14,
    prepTime: "25 min",
    ingredients: ["200g chicken breast", "100g quinoa", "1 cup mixed greens", "1/2 avocado", "Cherry tomatoes", "Lemon dressing"],
    instructions: ["Cook quinoa per package instructions", "Season and grill chicken breast for 6-7 min each side", "Assemble bowl with greens, quinoa, sliced chicken", "Top with avocado and tomatoes, drizzle with dressing"],
  },
  {
    name: "Protein Overnight Oats",
    type: "Breakfast",
    calories: 380,
    protein: 28,
    carbs: 42,
    fats: 12,
    prepTime: "5 min + overnight",
    ingredients: ["80g rolled oats", "1 scoop whey protein", "200ml almond milk", "1 tbsp chia seeds", "1/2 banana", "Handful of berries"],
    instructions: ["Mix oats, protein powder, chia seeds in a jar", "Pour in almond milk and stir well", "Refrigerate overnight", "Top with sliced banana and berries before eating"],
  },
  {
    name: "Salmon Stir-Fry",
    type: "Dinner",
    calories: 480,
    protein: 38,
    carbs: 30,
    fats: 22,
    prepTime: "20 min",
    ingredients: ["200g salmon fillet", "1 cup broccoli", "1 bell pepper", "100g brown rice", "2 tbsp soy sauce", "1 tsp sesame oil"],
    instructions: ["Cook brown rice per package instructions", "Cut salmon into chunks, stir-fry for 4-5 minutes", "Add vegetables and cook for 3 minutes", "Add soy sauce and sesame oil, serve over rice"],
  },
  {
    name: "Greek Yogurt Power Bowl",
    type: "Snack",
    calories: 290,
    protein: 24,
    carbs: 28,
    fats: 10,
    prepTime: "5 min",
    ingredients: ["200g Greek yogurt", "30g granola", "1 tbsp honey", "Mixed berries", "1 tbsp almond butter", "Chia seeds"],
    instructions: ["Add Greek yogurt to a bowl", "Top with granola and mixed berries", "Drizzle honey and almond butter", "Sprinkle chia seeds on top"],
  },
  {
    name: "Turkey & Sweet Potato Plate",
    type: "Lunch",
    calories: 450,
    protein: 40,
    carbs: 38,
    fats: 14,
    prepTime: "30 min",
    ingredients: ["200g ground turkey", "1 medium sweet potato", "1 cup green beans", "1 tbsp olive oil", "Paprika & garlic powder", "Salt & pepper"],
    instructions: ["Cube and roast sweet potato at 200C for 20 min", "Brown ground turkey with seasonings", "Steam green beans until tender-crisp", "Plate together and drizzle with olive oil"],
  },
  {
    name: "Egg & Veggie Scramble",
    type: "Breakfast",
    calories: 340,
    protein: 26,
    carbs: 12,
    fats: 22,
    prepTime: "10 min",
    ingredients: ["3 large eggs", "1 egg white", "1/2 cup spinach", "1/4 cup mushrooms", "Cherry tomatoes", "Feta cheese"],
    instructions: ["Whisk eggs and egg white together", "Sauté mushrooms and spinach in a pan", "Pour in egg mixture and scramble gently", "Top with tomatoes and crumbled feta"],
  },
  {
    name: "Chickpea Curry Bowl",
    type: "Dinner",
    calories: 410,
    protein: 18,
    carbs: 52,
    fats: 16,
    prepTime: "25 min",
    ingredients: ["1 can chickpeas", "200ml coconut milk", "1 cup spinach", "100g basmati rice", "2 tbsp curry paste", "1 tbsp coconut oil"],
    instructions: ["Cook basmati rice per package instructions", "Sauté curry paste in coconut oil for 1 minute", "Add chickpeas and coconut milk, simmer 10 min", "Stir in spinach, serve over rice"],
  },
  {
    name: "Tuna Avocado Wrap",
    type: "Lunch",
    calories: 390,
    protein: 32,
    carbs: 28,
    fats: 18,
    prepTime: "10 min",
    ingredients: ["1 can tuna in water", "1/2 avocado", "1 whole wheat tortilla", "Lettuce leaves", "1 tbsp Greek yogurt", "Lemon juice"],
    instructions: ["Drain tuna and mix with mashed avocado", "Add Greek yogurt and lemon juice", "Lay lettuce on tortilla, add tuna mixture", "Roll tightly and slice in half"],
  },
]

const dietTypes = ["All", "Breakfast", "Lunch", "Dinner", "Snack"]
const calorieRanges = ["Any", "Under 300", "300-450", "Over 450"]

export function MealGenerator() {
  const [diet, setDiet] = useState("All")
  const [calorieRange, setCalorieRange] = useState("Any")
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)

  const generateMeals = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      let filtered = [...mealDatabase]

      if (diet !== "All") {
        filtered = filtered.filter((m) => m.type === diet)
      }

      if (calorieRange === "Under 300") filtered = filtered.filter((m) => m.calories < 300)
      else if (calorieRange === "300-450") filtered = filtered.filter((m) => m.calories >= 300 && m.calories <= 450)
      else if (calorieRange === "Over 450") filtered = filtered.filter((m) => m.calories > 450)

      const shuffled = filtered.sort(() => Math.random() - 0.5)
      setMeals(shuffled.slice(0, Math.min(3, shuffled.length)))
      setLoading(false)
    }, 800)
  }, [diet, calorieRange])

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-mono text-foreground">AI Meal Generator</h2>
          <p className="text-sm text-muted-foreground">Get personalized meal suggestions</p>
        </div>
      </div>

      <div className="glass-card rounded-xl p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">Meal Type</label>
          <div className="flex flex-wrap gap-2">
            {dietTypes.map((d) => (
              <button
                key={d}
                onClick={() => setDiet(d)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  diet === d ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">Calorie Range</label>
          <div className="flex flex-wrap gap-2">
            {calorieRanges.map((r) => (
              <button
                key={r}
                onClick={() => setCalorieRange(r)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  calorieRange === r ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={generateMeals}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-all disabled:opacity-60"
        >
          {loading ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          {loading ? "Generating..." : "Generate Meals"}
        </button>
      </div>

      {meals.length > 0 && (
        <div className="space-y-4">
          {meals.map((meal, index) => (
            <MealCard key={`${meal.name}-${index}`} meal={meal} index={index} />
          ))}
        </div>
      )}
    </div>
  )
}

function MealCard({ meal, index }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className="glass-card rounded-xl overflow-hidden animate-fade-in-up"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div
        className="p-5 cursor-pointer hover:bg-secondary/30 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">{meal.type}</span>
            <h3 className="text-lg font-bold text-foreground">{meal.name}</h3>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-xs">{meal.prepTime}</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <div className="flex items-center gap-1.5">
            <FlameIcon className="w-3.5 h-3.5 text-chart-4" />
            <div>
              <p className="text-sm font-bold text-foreground">{meal.calories}</p>
              <p className="text-[10px] text-muted-foreground">cal</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Drumstick className="w-3.5 h-3.5 text-chart-5" />
            <div>
              <p className="text-sm font-bold text-foreground">{meal.protein}g</p>
              <p className="text-[10px] text-muted-foreground">protein</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Wheat className="w-3.5 h-3.5 text-chart-4" />
            <div>
              <p className="text-sm font-bold text-foreground">{meal.carbs}g</p>
              <p className="text-[10px] text-muted-foreground">carbs</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Droplet className="w-3.5 h-3.5 text-chart-2" />
            <div>
              <p className="text-sm font-bold text-foreground">{meal.fats}g</p>
              <p className="text-[10px] text-muted-foreground">fats</p>
            </div>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="px-5 pb-5 border-t border-border pt-4 space-y-4 animate-fade-in-up">
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Ingredients</h4>
            <ul className="space-y-1">
              {meal.ingredients.map((ing, i) => (
                <li key={i} className="text-sm text-foreground flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {ing}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Instructions</h4>
            <ol className="space-y-2">
              {meal.instructions.map((step, i) => (
                <li key={i} className="text-sm text-muted-foreground flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  )
}
