const http = require('http')
const PORT = 3001

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
    })

    res.end(`
      <h1>Form</h1>
      <form method="post" action="/">
        <input name="title" type="text" />
        <button type="sybmit">Send</button>
      </form> 
      `)
  } else if (req.method === 'POST') {
    const body = []
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
    })

    req.on('data', (data) => {
      body.push(Buffer.from(data))
    })

    req.on('end', () => {
      const message = body.toString().split('=')[1]
      console.log(body.toString().split('=')[1])

      res.end(`<h1>Ваше сообщение ${message}</h1>`)
    })
  }
})

server.listen(PORT, () => {
  console.log(`Server is running ${PORT}`)
})
