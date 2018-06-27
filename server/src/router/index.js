const user = require('./user')
const role = require('./role')

module.exports = app => {
  app.use(user.routes(), user.allowedMethods())
  app.use(role.routes(), role.allowedMethods())
}
