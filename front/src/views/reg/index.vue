<template>
  <div class="v-reg">
    <div class="reg-form__wrap">
      <h1>注册</h1>
      <el-form size="medium" :model="regForm" ref="regForm" :rules="regFormRules" label-width="65px">
        <el-form-item label="用户名" prop="username" label-width="70px">
          <el-input
            type="text"
            v-model="regForm.username"
            auto-complete="off"
            autofocus
            clearable
            placeholder="5-16位字母数字组合">
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="70px">
          <el-input
            type="password"
            v-model="regForm.password"
            auto-complete="off"
            clearable
            placeholder="6-18位字母数字组合">
          </el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname" label-width="70px">
          <el-input
            type="text"
            v-model="regForm.nickname"
            auto-complete="off"
            autofocus
            clearable
            placeholder="请填写众人皆知的昵称">
          </el-input>
        </el-form-item>
      </el-form>
      <div class="reg-form__actions">
        <el-button type="primary" @click="submit">立即注册</el-button>
        <el-button @click="goLogin">登录已有账号</el-button>
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
      regForm: {
        username: '',
        password: '',
        nickname: ''
      },
      regFormRules: {
        username: [
          {required: true, message: '请输入用户名'},
          {pattern: regexs.username, message: '用户名须为5-16位字母/数字组合', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码'},
          {pattern: regexs.password, message: '密码须为6-18位字母/数字组合', trigger: 'blur'}
        ],
        nickname: [
          {required: true, message: '请输入昵称'},
          {pattern: regexs.nickname, message: '请输入2-10位的中/英文组合', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 提交注册表单
    async submit () {
      this.$refs.regForm.validate(async valid => {
        if (valid) {
          const res = await api.reg(this.regForm)
          const err = this.$catchErr(res)
          if (err) return
          const { uid, nickname, token } = res.data
          window.localStorage.setItem('uid', uid)
          window.localStorage.setItem('nickname', nickname)
          window.localStorage.setItem('token', token)
          this.$router.push('/app/home')
        }
      })
    },
    // 跳转到登录页面
    goLogin () {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.v-reg {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('/static/bg.jpg') center top;
  .reg-form__wrap {
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
    .reg-form__actions {
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
