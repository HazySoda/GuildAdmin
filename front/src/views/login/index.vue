<template>
  <div class="v-login">
    <div class="login-form__wrap">
      <h1>登录</h1>
      <el-form size="medium" :model="loginForm" ref="loginForm" :rules="loginFormRules" label-width="65px">
        <!-- 以下两个 input 用于迷惑 Chrome 浏览器，使自动填充失效 -->
        <input style="display:none" type="text" name="fuckChromeAutoFill"/>
        <input style="display:none" type="password" name="fuckChromeAutoFill"/>
        <el-form-item label="手机号" prop="phone" label-width="70px">
          <el-input v-model="loginForm.phone" type="text" autofocus clearable auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="70px">
          <el-input v-model="loginForm.password" type="password" clearable auto-complete="off"></el-input>
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

export default {
  data () {
    return {
      loginForm: {
        phone: '',
        password: ''
      },
      loginFormRules: {
        phone: [
          {required: true, message: '请输入手机号码'},
          {pattern: regexs.phone, message: '手机号码格式有误，请检查'}
        ],
        password: [
          {required: true, message: '请输入密码'},
          {pattern: regexs.password, message: '请输入6-18位字母数字组合 (第一位必须为字母)'}
        ]
      }
    }
  },
  methods: {
    // 提交登录表单
    submit () {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          console.log(this.loginForm)
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
  background-color: #333;
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