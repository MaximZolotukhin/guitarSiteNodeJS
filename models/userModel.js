const { Schema, model } = require('mongoose')

const userSchema = new Schema({
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
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      },
    ],
  },
})

userSchema.methods.addToCart = function (product) {
  const clonedItems = [...this.cart.items]
  const idx = clonedItems.findIndex((item) => {
    return item.productId.toString() === product._id.toString()
  })
  if (idx >= 0) {
    clonedItems[idx].count++
  } else {
    clonedItems.push({ productId: product._id, count: 1 })
  }

  this.cart = { items: clonedItems }
  return this.save()
}

module.exports = model('User', userSchema)
