"use client"

import { useState, useEffect } from "react"
import { Sparkles, RefreshCw, Clock, Flame as FlameIcon, Drumstick, Wheat, Droplet, Target, Leaf, Beef, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

export function MealGenerator() {
  const [targetCalories, setTargetCalories] = useState(2000)
  const [targetProtein, setTargetProtein] = useState(130)
  const [dietPreference, setDietPreference] = useState("Any")
  const [mealCount, setMealCount] = useState(4)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [dailyPlan, setDailyPlan] = useState([])
  const [planSummary, setPlanSummary] = useState(null)

  // Fetch existing plan on mount
  useEffect(() => {
    try {
      const savedMeals = localStorage.getItem('fitnessApp_meals');
      if (savedMeals) {
        const parsed = JSON.parse(savedMeals);
        setDailyPlan(parsed.plan || []);
        setPlanSummary(parsed.summary || null);
      }
      
      const savedPrefs = localStorage.getItem('fitnessApp_userPrefs');
      if (savedPrefs) {
        const parsed = JSON.parse(savedPrefs);
        if (parsed.targetCalories) setTargetCalories(parsed.targetCalories);
        if (parsed.targetProtein) setTargetProtein(parsed.targetProtein);
      }
    } catch (e) {
      console.error("Failed to load saved data", e);
    }
  }, []);

  const generateMeals = async () => {
    setLoading(true)
    setError(null)

    try {
      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
      if (!API_KEY) {
        throw new Error("Gemini API key is missing. Please check your .env.local file.");
      }

      const prompt = `Generate a daily Indian cuisine meal plan snippet.
You MUST respond with ONLY valid, raw JSON. Do NOT wrap the JSON in markdown code blocks like \`\`\`json. Just the JSON object.
Focus exclusively on traditional and healthy Indian meals (e.g., Dal, Roti, Paneer, Chicken Tikka, Poha, Idli).
Target Calories: ${targetCalories} kcal
Target Protein: ${targetProtein} g
Diet Preference: ${dietPreference === "Any" ? "No specific restrictions" : dietPreference}
Requirements: Exactly ${mealCount} meals.
Format:
{
  "summary": { "calories": number, "protein": number, "carbs": number, "fats": number },
  "plan": [
    {
      "type": "string (e.g., Breakfast, Lunch)",
      "name": "string",
      "diet": "Veg or Non-Veg",
      "prepTime": "string (e.g., 15 mins)",
      "calories": number,
      "protein": number,
      "carbs": number,
      "fats": number,
      "ingredients": ["string"],
      "instructions": ["string"]
    }
  ]
}`;

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7 }
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || "Failed to contact Gemini API");

      let resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!resultText) throw new Error("Invalid response format from AI");
      
      resultText = resultText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const generatedData = JSON.parse(resultText);

      if (generatedData.plan && generatedData.summary) {
         setDailyPlan(generatedData.plan);
         setPlanSummary(generatedData.summary);
         localStorage.setItem('fitnessApp_meals', JSON.stringify(generatedData));
      } else {
         throw new Error("Generated data doesn't match expected structure.");
      }
      
      localStorage.setItem('fitnessApp_userPrefs', JSON.stringify({ targetCalories, targetProtein }));
      
    } catch (err) {
      console.error("Meal Generation Error:", err);
      setError(err.message || "Failed to generate meals. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-mono text-foreground">AI Meal Generator</h2>
          <p className="text-sm text-muted-foreground">Powered by Gemini AI</p>
        </div>
      </div>

      <div className="glass-card rounded-xl p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                Target Calories
              </label>
              <span className="text-xs font-mono text-muted-foreground">{targetCalories} kcal</span>
            </div>
            <input 
              type="range" 
              value={targetCalories}
              onChange={(e) => setTargetCalories(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
              min="1000" max="4000" step="50"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Drumstick className="w-4 h-4 text-primary" />
                Target Protein
              </label>
              <span className="text-xs font-mono text-muted-foreground">{targetProtein} g</span>
            </div>
            <input 
              type="range" 
              value={targetProtein}
              onChange={(e) => setTargetProtein(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
              min="50" max="300" step="5"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Leaf className="w-4 h-4 text-primary" />
            Diet Preference
          </label>
          <div className="flex gap-3">
            {["Any", "Veg", "Non-Veg"].map((d) => (
              <button
                key={d}
                onClick={() => setDietPreference(d)}
                className={cn(
                  "flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-300 border",
                  dietPreference === d 
                    ? "bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(var(--primary),0.1)]" 
                    : "bg-secondary/50 border-transparent text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <div className="flex items-center justify-center gap-2">
                  {d === "Veg" && <Leaf className="w-4 h-4" />}
                  {d === "Non-Veg" && <Beef className="w-4 h-4" />}
                  {d}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              Number of Meals
            </label>
            <span className="text-xs font-mono text-muted-foreground">{mealCount} meals</span>
          </div>
          <div className="flex gap-2">
            {[2, 3, 4, 5, 6].map((count) => (
               <button
                 key={count}
                 onClick={() => setMealCount(count)}
                 className={cn(
                   "flex-1 py-2 rounded-lg text-sm font-medium transition-all border",
                   mealCount === count
                     ? "bg-primary text-primary-foreground border-primary"
                     : "bg-secondary/50 text-muted-foreground border-transparent hover:bg-secondary hover:text-foreground"
                 )}
               >
                 {count}
               </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <button
          onClick={generateMeals}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all disabled:opacity-60 shadow-lg shadow-primary/20 hover:shadow-primary/40 relative overflow-hidden group"
        >
          {loading && (
            <div className="absolute inset-0 w-full h-full bg-primary-foreground/20 animate-pulse" />
          )}
          {loading ? (
            <RefreshCw className="w-5 h-5 animate-spin relative z-10" />
          ) : (
            <Sparkles className="w-5 h-5 relative z-10" />
          )}
          <span className="relative z-10">{loading ? "AI is Generating Plan..." : "Generate Daily Plan"}</span>
        </button>
      </div>

      {planSummary && (
        <div className="glass-card rounded-xl p-6 animate-fade-in-up border-primary/20 bg-primary/5">
          <h3 className="text-lg font-bold text-foreground mb-4">Daily Plan Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground flex items-center gap-1"><FlameIcon className="w-3 h-3"/> Total Calories</span>
              <p className="text-xl font-bold font-mono">
                {planSummary.calories}
                <span className="text-xs font-normal text-muted-foreground"> / {targetCalories}</span>
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground flex items-center gap-1"><Drumstick className="w-3 h-3"/> Total Protein</span>
              <p className="text-xl font-bold font-mono text-chart-5">
                {planSummary.protein}g
                <span className="text-xs font-normal text-muted-foreground"> / {targetProtein}g</span>
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground flex items-center gap-1"><Wheat className="w-3 h-3"/> Carbs</span>
              <p className="text-xl font-bold font-mono text-chart-4">{planSummary.carbs}g</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground flex items-center gap-1"><Droplet className="w-3 h-3"/> Fats</span>
              <p className="text-xl font-bold font-mono text-chart-2">{planSummary.fats}g</p>
            </div>
          </div>
        </div>
      )}

      {dailyPlan.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">Your AI-Generated Meals</h3>
          {dailyPlan.map((meal, index) => (
            <MealCard key={`${meal.type}-${index}`} meal={meal} index={index} />
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
      className="glass-card rounded-xl overflow-hidden animate-fade-in-up border-transparent hover:border-border transition-colors"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div
        className="p-5 cursor-pointer hover:bg-secondary/30 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-[10px] uppercase tracking-wider text-primary font-semibold mb-2">
              {meal.type}
              {meal.diet?.toLowerCase() === "veg" ? <Leaf className="w-3 h-3" /> : <Beef className="w-3 h-3" />}
            </span>
            <h3 className="text-lg font-bold text-foreground leading-tight">{meal.name}</h3>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground bg-secondary/50 px-2.5 py-1 rounded-md shrink-0">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">{meal.prepTime}</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 bg-background/50 p-3 rounded-lg border border-border/50">
          <div className="flex items-center gap-2">
            <FlameIcon className="w-4 h-4 text-chart-4" />
            <div>
              <p className="text-sm font-bold text-foreground leading-none">{meal.calories}</p>
              <p className="text-[10px] text-muted-foreground">cal</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Drumstick className="w-4 h-4 text-chart-5" />
            <div>
              <p className="text-sm font-bold text-foreground leading-none">{meal.protein}g</p>
              <p className="text-[10px] text-muted-foreground">protein</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wheat className="w-4 h-4 text-chart-4" />
            <div>
              <p className="text-sm font-bold text-foreground leading-none">{meal.carbs}g</p>
              <p className="text-[10px] text-muted-foreground">carbs</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Droplet className="w-4 h-4 text-chart-2" />
            <div>
              <p className="text-sm font-bold text-foreground leading-none">{meal.fats}g</p>
              <p className="text-[10px] text-muted-foreground">fats</p>
            </div>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="px-5 pb-5 pt-2 space-y-5 animate-fade-in-up">
          <div className="h-px w-full bg-border" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-primary rounded-full"></span>
                Ingredients
              </h4>
              <ul className="space-y-2">
                {meal.ingredients?.map((ing, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                    {ing}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-primary rounded-full"></span>
                Instructions
              </h4>
              <ol className="space-y-3">
                {meal.instructions?.map((step, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-3">
                    <span className="w-5 h-5 rounded-full bg-secondary text-foreground text-xs font-bold flex items-center justify-center shrink-0 border border-border">
                      {i + 1}
                    </span>
                    <span className="text-foreground/80 pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
