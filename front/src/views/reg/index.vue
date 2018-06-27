<template>
  <div class="v-reg">
    <div class="reg-form__wrap">
      <h1>注册</h1>
      <el-form size="medium" :model="regForm" ref="regForm" :rules="regFormRules" label-width="65px">
        <el-form-item label="手机号" prop="phone" label-width="70px">
          <el-input v-model="regForm.phone" type="text" autofocus clearable auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="70px">
          <el-input v-model="regForm.password" type="password" clearable auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname" label-width="70px">
          <el-input v-model="regForm.nickname" type="text" autofocus clearable auto-complete="off"></el-input>
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
        phone: '',
        password: '',
        nickname: ''
      },
      regFormRules: {
        phone: [
          {required: true, message: '请输入手机号码'},
          {pattern: regexs.phone, message: '手机号码格式有误，请检查'}
        ],
        password: [
          {required: true, message: '请输入密码'},
          {pattern: regexs.password, message: '请输入6-18位字母数字组合 (第一位必须为字母)'}
        ],
        nickname: [
          {required: true, message: '请输入昵称'},
          {pattern: regexs.nickname, message: '请输入2-10位的中英文组合 (不允许特殊符号)'}
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
          window.localStorage.setItem('token', res.data.token)
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
  background-color: #333;
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
