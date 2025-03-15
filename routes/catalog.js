const { Router } = require('express')
const router = Router()
const Products = require('../models/productsModel')

router.get('/', async (req, res) => {
  const products = await Products.getAll()
  console.log(products)

  res.render('catalog', {
    title: 'Католог товаров',
    isCatalog: true,
    products,
  })
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
