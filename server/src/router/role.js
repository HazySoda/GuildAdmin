const router = require('koa-router')()
const roleController = require('../controllers/role')
// const auth = require('../middlewares/auth')

router.prefix('/role')

// 添加角色
router.post('/add', roleController.addRole)
// 查询角色
router.post('/query', roleController.queryRole)

module.exports = router
