const { Router } = require('express')
const auth = require('../middleware/auth')
const Products = require('../models/productsModel')
//Урок 5
const { validationResult } = require('express-validator')
const { productsValidators } = require('../utils/validator')

const router = Router()

router.get('/', async (req, res) => {
  const products = await Products.find().lean().populate('userId', 'email name')

  res.render('catalog', {
    title: 'Католог товаров',
    isCatalog: true,
    products,
  })
})

//Обработчитк редактирование продукта
router.get('/:id/edit', async (req, res) => {
  if (!req.query.allow) {
    return res.redirect('/')
  }
  const product = await Products.findById(req.params.id).lean()

  res.render('product-edit', {
    title: `Редактировать ${product.title}`,
    product,
  })
})

router.post('/edit', auth, productsValidators, async (req, res) => {
  //Метод обработчика в модели productsModel
  await Products.findByIdAndUpdate(req.body.id, req.body).lean()
  res.redirect('/catalog')

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).redirect(`/courses/${id}/edit?allow=true`)
  }
})

//Удаление объекта
router.post('/remove', auth, async (req, res) => {
  try {
    await Products.deleteOne({ _id: req.body.id })
    res.redirect('/catalog')
  } catch (err) {
    console.log(err)
  }
})

//Получени отдельной странички с товаром
router.get('/:id', async (req, res) => {
  //Создаем модель продуктов
  const product = await Products.findById(req.params.id).lean()

  res.render('product', {
    // Отдельный layouts
    layout: 'productCart',
    title: product,
    product,
  })
})

module.exports = router
