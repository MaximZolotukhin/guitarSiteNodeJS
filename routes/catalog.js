const { Router } = require('express')
const router = Router()
const Products = require('../models/productsModel')

router.get('/', async (req, res) => {
  const products = await Products.getAll()

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

  const product = await Products.getById(req.params.id)

  res.render('product-edit', {
    title: `Редактировать ${product.title}`,
    product,
  })
})

router.post('/edit', async (req, res) => {
  //Метод обработчика в модели productsModel
  await Products.update(req.body)
  res.redirect('/catalog')
})

//Получени отдельной странички с товаром
router.get('/:id', async (req, res) => {
  //Создаем модель продуктов
  const product = await Products.getById(req.params.id)

  res.render('product', {
    // Отдельный layouts
    layout: 'productCard',
    title: product,
    product,
  })
})

module.exports = router
