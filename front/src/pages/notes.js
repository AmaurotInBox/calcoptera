import { useEffect } from 'react'

export default Notes = () => {
  useEffect(() => {
    document.title = 'Notes'
  })

  return (
    <>
      <h1>Notes</h1>
      <p>These are my notes</p>
    </>
  )
}
