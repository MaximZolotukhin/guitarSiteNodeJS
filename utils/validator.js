const { body } = require('express-validator')

exports.reqisterValidators = [
  body('email').isEmail().withMessage('Введите корректный email'),
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
