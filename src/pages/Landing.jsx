import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Activity, Apple, Droplet, ArrowRight, CheckCircle2, Star, Zap, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center overflow-x-hidden selection:bg-primary/30">
      
      {/* Background glow effects */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none opacity-50" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none opacity-40" />
      
      {/* Navigation */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Activity className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xl font-bold tracking-tight">FitMint</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="ghost" className="hidden sm:inline-flex">Sign In</Button>
          </Link>
          <Link to="/dashboard">
            <Button className="rounded-full shadow-lg hover:shadow-primary/25 transition-all">
              Launch App
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </nav>

      <main className="flex-1 w-full flex flex-col items-center">
        
        {/* Hero Section */}
        <section className="w-full max-w-7xl mx-auto px-6 py-24 sm:py-32 flex flex-col items-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20 backdrop-blur-sm shadow-sm"
          >
            <Zap className="w-4 h-4" />
            <span>The New Era of Personal Fitness</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-5xl sm:text-7xl font-bold tracking-tighter mb-8 max-w-4xl"
          >
            Your Body's Data, <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Beautifully Visualized</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="text-muted-foreground text-lg sm:text-xl max-w-2xl mb-12 leading-relaxed"
          >
            Track your macros, hit your protein goals, and generate AI-powered meal plans. Built for athletes, designed for everyone.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Link to="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto rounded-full text-base h-14 px-8 shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-1">
                Start Tracking Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </section>

        {/* Browser Mockup Section */}
        <section className="w-full max-w-6xl mx-auto px-6 pb-32 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-12 border-b border-white/10 bg-white/5 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            {/* Minimal App Preview */}
            <div className="pt-12 p-8 grid grid-cols-1 md:grid-cols-3 gap-6 h-[500px] overflow-hidden">
               <div className="col-span-1 md:col-span-2 space-y-6">
                 <div className="h-48 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/5 p-6 relative overflow-hidden group hover:border-primary/30 transition-colors">
                    <div className="absolute right-0 top-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
                    <h3 className="text-lg font-medium mb-2">Daily Progress</h3>
                    <div className="flex items-end gap-3 h-24 mt-4">
                      {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                        <div key={i} className="flex-1 bg-primary/20 rounded-t-sm" style={{ height: `${h}%` }}>
                          <div className="w-full bg-primary rounded-t-sm transition-all duration-1000" style={{ height: `${h}%` }} />
                        </div>
                      ))}
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                    <div className="h-32 rounded-xl bg-white/5 border border-white/5 p-5 flex flex-col justify-between hover:bg-white/10 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-500"><Zap className="w-4 h-4"/></div>
                      <div><div className="text-2xl font-semibold">2,450</div><div className="text-xs text-muted-foreground">Calories consumed</div></div>
                    </div>
                    <div className="h-32 rounded-xl bg-white/5 border border-white/5 p-5 flex flex-col justify-between hover:bg-white/10 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-500"><Droplet className="w-4 h-4"/></div>
                      <div><div className="text-2xl font-semibold">2.4L</div><div className="text-xs text-muted-foreground">Water tracking</div></div>
                    </div>
                 </div>
               </div>
               <div className="hidden md:flex flex-col gap-6">
                 <div className="flex-1 rounded-xl bg-white/5 border border-white/5 p-6">
                    <h3 className="text-lg font-medium mb-6">Upcoming Meals</h3>
                    <div className="space-y-4">
                      {[1,2,3].map(i => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-white/10" />
                          <div className="flex-1 space-y-2">
                            <div className="h-2 w-24 bg-white/20 rounded-full" />
                            <div className="h-2 w-16 bg-white/10 rounded-full" />
                          </div>
                        </div>
                      ))}
                    </div>
                 </div>
               </div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="w-full py-24 sm:py-32 bg-black/20 border-y border-white/5 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything you need to succeed</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Stop using five different apps. We've combined macro tracking, AI meal generation, and progress visualization into one perfect dashboard.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Activity className="w-6 h-6 text-emerald-500" />}
                title="Smart BMI & Progress"
                description="Hassle-free tracking of your body metrics with beautiful charts that actually make sense."
              />
              <FeatureCard 
                icon={<Apple className="w-6 h-6 text-red-500" />}
                title="AI Meal Generator"
                description="Tell the AI what you crave. It gives you a personalized recipe that precisely hits your macros."
              />
              <FeatureCard 
                icon={<Zap className="w-6 h-6 text-yellow-500" />}
                title="Protein First"
                description="Calculated based on lean body mass. Ensuring you maximize your gains without overeating."
              />
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="w-full max-w-7xl mx-auto px-6 py-24 sm:py-32 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="flex gap-1 mb-6">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-primary text-primary" />)}
            </div>
            <h2 className="text-2xl sm:text-3xl font-medium mb-12 max-w-2xl">"The cleanest fitness dashboard I've ever used. The AI meal generator feels like magic."</h2>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <User className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="text-left">
                <div className="font-medium">Sparsh</div>
                <div className="text-sm text-muted-foreground">Lost 15 lbs using FitPulse</div>
              </div>
              <div className="text-left">
                <div className="font-medium">Sumit joshi </div>
                <div className="text-sm text-muted-foreground">Best app i have used for fitness tracking</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/10 bg-black/40 backdrop-blur-lg py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            <span className="font-semibold">FitPulse</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2024 FitPulse Inc. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all group"
    >
      <div className="w-12 h-12 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  )
}
