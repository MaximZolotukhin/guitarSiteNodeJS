// Подключение express
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')

// Объявляем порт
const PORT = process.env.PORT | 3001

// Настройка handelbars
const exphbs = require('express-handlebars')
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
})

const homeRouters = require('./routes/home')
const addRouters = require('./routes/add')
const catalogRouters = require('./routes/catalog')
const contactsRouters = require('./routes/contacts')
const cartRouters = require('./routes/cart')
const ordersRouters = require('./routes/orders')
const authRouters = require('./routes/auth')

const User = require('./models/userModel')

const varMiddlewar = require('./middleware/variables')

//Регистрация движка
app.engine('hbs', hbs.engine)
// Модуль который будет отрисовывать HTML страницы
app.set('view engine', 'hbs')
// Настройка папки по умолчанию
app.set('views', 'views')
//Подключаем мiddlewar
// app.use(async (req, res, next) => {
//   // Получаем пользователя
//   try {
//     const user = await User.findById('67f28328cf6332bf8445e7cb')
//     // добавляю данные о пользователе в req.user
//     req.user = user
//     next()
//   } catch (err) {
//     console.log(err)
//   }
// })

// Регистрация папки public
app.use(express.static(path.join(__dirname, 'public')))
// image
// app.use(express.static(path.join(__dirname, 'public', 'img')))
//Обработка POST запросов
app.use(express.urlencoded({ extended: true }))
//Подключаю роуты
app.use(
  session({
    secret: 'ScorpionEvil',
    resave: false,
    saveUninitialized: false,
  })
)

// Подключение middleware
app.use(varMiddlewar)

// Роуты
app.use('/', homeRouters)
app.use('/add', addRouters)
app.use('/catalog', catalogRouters)
app.use('/contacts', contactsRouters)
app.use('/cart', cartRouters)
app.use('/orders', ordersRouters)
app.use('/auth', authRouters)

// Подключение к БД через mongoose
async function start() {
  try {
    const uri = 'mongodb://guitar:guitar777@localhost:27417/guitarShopDB?authSource=admin'
    await mongoose.connect(uri)
    console.log('Connected to MongoDB')

    // Слушатель событий
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (err) {
    console.log(err)
  }
}

start()
