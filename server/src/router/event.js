const router = require('koa-router')()
const eventController = require('../controllers/event')
const auth = require('../middlewares/auth')

router.prefix('/event')

// 添加活动
router.post('/addEvent', auth, eventController.addEvent)
// 查询活动
router.post('/queryEvent', auth, eventController.queryEvent)
// 修改活动
router.post('/updateEvent', auth, eventController.updateEvent)

module.exports = router
