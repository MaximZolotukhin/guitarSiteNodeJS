//Обработчик роута для корзины
const { Router } = require('express')
const Products = require('../models/productsModel')
const auth = require('../middleware/auth')
const mongoose = require('mongoose')

const router = Router()

/**
 * Подоготовка данных для отображения
 * @param {*} cart
 * @returns
 */
function mapCartItems(cart) {
  return cart.items.map((product) => {
    return { ...product.productId._doc, count: product.count, id: product.productId.id }
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

router.post('/add', auth, async (req, res) => {
  const product = await Products.findById(req.body.id)

  await req.user.addToCart(product)

  res.redirect('/cart')
})

router.get('/', auth, async (req, res) => {
  const user = await req.user.populate('cart.items.productId')
  const products = await mapCartItems(user.cart)

  res.render('cart', {
    title: 'Корзина',
    isCard: true,
    products: products,
    price: computedPrice(products),
  })
})

router.delete('/remove/:id', auth, async (req, res) => {
  // Метод удалинея данных из корзины
  await req.user.removeFromCart(req.params.id)
  const user = await req.user.populate('cart.items.productId')

  const products = mapCartItems(user.cart)

  const cart = { products, price: computedPrice(products) }

  res.status(200).json(cart)
})

module.exports = router
