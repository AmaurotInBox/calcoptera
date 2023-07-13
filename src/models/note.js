const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Note = mongoose.model('Note', noteSchema)

module.exports = Note
