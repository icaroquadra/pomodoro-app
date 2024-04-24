import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'

export function DefaultLaoyout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}
