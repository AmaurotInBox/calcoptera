import { Routes, Route } from 'react-router-dom'

import DefaultLayout from '../layouts/DefaultLayout'
import ErrorLayout from '../layouts/ErrorLayout'
import Home from './Home'
import Notes from './Notes'
import Favorites from './Favorites'
import NoMatch from './NoMatch'

export default Pages = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="notes" element={<Notes />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
        <Route path="*" element={<ErrorLayout />}>
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  )
}
