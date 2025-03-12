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
//Регистрация движка
app.engine('hbs', hbs.engine)
// Модуль который будет отрисовывать HTML страницы
app.set('view engine', 'hbs')
// Настройка папки по умолчанию
app.set('views', 'views')
// Регистрация папки public
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Главная страница',
    isHome: true,
  })
})

app.get('/add', (req, res) => {
  res.render('add', {
    title: 'Добавить товар',
    isAdd: true,
  })
})

app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Контакты',
    isContact: true,
  })
})

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`)
})
