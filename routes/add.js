const { Router } = require('express')
const Products = require('../models/productsModel')
const auth = require('../middleware/auth')

const router = Router()

router.get('/', auth, (req, res) => {
  res.render('add', {
    title: 'Добавить товар',
    isAdd: true,
  })
})

router.post('/', auth, async (req, res) => {
  const { manufactered, modelProduct, descriptionProduct, priceProduct, imgProduct } = req.body
  const products = new Products({
    manufactered,
    modelProduct,
    descriptionProduct,
    priceProduct,
    imgProduct,
    userId: req.user._id,
  })

  // Сохранинеие данных в БД
  try {
    await products.save()
    res.redirect('/catalog')
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
