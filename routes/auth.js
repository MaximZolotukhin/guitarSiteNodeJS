const { Router } = require('express')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs') // Шифрование пароля
const { validationResult } = require('express-validator')
const { registerValidators } = require('../utils/validator')

const router = Router()

router.get('/login', async (req, res) => {
  res.render('auth/login', {
    title: 'Авторизация',
    isLogin: true,
    loginError: req.flash('loginError'),
    registerError: req.flash('registerError'),
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
        req.flash('loginError', 'Неверный Пароль')
        res.redirect('/auth/login#login')
      }
    } else {
      req.flash('loginError', 'Такого пользователя не существует')
      res.redirect('/auth/login#login')
    }
  } catch (error) {
    console.log(error)
  }
})

//Регистрация
router.post('/register', registerValidators, async (req, res) => {
  try {
    //Урок 3
    const { email, password, name } = req.body

    //Обработака ошибок из валидатора
    const errors = validationResult(req)
    // Проверка на наличие ошибок
    if (!errors.isEmpty()) {
      req.flash('registerError', errors.array()[0].msg)
      return res.status(422).redirect('/auth/login#register')
    }
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
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
