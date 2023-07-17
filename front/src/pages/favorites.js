import { useEffect } from 'react'

export default Favorites = () => {
  useEffect(() => {
    document.title = 'Favorites'
  })

  return (
    <>
      <h1>Favorites</h1>
      <p>These are my favorites</p>
    </>
  )
}
