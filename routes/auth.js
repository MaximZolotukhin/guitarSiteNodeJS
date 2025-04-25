const { Router } = require('express')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs') // Шифрование пароля

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

//Авторизация
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const candidate = await User.findOne({ email })
    if (candidate) {
      // Проверяем пароль
      const areSame = await bcrypt.compare(password, candidate.password)
      if (areSame) {
        req.session.user = candidate
        req.session.isAuthenticated = true
        //Сохранение данных в session что бы не приходила загрузка redirecta до схоранения данных в session
        req.session.save((err) => {
          if (err) {
            throw err
          }
          res.redirect('/')
        })
      } else {
        res.redirect('/auth/login#login')
      }
    } else {
      res.redirect('/auth/login#login')
    }
  } catch (error) {
    console.log(error)
  }
})

//Регистрация
router.post('/register', async (req, res) => {
  try {
    const { email, password, repeat, name } = req.body
    const candidate = await User.findOne({ email })

    if (candidate) {
      res.redirect('/auth/login#register')
    } else {
      // Создаем зашиврованный пароль
      const hashPassword = await bcrypt.hash(password, 10)
      const user = new User({
        email,
        name,
        password: hashPassword,
        cart: {
          items: [],
        },
      })

      await user.save()
      res.redirect('/auth/login#login')
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
