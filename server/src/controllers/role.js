const RoleModel = require('../init/db').Role

module.exports = {
  // 添加角色
  async addRole (ctx, next) {
    // 获取请求参数
    const { name, belongTo, career, duty, firstSkill, secondSkill, firstPublish } = ctx.request.body
    try {
      // 判断要添加的角色是否已存在
      const role = await RoleModel.findOne({
        where: {
          name
        }
      })
      if (role) {
        // 如果存在，返回错误信息
        ctx.status = 200
        ctx.body = {
          code: -1,
          message: '已存在同名角色'
        }
      } else {
        // 如果不存在，继续添加角色
        const data = {
          name,
          belongTo,
          career,
          duty,
          firstSkill,
          secondSkill,
          firstPublish
        }
        // 存入数据库
        const newRole = await RoleModel.create(data)
        ctx.status = 200
        ctx.body = {
          code: 0,
          message: '添加角色成功',
          data: newRole
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
  // 查询角色
  async queryRole (ctx, next) {
    const { belongTo } = ctx.request.body
    // 判断是个人查询还是全部查询
    let condition = {}
    if (belongTo) {
      // 个人查询
      condition = {
        where: {
          belongTo
        }
      }
    }
    try {
      const roles = await RoleModel.findAll(condition)
      ctx.status = 200
      ctx.body = {
        code: 0,
        message: '查询成功',
        data: roles
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
  // 查询首发名单
  async queryFirstPublish (ctx, next) {
    const { career, duty, firstSkill, secondSkill, firstPublish } = ctx.request.body
    const params = {
      career,
      duty,
      firstSkill,
      secondSkill,
      firstPublish
    }
    const condition = {}
    for (let key in params) {
      if (params[key] !== '' && params[key] !== false) {
        condition[key] = params[key]
      }
    }
    try {
      const roles = await RoleModel.findAll({
        where: condition
      })
      ctx.status = 200
      ctx.body = {
        code: 0,
        message: '查询成功',
        data: roles
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
