// Подключение express
const express = require('express')
const app = express()
const path = require('path')

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
const contactsRouters = require('./routes/contacts')
//Регистрация движка
app.engine('hbs', hbs.engine)
// Модуль который будет отрисовывать HTML страницы
app.set('view engine', 'hbs')
// Настройка папки по умолчанию
app.set('views', 'views')
// Регистрация папки public
app.use(express.static('public'))

//Подключаю роуты
app.use('/', homeRouters)
app.use('/add', addRouters)
app.use('/contacts', contactsRouters)

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`)
})
