import { Routes, Route } from 'react-router-dom'

import Layout from './layout'
import Home from './home'
import Notes from './notes'
import Favorites from './favorites'
import NoMatch from './noMatch'

export default Pages = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="notes" element={<Notes />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  )
}
