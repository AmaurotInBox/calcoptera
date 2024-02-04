import express from 'express'
import mongoose from 'mongoose'

const app = express()
const appPort = process.env.APP_PORT
const appHost = process.env.APP_HOST
const mongoDbUrl = process.env.MONGO_DB_URL

const kittySchema = new mongoose.Schema({
  name: String
})

const Kitten = mongoose.model('Kitten', kittySchema)


app.get('/', (req, res) => {
  res.send('It is working!')
})


main().then(async () => {
  const silence = new Kitten({ name: 'Silence' })

  await silence.save();

  const kittens = await Kitten.find();
  console.log('kittens', kittens);

  app.listen(appPort, () => {
    console.log(`Server started on ${appHost}:${appPort}`)
    console.log(`Mongo database started on ${mongoDbUrl}`)
  })

}).catch((err) => {
  console.log(err)
});

async function main() {
  await mongoose.connect(mongoDbUrl);
}
