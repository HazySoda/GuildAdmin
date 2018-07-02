const router = require('koa-router')()
const roleController = require('../controllers/role')
// const auth = require('../middlewares/auth')

router.prefix('/role')

// 添加角色
router.post('/addRole', roleController.addRole)
// 查询角色
router.post('/queryRole', roleController.queryRole)
// 修改角色
router.post('/updateRole', roleController.updateRole)
// 查询首发名单
router.post('/queryFirstPublish', roleController.queryFirstPublish)

module.exports = router
