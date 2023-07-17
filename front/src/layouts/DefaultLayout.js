import { Outlet } from 'react-router-dom'

import Header from '../components/Header'
import Navigation from '../components/Navigation'

export default Layout = () => {
  return (
    <>
      <Header />
      <Navigation />

      <hr />
      <Outlet />
    </>
  )
}
