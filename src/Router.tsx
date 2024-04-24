import { Routes, Route } from 'react-router-dom'
import { History } from './pages/History.tsx'
import { Home } from './pages/Home.tsx'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/history" element={<History />} />
    </Routes>
  )
}
