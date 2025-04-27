const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: String,
  password: {
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

// Метод для удаления данных из корзины
userSchema.methods.removeFromCart = function (id) {
  let items = [...this.cart.items]

  const idx = items.findIndex((item) => {
    return item.productId.toString() === id.toString()
  })

  if (items[idx].count === 1) {
    items = items.filter((product) => product.productId.toString() !== id.toString())
  } else {
    items[idx].count--
  }

  this.cart = { items }
  return this.save()
}

userSchema.methods.clearCart = function () {
  this.cart = { items: [] }
  return this.save()
}

module.exports = model('User', userSchema)
