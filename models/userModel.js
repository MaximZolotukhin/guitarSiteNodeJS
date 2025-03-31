const { Schema, model } = require('mongoose')

const userShema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        count: {
          type: Number,
          required: true,
          default: 1,
        },
        coursesId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      },
    ],
  },
})

module.exports = model('User', userShema)
