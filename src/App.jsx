import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/Landing"
import DashboardPage from "./pages/Dashboard"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  )
}
