// Описание модели
const { Schema, model } = require('mongoose')

//Созадем описание таблицы
const product = new Schema({
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
})

module.exports = model('Product', product)
