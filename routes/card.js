//Обработчик роута для корзины
const { Router } = require('express')
const router = Router()

const Card = require('../models/cardModels')
const Products = require('../models/productsModel')

router.post('/add', async (req, res) => {
  const product = await Products.getById(req.body.id)

  await Card.add(product)
  res.redirect('/card')
})

router.get('/', async (req, res) => {
  const card = await Card.fetchCartProducts()

  res.render('card', {
    title: 'Корзина',
    isCard: true,
    products: card.products,
    price: card.price,
  })
})

router.delete('/remove/:id', async (req, res) => {
  const card = await Card.remove(req.params.id)

  res.status(200).json(card)
})

module.exports = router
