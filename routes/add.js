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
  const products = new Products(req.body)

  await products.save()
  res.redirect('/catalog')
})

module.exports = router
