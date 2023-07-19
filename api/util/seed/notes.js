const faker = require('faker')
const mongoose = require('mongoose')
// const fetch = require('node-fetch')

const seedNotes = async (users) => {
  console.log('Seeding notes...')
  const notes = []

  for (let i = 0; i < 25; i++) {
    const random = [Math.floor(Math.random() * users.length)]

    // <-- TODO TO UNCOMMENT THIS -->
    // let content
    // const response = await fetch(
    //   'https://jaspervdj.be/lorem-markdownum/markdown.txt'
    // )
    // if (response.ok) {
    //   content = await response.text()
    // } else {
    //   content = faker.lorem.paragraph()
    // }
    // </-- NEED TO UNCOMMENT THIS -->

    // <-- TODO REMOVE THIS -->
    const content = faker.lorem.paragraph()
    // </-- AND REMOVE THIS -->

    const note = {
      content,
      favoriteCount: 0,
      favoritedBy: [],
      author: new mongoose.Types.ObjectId(users[random]._id),
    }
    notes.push(note)
  }
  return notes
}

module.exports = seedNotes
