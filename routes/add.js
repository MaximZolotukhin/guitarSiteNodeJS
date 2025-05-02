const { Router } = require('express')
const Products = require('../models/productsModel')
const auth = require('../middleware/auth')
//Урок 5
const { validationResult } = require('express-validator')
const { productsValidators } = require('../utils/validator')

const router = Router()

router.get('/', auth, (req, res) => {
  res.render('add', {
    title: 'Добавить товар',
    isAdd: true,
  })
})

router.post('/', auth, productsValidators, async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).render('add', {
      title: 'Добавить товар',
      isAdd: true,
      error: errors.array()[0].msg,
      // Данные код поможет не стирать данные при каждом перерендере страницы
      data: {
        manufactered: req.body.manufactered,
        modelProduct: req.body.modelProduct,
        descriptionProduct: req.body.descriptionProduct,
        priceProduct: req.body.priceProduct,
        imgProduct: req.body.imgProduct,
      },
    })
  }

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
