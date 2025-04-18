const { Router } = require('express')
const Orders = require('../models/ordersModel')
const auth = require('../middleware/auth')
const router = Router()

router.get('/', auth, async (req, res) => {
  try {
    //Ищем закзы по id пользователя
    const orders = await Orders.find({ 'user.userId': req.user._id }).populate('user.userId').lean()

    res.render('orders', {
      isOrder: true,
      title: 'Мои заказы',
      orders: orders.map((order) => {
        return {
          ...order,
          price: order.products.reduce((total, items) => {
            return (total += items.count * items.product.priceProduct)
          }, 0),
        }
      }),
    })
  } catch (error) {
    console.log(error)
  }
})

router.post('/', auth, async (req, res) => {
  try {
    //Получаем информацию о пользователе
    const user = await req.user.populate('cart.items.productId')

    //Получаю товар
    const products = user.cart.items.map((product) => {
      return {
        count: product.count,
        product: { ...product.productId._doc },
      }
    })

    //Подготовка данных для сохранения
    const order = new Orders({
      user: {
        user: req.user.name,
        userId: req.user._id,
      },
      products,
    })

    // Сохраняем закза в БД
    await order.save()

    //Очищаем корзину
    await req.user.clearCart()

    res.redirect('/orders')
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
