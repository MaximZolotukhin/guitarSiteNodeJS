// Подключение express
const express = require('express')
const app = express()

// Объявляем порт
const PORT = process.env.PORT | 3000

app.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`)
})
