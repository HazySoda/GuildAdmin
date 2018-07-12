const EventModel = require('../init/db').Event

module.exports = {
  // 添加活动
  async addEvent (ctx, next) {
    // 获取请求参数
    const { date, type, desc, status, members } = ctx.request.body
    try {
      const data = {
        date,
        type,
        desc,
        status,
        members
      }
      // 存入数据库
      const newEvent = await EventModel.create(data)
      ctx.status = 200
      ctx.body = {
        code: 0,
        message: '添加活动成功',
        data: newEvent
      }
    } catch (e) {
      console.log(e)
      ctx.status = 500
      ctx.body = {
        code: 500,
        message: e.message
      }
    }
  },
  // 修改活动
  async updateEvent (ctx, next) {
    // 获取请求参数
    const { id, date, type, desc, status, members } = ctx.request.body
    try {
      // 先判断是否存在该活动
      const event = await EventModel.findOne({
        where: {
          id
        }
      })
      if (!event) {
        // 如果不存在，返回错误信息
        ctx.status = 200
        ctx.body = {
          code: -1,
          message: '该活动不存在'
        }
      } else {
        // 如果存在，对活动信息进行更新
        event.update({
          date,
          type,
          desc,
          status,
          members
        })
        ctx.status = 200
        ctx.body = {
          code: 0,
          message: '修改活动信息成功',
          data: null
        }
      }
    } catch (e) {
      console.log(e)
      ctx.status = 500
      ctx.body = {
        code: 500,
        message: e.message
      }
    }
  },
  // 查询活动
  async queryEvent (ctx, next) {
    try {
      const events = await EventModel.findAll({
        order: [
          ['id', 'DESC']
        ]
      })
      ctx.status = 200
      ctx.body = {
        code: 0,
        message: '查询成功',
        data: events
      }
    } catch (e) {
      console.log(e)
      ctx.status = 500
      ctx.body = {
        code: 500,
        message: e.message
      }
    }
  }
}
