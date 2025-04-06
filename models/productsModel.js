// Описание модели
const { Schema, model } = require('mongoose')

//Созадем описание таблицы
const productSchema = new Schema({
  manufactered: {
    type: String,
    required: true,
  },
  modelProduct: {
    type: String,
    required: true,
  },
  descriptionProduct: {
    type: String,
  },
  priceProduct: {
    type: Number,
    required: true,
  },
  imgProduct: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

// Обработка данных преданных даннхы из Schema клинету
productSchema.method('toClient', function () {
  // Получает данные из Schema без служебной инофрмации
  const products = this.toObject()

  products.id = products._id
  delete products._id

  return products
})

module.exports = model('Product', productSchema)
