const { body } = require('express-validator')
const User = require('../models/userModel')

exports.registerValidators = [
  body('email')
    .isEmail()
    .withMessage('Введите корректный email')
    .custom(async (value, { req }) => {
      try {
        const user = await User.findOne({ email: value })
        if (user) {
          return Promise.reject('Такой email уже занят')
        }
      } catch (error) {
        console.log(error)
      }
    })
    //Урок 4
    .normalizeEmail(),
  body('password', 'Пароль должне быть минимум 6 символов')
    .isLength({ min: 6, max: 56 })
    .isAlphanumeric()
    // Урок 4
    .trim(),
  // Кастомный валидатор
  body('confirm')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Пароли должны совпадать')
      }
      return true
    })
    // Урок 4
    .trim(),
  body('name')
    .isLength({ min: 3 })
    .withMessage('Имя должно быть минимум 3 символа')
    // Урок 4
    .trim(),
]
