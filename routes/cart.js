//Обработчик роута для корзины
const { Router } = require('express')
const Products = require('../models/productsModel')
const mongoose = require('mongoose')

const router = Router()

function mapCartItems(cart) {
  return cart.items.map((product) => {
    return { ...product.productId._doc, count: product.count }
  })
}
/**
 * Рассчет стоимости товаров в корзине
 * @param {*} product
 */
const computedPrice = (products) => {
  return products.reduce((total, product) => {
    return (total += product.priceProduct * product.count)
  }, 0)
}

router.post('/add', async (req, res) => {
  const product = await Products.findById(req.body.id)
  await req.user.addToCart(product)

  res.redirect('/cart')
})

router.get('/', async (req, res) => {
  const user = await req.user.populate('cart.items.productId')
  const products = await mapCartItems(user.cart)

  res.render('cart', {
    title: 'Корзина',
    isCard: true,
    products: products,
    price: computedPrice(products),
  })
})

router.delete('/remove/:id', async (req, res) => {
  const cart = await Card.remove(req.params.id)

  res.status(200).json(cart)
})

module.exports = router
