const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
  res.render('catalog', {
    title: 'Католог товаров',
    isCatalog: true,
  })
})

module.exports = router
