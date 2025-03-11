const http = require('http')
const path = require('path')
const fs = require('fs')
const PORT = 3000

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/') {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
      })

      fs.readFile(path.join(__dirname, 'views', 'index.html'), 'utf-8', (err, content) => {
        if (err) {
          throw err
        }

        res.end(content)
      })
    } else if (req.url === '/about') {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
      })

      fs.readFile(path.join(__dirname, 'views', 'about.html'), 'utf-8', (err, content) => {
        if (err) {
          throw err
        }

        res.end(content)
      })
    } else if (req.url === '/api/users') {
      console.log('Работает')

      res.writeHead(200, {
        'Content-Type': 'text/json',
      })
      const users = [
        { name: 'Veles', age: 42 },
        { name: 'Olga', age: 35 },
      ]
      res.end(JSON.stringify(users))
    }
  } else if (req.method === 'POST') {
    // Массив для хранения данных
    const body = []
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
    })

    // Получаем данные из буфера обмена
    req.on('data', (data) => {
      body.push(Buffer.from(data))
    })

    // Проверка на получени данных
    req.on('end', () => {
      // Преобразовываем данные из формата buffer к формату строки, разделяем по знаку = и получаем только данные
      const message = body.toString().split('=')[1]

      // После того как завершились операции мы можем вывести их на страницу
      res.end(`
          <h1>Ваше сообщение: ${message} </h1>
          `)
    })
  }
})

server.listen(PORT, () => {
  console.log(`Server is running ${PORT}`)
})
