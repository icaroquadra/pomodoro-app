import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header/Header.tsx'
import { DefaultLayoutContainer } from './DefaultLayout.styles.ts'

export function DefaultLayout() {
  return (
    <DefaultLayoutContainer>
      <Header />
      <Outlet />
    </DefaultLayoutContainer>
  )
}
