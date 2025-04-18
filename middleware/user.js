const User = require('../models/userModel')
module.exports = async function (req, res, next) {
  //Проверяме есть ли в сессиях информация о пользователях
  if (!req.session.user) {
    return next()
  }
  req.user = await User.findById(req.session.user._id)
  next()
}
