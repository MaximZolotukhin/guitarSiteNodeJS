const { Router } = require('express')
const router = Router()

const Products = require('../models/productsModel')

router.get('/', (req, res) => {
  res.render('add', {
    title: 'Добавить товар',
    isAdd: true,
  })
})

router.post('/', async (req, res) => {
  const { manufactered, modelProduct, descriptionProduct, priceProduct, imgProduct } = req.body
  const products = new Products({ manufactered, modelProduct, descriptionProduct, priceProduct, imgProduct })

  // Сохранинеие данных в БД
  try {
    await products.save()
    res.redirect('/catalog')
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
