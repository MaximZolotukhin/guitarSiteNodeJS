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
    }),
  body('password', 'Пароль должне быть минимум 6 символов').isLength({ min: 6, max: 56 }).isAlphanumeric(),
  // Кастомный валидатор
  body('confirm').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Пароли должны совпадать')
    }
    return true
  }),
  body('name').isLength({ min: 3 }).withMessage('Имя должно быть минимум 3 символа'),
]
