// Подключение express
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')

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
const cardRouters = require('./routes/card')
//Регистрация движка
app.engine('hbs', hbs.engine)
// Модуль который будет отрисовывать HTML страницы
app.set('view engine', 'hbs')
// Настройка папки по умолчанию
app.set('views', 'views')

// Регистрация папки public
app.use(express.static(path.join(__dirname, 'public')))
//Обработка POST запросов
app.use(express.urlencoded({ extended: true }))
//Подключаю роуты
app.use('/', homeRouters)
app.use('/add', addRouters)
app.use('/catalog', catalogRouters)
app.use('/contacts', contactsRouters)
app.use('/card', cardRouters)

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
