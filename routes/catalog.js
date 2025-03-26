const { Router } = require('express')
const router = Router()
const Products = require('../models/productsModel')

router.get('/', async (req, res) => {
  const products = await Products.find().lean()

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

router.post('/edit', async (req, res) => {
  //Метод обработчика в модели productsModel
  await Products.findByIdAndUpdate(req.body.id, req.body).lean()
  res.redirect('/catalog')
})

//Получени отдельной странички с товаром
router.get('/:id', async (req, res) => {
  //Создаем модель продуктов
  const product = await Products.findById(req.params.id).lean()

  res.render('product', {
    // Отдельный layouts
    layout: 'productCard',
    title: product,
    product,
  })
})

module.exports = router
