const user = require('./user')
const role = require('./role')
const event = require('./event')

module.exports = app => {
  app.use(user.routes(), user.allowedMethods())
  app.use(role.routes(), role.allowedMethods())
  app.use(event.routes(), event.allowedMethods())
}
