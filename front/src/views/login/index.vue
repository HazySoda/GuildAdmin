<template>
  <div class="v-login">
    <div class="form-wrap" v-if="activeForm === 'loginForm'" key="loginForm">
      <h1>登录</h1>
      <el-form size="medium" :model="loginForm" ref="loginForm" :rules="loginFormRules" label-width="65px">
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
            placeholder="6-18位字母数字组合"
            @keyup.enter.native="submit">
          </el-input>
        </el-form-item>
      </el-form>
      <div class="btn-group">
        <el-button type="primary" @click="submitActiveForm">登录</el-button>
        <el-button @click="switchActiveForm">注册新账号</el-button>
      </div>
    </div>
    <div class="form-wrap" v-else key="regForm">
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
            placeholder="我们该怎么称呼你呢">
          </el-input>
        </el-form-item>
      </el-form>
      <div class="btn-group">
        <el-button type="primary" @click="submitActiveForm">立即注册</el-button>
        <el-button @click="switchActiveForm">登录已有账号</el-button>
      </div>
    </div>
    <div id="canvas"></div>
  </div>
</template>

<script>
import THREE from '@/assets/libs/three'
import { regexs } from '@/util'
import * as api from '@/api/user'

export default {
  data () {
    return {
      activeForm: 'loginForm',
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
      },
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
    // 提交当前表单
    submitActiveForm () {
      this.$refs[this.activeForm].validate(async valid => {
        if (valid) {
          let res
          if (this.activeForm === 'loginForm') {
            res = await api.login(this.loginForm)
          } else {
            res = await api.reg(this.regForm)
          }
          const err = this.$catchErr(res)
          if (err) return
          const { uid, nickname, role, token } = res.data
          window.localStorage.setItem('uid', uid)
          window.localStorage.setItem('nickname', nickname)
          window.localStorage.setItem('role', role)
          window.localStorage.setItem('token', token)
          this.$router.push('/app/home')
        }
      })
    },
    // 切换登录注册表单
    switchActiveForm () {
      this.activeForm = this.activeForm === 'loginForm' ? 'regForm' : 'loginForm'
    },
    initCanvas () {
      var SCREEN_WIDTH = window.innerWidth
      var SCREEN_HEIGHT = window.innerHeight
      var SEPARATION = 90
      var AMOUNTX = 50
      var AMOUNTY = 50
      var container
      var particles, particle
      var count
      var camera
      var scene
      var renderer
      var mouseX = 0
      /* eslint-disable no-unused-vars */
      var mouseY = 0
      var windowHalfX = window.innerWidth / 2
      var windowHalfY = window.innerHeight / 2
      init()
      this.interval = setInterval(loop, 1000 / 60)
      function init () {
        container = document.createElement('div')
        container.style.position = 'relative'
        container.style.top = '200px'
        document.getElementById('canvas').appendChild(container)
        camera = new THREE.Camera(75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000)
        camera.position.z = 1000
        scene = new THREE.Scene()
        renderer = new THREE.CanvasRenderer()
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT)
        particles = []
        var i = 0
        var material = new THREE.ParticleCircleMaterial(0x097bdb, 1)
        for (var ix = 0; ix < AMOUNTX; ix++) {
          for (var iy = 0; iy < AMOUNTY; iy++) {
            particle = particles[ i++ ] = new THREE.Particle(material)
            particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2)
            particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2)
            scene.add(particle)
          }
        }
        count = 0
        container.appendChild(renderer.domElement)
        document.addEventListener('mousemove', onDocumentMouseMove, false)
      }
      function onDocumentMouseMove (event) {
        mouseX = event.clientX - windowHalfX
        mouseY = event.clientY - windowHalfY
      }
      function loop () {
        camera.position.x += (mouseX - camera.position.x) * 0.05
        camera.position.y = 364
        var i = 0
        for (var ix = 0; ix < AMOUNTX; ix++) {
          for (var iy = 0; iy < AMOUNTY; iy++) {
            particle = particles[ i++ ]
            particle.position.y = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50)
            particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 2 + (Math.sin((iy + count) * 0.5) + 1) * 2
          }
        }
        renderer.render(scene, camera)
        count += 0.1
      }
    }
  },
  mounted () {
    this.initCanvas()
  },
  beforeDestroy () {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }
}
</script>

<style lang="scss" scoped>
.v-login {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url('https://wow-static-1253920996.cos.ap-beijing.myqcloud.com/images/bg.png') center top no-repeat;
  background-size: cover;
  overflow: hidden;
  .form-wrap {
    padding: 20px;
    border-radius: 6px;
    background: #fff;
    width: 380px;
    position: fixed;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    h1 {
      font-size: 24px;
      font-weight: lighter;
      text-align: center;
      margin-bottom: 20px;
    }
    .btn-group {
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
