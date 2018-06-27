// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.prototype.$catchErr = (res) => {
  if (res.data.code === 0 || res.data.code === 200) {
    return false
  } else {
    Vue.prototype.$message({
      message: res.data.message,
      type: 'error'
    })
    return true
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
