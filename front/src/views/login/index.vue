<template>
  <div class="v-login">
    <div class="login-form__wrap">
      <h1>登录</h1>
      <el-form size="medium" :model="loginForm" ref="loginForm" :rules="loginFormRules" label-width="65px">
        <!-- 以下两个 input 用于迷惑 Chrome 浏览器，使自动填充失效 -->
        <input style="display:none" type="text" name="fuckChromeAutoFill"/>
        <input style="display:none" type="password" name="fuckChromeAutoFill"/>
        <el-form-item label="用户名" prop="username" label-width="70px">
          <el-input
            type="text"
            v-model="loginForm.username"
            auto-complete="off"
            autofocus
            clearable
            placeholder="5-16位字母数字组合">
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="70px">
          <el-input
            type="password"
            v-model="loginForm.password"
            auto-complete="off"
            clearable
            placeholder="6-18位字母数字组合">
          </el-input>
        </el-form-item>
      </el-form>
      <div class="login-form__actions">
        <el-button type="primary" @click="submit">登录</el-button>
        <el-button @click="goReg">注册新账号</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { regexs } from '@/util'
import * as api from '@/api/user'

export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [
          {required: true, message: '请输入用户名'},
          {pattern: regexs.username, message: '用户名须为5-16位字母/数字组合', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码'},
          {pattern: regexs.password, message: '密码须为6-18位字母/数字组合', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 提交登录表单
    submit () {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          const res = await api.login(this.loginForm)
          const err = this.$catchErr(res)
          if (err) return
          const { uid, token } = res.data
          window.localStorage.setItem('uid', uid)
          window.localStorage.setItem('token', token)
          this.$router.push('/app/role')
        }
      })
    },
    // 跳转到注册页面
    goReg () {
      this.$router.push('/reg')
    }
  }
}
</script>

<style lang="scss" scoped>
.v-login {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('/static/bg.jpg') center top;
  .login-form__wrap {
    padding: 20px;
    border-radius: 6px;
    background: #fff;
    width: 380px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    h1 {
      font-size: 24px;
      font-weight: lighter;
      text-align: center;
      margin-bottom: 20px;
    }
    .login-form__actions {
      .el-button {
        display: block;
        width: 100%;
        & + .el-button {
          margin: 10px 0 0;
        }
      }
    }
  }
}
</style>
