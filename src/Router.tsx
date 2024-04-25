import { Routes, Route } from 'react-router-dom'
import { History } from './pages/History.tsx'
import { Home } from './pages/Home.tsx'
import { DefaultLayout } from './layouts/DefaultLayout/DefaultLayout.tsx'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}
