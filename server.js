// Подключение express
const express = require('express')
const app = express()
const path = require('path')

// Объявляем порт
const PORT = process.env.PORT | 3000

app.get('/', (req, res) => {
  res.status(200)

  res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/about', (req, res) => {
  res.status(200)

  res.sendFile(path.join(__dirname, 'views', 'about.html'))
})

app.get('/add', (req, res) => {
  res.status(200)

  res.sendFile(path.join(__dirname, 'views', 'add.html'))
})

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`)
})
