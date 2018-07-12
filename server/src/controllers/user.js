const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { regexs } = require('../util')
const config = require('../config/index')
const UserModel = require('../init/db').User
const { Op } = require('sequelize')

// 校验请求参数
const validate = params => {
  if (typeof params !== 'object') {
    throw new Error('Param must be a Object')
  }
  const keys = Object.keys(params)
  if (!keys.length) {
    return false
  }
  const valid = keys.every(key => {
    return regexs[key].test(params[key])
  })
  return valid
}

module.exports = {
  async login (ctx, next) {
    // 获取请求参数
    const { username, password } = ctx.request.body
    // 校验请求参数
    const valid = validate({username, password})
    if (!valid) {
      ctx.status = 400
      ctx.body = {
        code: 400,
        message: '参数错误'
      }
      return
    }
    try {
      // 判断该用户是否存在
      const user = await UserModel.findOne({
        where: {
          username
        }
      })
      if (!user) {
        // 如果不存在，返回错误信息
        ctx.status = 200
        ctx.body = {
          code: -1,
          message: '此用户名尚未注册'
        }
      } else {
        // 如果存在，则判断密码与数据库中的密码是否匹配
        const isPwdValid = await bcrypt.compare(password, user.password)
        if (isPwdValid) {
          // 如果匹配，继续登录流程
          const payload = {
            uid: user.id,
            username: user.username
          }
          // 签发 token 并返回给客户端
          const token = jwt.sign(payload, config.jwt.secret, config.jwt.options)
          ctx.status = 200
          ctx.body = {
            code: 0,
            message: '登录成功',
            uid: user.id,
            nickname: user.nickname,
            role: user.role,
            token
          }
        } else {
          // 如果不匹配，则提示用户名或密码错误
          // 如果只提示密码错误，某些别有用心的人就会知道账户是存在的，防止暴力破解
          ctx.status = 200
          ctx.body = {
            code: -2,
            message: '用户名或密码错误'
          }
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
  async reg (ctx, next) {
    // 获取请求参数
    const { username, password, nickname } = ctx.request.body
    // 校验请求参数
    const valid = validate({username, password, nickname})
    if (!valid) {
      ctx.status = 400
      ctx.body = {
        code: 400,
        message: '参数错误'
      }
      return
    }
    try {
      // 判断用户名是否已经注册
      const user = await UserModel.findOne({
        where: {
          [Op.or]: [{username}, {nickname}]
        }
      })
      if (user && (user.username === username)) {
        ctx.status = 200
        ctx.body = {
          code: -1,
          message: '该用户名已被注册'
        }
        return
      } else if (user && (user.nickname === nickname)) {
        ctx.status = 200
        ctx.body = {
          code: -2,
          message: '该昵称已被注册'
        }
        return
      }
      // 加密明文密码
      const hashPwd = await bcrypt.hash(password, 10)
      // 构建用户数据
      const data = {
        username,
        password: hashPwd,
        nickname
      }
      // 存入数据库
      const newUser = await UserModel.create(data)
      const payload = {
        uid: newUser.id,
        username: newUser.username
      }
      // 签发 token 并返回给客户端，以实现注册成功后自动登录
      const token = jwt.sign(payload, config.jwt.secret, config.jwt.options)
      ctx.status = 200
      ctx.body = {
        code: 0,
        message: '注册成功',
        uid: newUser.id,
        nickname: newUser.nickname,
        role: newUser.role,
        token
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
  getStatus (ctx, next) {
    // 获取 token
    let token
    const authorization = ctx.get('Authorization')
    if (authorization) {
      token = authorization.split(' ')[1]
    } else {
      ctx.status = 400
      ctx.body = {
        code: 400,
        message: '获取Token失败'
      }
    }
    try {
      // 解密token
      const decoded = jwt.decode(token)
      // 返回状态和过期时间
      ctx.status = 200
      ctx.body = {
        code: 0,
        message: '登录成功',
        expireTime: decoded.exp * 1000
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
