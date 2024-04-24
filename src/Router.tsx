import { Routes, Route } from 'react-router-dom'
import { History } from './pages/History.tsx'
import { Home } from './pages/Home.tsx'
import { DefaultLaoyout } from './layouts/DefaultLaoyout.tsx'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLaoyout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}
