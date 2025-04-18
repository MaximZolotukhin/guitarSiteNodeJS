// Подключение express
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)

// Объявляем порт
const PORT = process.env.PORT | 3001
const MONGODB_URI = 'mongodb://guitar:guitar777@localhost:27417/guitarShopDB?authSource=admin'
const store = new MongoStore({
  //имя коллекции в ДБ в которой будут хранится данные о сессиях
  connection: 'session',
  //Адрес ДБ
  uri: MONGODB_URI,
})

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

//MIDDLEWARE
const varMiddlewar = require('./middleware/variables')
const userMiddlewar = require('./middleware/user')

//Регистрация движка
app.engine('hbs', hbs.engine)
// Модуль который будет отрисовывать HTML страницы
app.set('view engine', 'hbs')
// Настройка папки по умолчанию
app.set('views', 'views')

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
    store,
  })
)

// Подключение middleware
app.use(varMiddlewar)
app.use(userMiddlewar)

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
    await mongoose.connect(MONGODB_URI)
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
