const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
  res.render('contacts', {
    title: 'Контакты',
    isContact: true,
  })
})

module.exports = router
