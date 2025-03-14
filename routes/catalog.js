const { Router } = require('express')
const router = Router()
const Products = require('../models/products')

router.get('/', async (req, res) => {
  const products = await Products.getAll()
  res.render('catalog', {
    title: 'Католог товаров',
    isCatalog: true,
    products,
  })
})

module.exports = router
