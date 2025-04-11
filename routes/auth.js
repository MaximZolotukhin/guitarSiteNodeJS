const { Router } = require('express')
const User = require('../models/userModel')

const router = Router()

router.get('/login', async (req, res) => {
  res.render('auth/login', {
    title: 'Авторизация',
    isLogin: true,
  })
})

router.get('/logout', async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login#login')
  })
})

router.post('/login', async (req, res) => {
  //Если залогинились в систему то в переменной isAuthenticated будет хранится true
  const user = await User.findById('67f28328cf6332bf8445e7cb')
  req.session.user = user
  req.session.isAuthenticated = true

  //Сохранение данных в session что бы не приходила загрузка redirecta до схоранения данных в session
  req.session.save((err) => {
    if (err) {
      throw err
    }

    res.redirect('/')
  })
})

module.exports = router
