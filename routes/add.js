const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
  res.render('add', {
    title: 'Добавить товар',
    isAdd: true,
  })
})

router.post('/', (req, res) => {
  console.log(req.body, 'Запрос')

  res.redirect('/catalog')
})

module.exports = router
