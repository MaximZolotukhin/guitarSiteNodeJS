//Проверка прошел ли пользователь авторизацию
module.exports = function (req, res, next) {
  if (!req.session.isAuthenticated) {
    return res.redirect('/auth/login')
  }
  next()
}
