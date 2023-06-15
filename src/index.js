const express = require('express')

const app = express()

const port = process.env.PORT || 4000

app.get('/', (req, res) => {
  res.send('Hello World!!!')
})

app.listen(port, () => {
  console.log(`Listening on http://127.0.0.1:${port}/`)
  console.log(process.env)
})
